import React, { useEffect, useId, useRef, useState } from 'react';
import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './ui.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  lightSurface?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  lightSurface,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={`fd-field ${className}`}>
      <label
        htmlFor={inputId}
        className={`fd-field-label ${lightSurface ? 'fd-field-label--light' : ''}`}
      >
        <span>{label}</span>
        {rest.required && <span style={{ color: 'var(--lime)' }}>Required</span>}
      </label>
      <div className="fd-input-wrap">
        <input
          id={inputId}
          className={`fd-input ${error ? 'fd-input--error' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
      </div>
      {error && (
        <span id={`${inputId}-err`} className="fd-field-error" role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className="fd-field-hint">
          {hint}
        </span>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  hint,
  id,
  className = '',
  ...rest
}) => {
  const autoId = useId();
  const textareaId = id || autoId;

  return (
    <div className={`fd-field ${className}`}>
      <label htmlFor={textareaId} className="fd-field-label">
        <span>{label}</span>
        {rest.required && <span style={{ color: 'var(--lime)' }}>Required</span>}
      </label>
      <textarea
        id={textareaId}
        className={`fd-textarea ${error ? 'fd-textarea--error' : ''}`}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && (
        <span className="fd-field-error" role="alert">
          {error}
        </span>
      )}
      {!error && hint && <span className="fd-field-hint">{hint}</span>}
    </div>
  );
};

interface SelectOption {
  value: string;
  label: string;
  meta?: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listboxId = useId();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setHighlighted((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) {
        const picked = options[highlighted];
        if (picked) {
          onChange(picked.value);
          setOpen(false);
        }
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <div className="fd-field" ref={containerRef}>
      <span id={labelId} className="fd-field-label">
        {label}
      </span>
      <div className="fd-select">
        <button
          type="button"
          className={`fd-select-trigger ${error ? 'fd-input--error' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={labelId}
          aria-controls={listboxId}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
        >
          <span style={{ color: selectedOption ? 'var(--white)' : 'var(--silver-300)' }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 180ms ease',
              color: 'var(--lime)',
            }}
          />
        </button>

        {open && (
          <div
            id={listboxId}
            role="listbox"
            className="fd-select-menu"
            data-lenis-prevent
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-highlighted={idx === highlighted}
                  className="fd-select-option"
                  onMouseEnter={() => setHighlighted(idx)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {opt.meta && (
                    <span className="t-label" style={{ opacity: 0.72, fontSize: '0.68rem' }}>
                      {opt.meta}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {error && (
        <span className="fd-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  showCheck?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onClick, showCheck = true }) => (
  <button
    type="button"
    className="fd-chip"
    aria-pressed={active}
    data-active={active}
    onClick={onClick}
  >
    {showCheck && active && <Check size={15} strokeWidth={3} />}
    <span>{label}</span>
  </button>
);

interface DatePickerProps {
  value: string;
  onChange: (dateIso: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = viewMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const days = Array.from({ length: firstDow + daysInMonth }, (_, i) =>
    i < firstDow ? null : i - firstDow + 1
  );

  return (
    <div className="fd-calendar" role="group" aria-label="Preferred pickup date picker">
      <div className="fd-calendar-head">
        <button
          type="button"
          className="fd-btn fd-btn--ghost-dark fd-btn--sm"
          aria-label="Previous month"
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="t-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--white)' }}>
          <Calendar size={14} style={{ color: 'var(--lime)' }} />
          {monthLabel}
        </span>
        <button
          type="button"
          className="fd-btn fd-btn--ghost-dark fd-btn--sm"
          aria-label="Next month"
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="fd-calendar-grid">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="fd-calendar-dow">
            {d}
          </span>
        ))}
        {days.map((day, idx) => {
          if (!day) return <span key={`empty-${idx}`} />;
          const d = new Date(year, month, day);
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isPast = d < today;
          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              aria-selected={value === iso}
              className="fd-calendar-day"
              onClick={() => onChange(iso)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
