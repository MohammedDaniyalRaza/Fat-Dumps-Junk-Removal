import React, { useEffect, useId, useRef, useState } from 'react';
import { MoveHorizontal, Plus, X } from 'lucide-react';
import { SmartImage } from './SmartImage';
import './ui.css';

/* ===================================================
   ACCORDION
=================================================== */
export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export const Accordion: React.FC<{ items: AccordionItemData[]; allowMultiple?: boolean }> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(items[0] ? [items[0].id] : []);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className="fd-accordion-list">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `acc-panel-${item.id}`;
        return (
          <div key={item.id} className="fd-accordion-item">
            <button
              type="button"
              className="fd-accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span>{item.question}</span>
              <span className="fd-accordion-icon" aria-hidden="true">
                <Plus size={16} />
              </span>
            </button>
            {isOpen && (
              <div id={panelId} className="fd-accordion-panel t-body">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ===================================================
   TABS
=================================================== */
export const Tabs: React.FC<{
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}> = ({ tabs, activeTab, onChange }) => (
  <div className="fd-chip-group" role="tablist" aria-label="Filter categories">
    {tabs.map((tab) => {
      const selected = tab === activeTab;
      return (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={selected}
          data-active={selected}
          className="fd-chip"
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

/* ===================================================
   STEPPER
=================================================== */
export const Stepper: React.FC<{
  steps: { id: number; label: string }[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}> = ({ steps, currentStep, onStepClick }) => (
  <nav aria-label="Estimate steps" style={{ marginBottom: '28px' }}>
    <ol
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        gap: '10px',
      }}
    >
      {steps.map((s) => {
        const isCurrent = s.id === currentStep;
        const isComplete = s.id < currentStep;
        const canClick = Boolean(onStepClick) && s.id <= currentStep;
        return (
          <li key={s.id}>
            <button
              type="button"
              disabled={!canClick}
              onClick={() => canClick && onStepClick?.(s.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 10px 10px',
                border: 0,
                borderTop: `3px solid ${
                  isCurrent ? 'var(--lime)' : isComplete ? 'var(--green-banner)' : 'var(--border-dark-strong)'
                }`,
                background: isCurrent ? 'rgba(132, 224, 27, 0.08)' : 'transparent',
                color: isCurrent ? 'var(--white)' : isComplete ? 'var(--lime)' : 'var(--silver-300)',
                cursor: canClick ? 'pointer' : 'default',
                borderRadius: '0 0 6px 6px',
                transition: 'border-color 180ms ease, background-color 180ms ease',
              }}
            >
              <span className="t-label t-tabular" style={{ display: 'block', fontSize: '0.68rem' }}>
                Step 0{s.id}
              </span>
              <span
                className="t-body-sm"
                style={{
                  display: 'block',
                  fontWeight: isCurrent ? 700 : 500,
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {s.label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);

/* ===================================================
   BEFORE / AFTER DRAG SLIDER
=================================================== */
export const BeforeAfter: React.FC<{
  beforeUrl: string;
  beforeAlt: string;
  afterUrl: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}> = ({
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updatePos = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, pct)));
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updatePos(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fd-ba"
      onPointerDown={(e) => {
        draggingRef.current = true;
        updatePos(e.clientX);
      }}
    >
      {/* After layer (base) */}
      <div className="fd-ba-layer">
        <SmartImage src={afterUrl} alt={afterAlt} aspectRatio="16 / 10" />
      </div>

      {/* Before layer (clipped from left to pos%) */}
      <div
        className="fd-ba-layer"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <SmartImage src={beforeUrl} alt={beforeAlt} aspectRatio="16 / 10" />
      </div>

      <span className="fd-ba-badge" style={{ left: '14px' }}>
        {beforeLabel}
      </span>
      <span
        className="fd-ba-badge"
        style={{ right: '14px', borderColor: 'rgba(132, 224, 27, 0.5)', color: 'var(--lime)' }}
      >
        {afterLabel}
      </span>

      <div className="fd-ba-divider" style={{ left: `${pos}%` }} />
      <button
        type="button"
        className="fd-ba-handle"
        style={{ left: `${pos}%` }}
        aria-label="Drag to compare before and after cleanout"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(pos)}
        role="slider"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 4));
          if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 4));
        }}
      >
        <MoveHorizontal size={20} />
      </button>
    </div>
  );
};

/* ===================================================
   TOOLTIP
=================================================== */
export const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
  content,
  children,
}) => {
  const [show, setShow] = useState(false);
  const tipId = useId();
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      aria-describedby={show ? tipId : undefined}
    >
      {children}
      {show && (
        <span
          id={tipId}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '7px 11px',
            borderRadius: '6px',
            backgroundColor: '#070807',
            border: '1px solid var(--border-lime)',
            color: 'var(--white)',
            fontSize: '0.78rem',
            whiteSpace: 'nowrap',
            zIndex: 120,
            pointerEvents: 'none',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};

/* ===================================================
   MODAL
=================================================== */
export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-lenis-prevent
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)' as unknown as number,
        backgroundColor: 'rgba(7, 8, 7, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90dvh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-graphite)',
          border: '1px solid var(--border-dark-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '26px',
          boxShadow: 'var(--shadow-deep)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          <h3 className="t-display-md" style={{ color: 'var(--white)' }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-ink)',
              color: 'var(--white)',
              border: '1px solid var(--border-dark-strong)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
