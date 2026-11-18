import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Phone, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useLightbox } from '../../app/providers';
import { getFull, getThumb } from '../../data/images';
import { business } from '../../data/business';
import { DumpTruck } from '../svg/DumpTruck';
import { LinkButton } from './Button';
import './ui.css';

export const Lightbox: React.FC = () => {
  const { isOpen, items, index, close, setIndex } = useLightbox();
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const panStartRef = useRef<{ x: number; y: number } | null>(null);

  const currentItem = items[index];

  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setImgLoaded(false);
    setImgError(false);

    if (isOpen && items.length > 1) {
      const nextIdx = (index + 1) % items.length;
      const prevIdx = (index - 1 + items.length) % items.length;
      [items[nextIdx], items[prevIdx]].forEach((neighbor) => {
        if (neighbor) {
          const preload = new Image();
          preload.src = getFull(neighbor.url);
        }
      });
    }
  }, [isOpen, index, items]);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex(index - 1);
      } else if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, index, close, setIndex]);

  if (!isOpen || !currentItem || typeof document === 'undefined') return null;

  const fullSrc = getFull(currentItem.url);

  const modalNode = (
    <div
      ref={overlayRef}
      className="fd-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title || 'Photo preview'}
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Top Bar */}
      <div className="fd-lightbox-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <span
            className="t-label t-tabular"
            aria-live="polite"
            style={{ color: 'var(--lime)', whiteSpace: 'nowrap' }}
          >
            Image {index + 1} of {items.length}
          </span>
          {currentItem.title && (
            <span
              className="t-body-sm"
              style={{
                color: 'var(--silver-200)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {currentItem.title}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => {
              setZoomed((z) => !z);
              setPan({ x: 0, y: 0 });
            }}
            aria-label={zoomed ? 'Reset zoom' : 'Zoom in'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--bg-graphite)',
              color: '#ffffff',
              border: '1px solid var(--border-dark-strong)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close image preview"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--lime)',
              color: '#070807',
              border: '0',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="fd-lightbox-stage"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            panStartRef.current = { ...pan };
          }
        }}
        onTouchMove={(e) => {
          if (zoomed && touchStartRef.current && panStartRef.current && e.touches.length === 1) {
            const dx = e.touches[0].clientX - touchStartRef.current.x;
            const dy = e.touches[0].clientY - touchStartRef.current.y;
            setPan({
              x: Math.max(-220, Math.min(220, panStartRef.current.x + dx)),
              y: Math.max(-180, Math.min(180, panStartRef.current.y + dy)),
            });
          }
        }}
        onTouchEnd={(e) => {
          if (!zoomed && touchStartRef.current && items.length > 1) {
            const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
            if (Math.abs(dx) > 48) {
              setIndex(dx < 0 ? index + 1 : index - 1);
            }
          }
          touchStartRef.current = null;
          panStartRef.current = null;
        }}
        onMouseDown={(e) => {
          if (!zoomed) return;
          touchStartRef.current = { x: e.clientX, y: e.clientY };
          panStartRef.current = { ...pan };
        }}
        onMouseMove={(e) => {
          if (!zoomed || !touchStartRef.current || !panStartRef.current) return;
          const dx = e.clientX - touchStartRef.current.x;
          const dy = e.clientY - touchStartRef.current.y;
          setPan({
            x: Math.max(-220, Math.min(220, panStartRef.current.x + dx)),
            y: Math.max(-180, Math.min(180, panStartRef.current.y + dy)),
          });
        }}
        onMouseUp={() => {
          touchStartRef.current = null;
          panStartRef.current = null;
        }}
      >
        {items.length > 1 && (
          <button
            type="button"
            className="fd-lightbox-arrow fd-lightbox-arrow--prev fd-lightbox-arrow--desktop"
            aria-label="Previous image"
            onClick={() => setIndex(index - 1)}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {!imgLoaded && !imgError && (
          <div
            style={{
              width: 'min(520px, 80vw)',
              aspectRatio: '16 / 10',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="fd-img-skeleton" />
          </div>
        )}

        {!imgError ? (
          <img
            src={fullSrc}
            alt={currentItem.alt}
            referrerPolicy="no-referrer"
            className="fd-lightbox-img"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
            onClick={() => {
              setZoomed((z) => !z);
              setPan({ x: 0, y: 0 });
            }}
            style={{
              display: imgLoaded ? 'block' : 'none',
              cursor: zoomed ? 'grab' : 'zoom-in',
              transform: zoomed
                ? `translate(${pan.x}px, ${pan.y}px) scale(1.75)`
                : 'translate(0, 0) scale(1)',
            }}
          />
        ) : (
          <div
            className="fd-img-fallback"
            style={{ position: 'relative', width: 'min(520px, 85vw)', aspectRatio: '16 / 10', borderRadius: '8px' }}
          >
            <div style={{ width: '140px' }}>
              <DumpTruck fillPercent={50} />
            </div>
            <span className="t-body-sm">{currentItem.title || currentItem.alt}</span>
          </div>
        )}

        {items.length > 1 && (
          <button
            type="button"
            className="fd-lightbox-arrow fd-lightbox-arrow--next fd-lightbox-arrow--desktop"
            aria-label="Next image"
            onClick={() => setIndex(index + 1)}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fd-lightbox-bottom">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ minWidth: 0, flex: '1 1 260px' }}>
            {currentItem.caption && (
              <p className="t-body-sm" style={{ color: 'var(--silver-200)' }}>
                {currentItem.caption}
              </p>
            )}
            {(currentItem.town || currentItem.categoryLabel) && (
              <p className="t-label" style={{ color: 'var(--silver-300)', marginTop: '3px', fontSize: '0.7rem' }}>
                {[currentItem.categoryLabel, currentItem.town].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {items.length > 1 && (
              <div style={{ display: 'flex', gap: '6px' }} className="fd-lightbox-mobile-arrows">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => setIndex(index - 1)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-graphite)',
                    color: '#ffffff',
                    border: '1px solid var(--border-dark-strong)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => setIndex(index + 1)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--bg-graphite)',
                    color: '#ffffff',
                    border: '1px solid var(--border-dark-strong)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <LinkButton
              to="/get-an-estimate"
              variant="primary"
              size="sm"
              onClick={close}
            >
              Get a Free Estimate
            </LinkButton>
            <LinkButton href={business.phoneHref} variant="outline-dark" size="sm">
              <Phone size={15} />
              <span>Call</span>
            </LinkButton>
          </div>
        </div>

        {items.length > 1 && (
          <div className="fd-lightbox-thumbs">
            {items.map((item, idx) => (
              <button
                key={`${item.url}-${idx}`}
                type="button"
                aria-label={`View image ${idx + 1}: ${item.title || item.alt}`}
                aria-current={idx === index ? 'true' : undefined}
                className="fd-lightbox-thumb-btn"
                onClick={() => setIndex(idx)}
              >
                <img src={getThumb(item.url)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalNode, document.body);
};
