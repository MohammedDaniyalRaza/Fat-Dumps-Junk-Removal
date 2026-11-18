import React from 'react';

interface DumpTruckProps {
  className?: string;
  wheelClassName?: string;
  fillPercent?: number;
  showRecycle?: boolean;
}

export const DumpTruck: React.FC<DumpTruckProps> = ({
  className = '',
  wheelClassName = 'fd-truck-wheel',
  fillPercent = 0,
  showRecycle = true,
}) => {
  const clampedFill = Math.max(0, Math.min(100, fillPercent));

  return (
    <svg
      viewBox="0 0 360 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ground line */}
      <line x1="12" y1="142" x2="348" y2="142" stroke="#5E6368" strokeWidth="2" strokeLinecap="round" />

      {/* Dump Bed Interior + Dynamic Fill */}
      <defs>
        <clipPath id="dump-bed-clip">
          <rect x="28" y="34" width="176" height="72" rx="4" />
        </clipPath>
        <linearGradient id="metal-bed-grad" x1="28" y1="34" x2="204" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#262B26" />
          <stop offset="50%" stopColor="#171A17" />
          <stop offset="100%" stopColor="#0E100E" />
        </linearGradient>
        <linearGradient id="cab-silver-grad" x1="210" y1="42" x2="336" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F2F4F7" />
          <stop offset="55%" stopColor="#B9BEC4" />
          <stop offset="100%" stopColor="#8B9096" />
        </linearGradient>
      </defs>

      {/* Stacked junk above rim when > 65% */}
      <g clipPath="url(#dump-bed-clip)">
        <rect
          x="28"
          y={106 - (72 * clampedFill) / 100}
          width="176"
          height={(72 * clampedFill) / 100}
          fill="rgba(132, 224, 27, 0.22)"
        />
        {clampedFill > 0 && (
          <line
            x1="28"
            y1={106 - (72 * clampedFill) / 100}
            x2="204"
            y2={106 - (72 * clampedFill) / 100}
            stroke="#84E01B"
            strokeWidth="2.5"
          />
        )}
      </g>

      {/* Dump Bed Exterior */}
      <path
        d="M24 34H208V106H24V34Z"
        fill="url(#metal-bed-grad)"
        stroke="#E6E9EC"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Bed Ribs */}
      <line x1="60" y1="36" x2="60" y2="104" stroke="#5E6368" strokeWidth="2" />
      <line x1="98" y1="36" x2="98" y2="104" stroke="#5E6368" strokeWidth="2" />
      <line x1="136" y1="36" x2="136" y2="104" stroke="#5E6368" strokeWidth="2" />
      <line x1="174" y1="36" x2="174" y2="104" stroke="#5E6368" strokeWidth="2" />

      {/* Top lip & Safety Reflector strip */}
      <rect x="20" y="28" width="192" height="7" rx="2" fill="#B9BEC4" />
      <rect x="26" y="106" width="180" height="5" fill="#84E01B" />

      {/* Recycle Symbol on Bed */}
      {showRecycle && (
        <g transform="translate(103, 55) scale(0.9)">
          <path
            d="M15 2L22 13H17L13.5 7L10 13H5L12 2H15Z"
            fill="#84E01B"
          />
          <path
            d="M25 18L19 29H13L16 23.5L9.5 23.5L7 19L19.5 19L22 14.5L25 18Z"
            fill="#84E01B"
          />
          <path
            d="M2 18L8 7L11 12L7.5 18L14 18L14 23L5 23L2 18Z"
            fill="#84E01B"
            opacity="0.9"
          />
        </g>
      )}

      {/* Chassis Rail */}
      <rect x="34" y="111" width="292" height="11" rx="3" fill="#202420" stroke="#5E6368" strokeWidth="1.5" />

      {/* Cab */}
      <path
        d="M214 48H276C284 48 292 53 297 61L314 86H332C338 86 342 91 342 97V118H214V48Z"
        fill="url(#cab-silver-grad)"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cab Windshield & Side Window */}
      <path
        d="M226 57H272C277 57 282 60 285 65L296 84H226V57Z"
        fill="#0D0F0D"
        stroke="#5E6368"
        strokeWidth="1.5"
      />
      {/* Door handle & Grille */}
      <rect x="242" y="93" width="14" height="3.5" rx="1.5" fill="#202420" />
      <rect x="328" y="92" width="12" height="16" rx="2" fill="#161916" stroke="#84E01B" strokeWidth="1.5" />
      {/* Headlight */}
      <rect x="333" y="109" width="9" height="6" rx="1.5" fill="#A6F23A" />

      {/* Rear Wheel */}
      <g className={wheelClassName} style={{ transformOrigin: '86px 124px' }}>
        <circle cx="86" cy="124" r="20" fill="#0D0F0D" stroke="#E6E9EC" strokeWidth="3" />
        <circle cx="86" cy="124" r="10" fill="#202420" stroke="#84E01B" strokeWidth="2" />
        <circle cx="86" cy="124" r="3.5" fill="#E6E9EC" />
        <line x1="86" y1="114" x2="86" y2="134" stroke="#8B9096" strokeWidth="1.5" />
        <line x1="76" y1="124" x2="96" y2="124" stroke="#8B9096" strokeWidth="1.5" />
      </g>

      {/* Rear Tandem / Mid Wheel */}
      <g className={wheelClassName} style={{ transformOrigin: '146px 124px' }}>
        <circle cx="146" cy="124" r="20" fill="#0D0F0D" stroke="#E6E9EC" strokeWidth="3" />
        <circle cx="146" cy="124" r="10" fill="#202420" stroke="#84E01B" strokeWidth="2" />
        <circle cx="146" cy="124" r="3.5" fill="#E6E9EC" />
        <line x1="146" y1="114" x2="146" y2="134" stroke="#8B9096" strokeWidth="1.5" />
        <line x1="136" y1="124" x2="156" y2="124" stroke="#8B9096" strokeWidth="1.5" />
      </g>

      {/* Front Wheel */}
      <g className={wheelClassName} style={{ transformOrigin: '286px 124px' }}>
        <circle cx="286" cy="124" r="20" fill="#0D0F0D" stroke="#E6E9EC" strokeWidth="3" />
        <circle cx="286" cy="124" r="10" fill="#202420" stroke="#84E01B" strokeWidth="2" />
        <circle cx="286" cy="124" r="3.5" fill="#E6E9EC" />
        <line x1="286" y1="114" x2="286" y2="134" stroke="#8B9096" strokeWidth="1.5" />
        <line x1="276" y1="124" x2="296" y2="124" stroke="#8B9096" strokeWidth="1.5" />
      </g>
    </svg>
  );
};
