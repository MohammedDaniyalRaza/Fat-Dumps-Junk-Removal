import React from 'react';

export const HouseOutline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 120 104" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path
      d="M12 52L60 12L108 52"
      stroke="#E6E9EC"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 46V94H96V46"
      stroke="#B9BEC4"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <rect x="49" y="48" width="22" height="22" rx="2" stroke="#84E01B" strokeWidth="2" />
    <line x1="60" y1="48" x2="60" y2="70" stroke="#84E01B" strokeWidth="1.5" />
    <line x1="49" y1="59" x2="71" y2="59" stroke="#84E01B" strokeWidth="1.5" />
  </svg>
);

export const TrashBin: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 84 108" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="28" y="10" width="28" height="8" rx="3" stroke="#E6E9EC" strokeWidth="2.4" />
    <path d="M12 22H72L68 30H16L12 22Z" fill="#202420" stroke="#E6E9EC" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M18 30L23 96H61L66 30" fill="#161916" stroke="#B9BEC4" strokeWidth="2.4" strokeLinejoin="round" />
    <line x1="31" y1="42" x2="33" y2="84" stroke="#84E01B" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="42" y1="42" x2="42" y2="84" stroke="#84E01B" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="53" y1="42" x2="51" y2="84" stroke="#84E01B" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const RecycleGlyph: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M24 6L33 21H26L22 14L17 21H10L20 6H24Z" fill="#84E01B" />
    <path d="M39 29L30 43H22L26 35H16L13 30H30L34 23L39 29Z" fill="#84E01B" />
    <path d="M7 29L15 15L20 22L15 30H24V37H11L7 29Z" fill="#A6F23A" />
  </svg>
);

export const BannerRibbon: React.FC<{ label?: string; className?: string }> = ({
  label = 'JUNK REMOVAL',
  className = '',
}) => (
  <span
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '6px 14px',
      background: 'linear-gradient(90deg, #1b4d09 0%, #2f7a12 50%, #1b4d09 100%)',
      border: '1px solid rgba(132, 224, 27, 0.5)',
      borderRadius: '4px',
      color: '#ffffff',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}
  >
    <span aria-hidden="true" style={{ width: '16px', height: '2px', background: '#84E01B', display: 'inline-block' }} />
    <span>{label}</span>
    <span aria-hidden="true" style={{ width: '16px', height: '2px', background: '#84E01B', display: 'inline-block' }} />
  </span>
);
