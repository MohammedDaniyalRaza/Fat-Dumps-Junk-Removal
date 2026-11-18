import React, { useState } from 'react';
import { areasData } from '../../data/areas';

interface AreaMapProps {
  selectedTown?: string;
  onSelectTown?: (townName: string) => void;
}

export const AreaMap: React.FC<AreaMapProps> = ({ selectedTown, onSelectTown }) => {
  const [hoveredTown, setHoveredTown] = useState<string | null>(null);
  const activeName = hoveredTown || selectedTown || 'Carlsbad';
  const activeInfo = areasData.towns.find((t) => t.name === activeName) || areasData.towns[1];

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(155deg, #0d110e 0%, #070807 60%, #101610 100%)',
        border: '1px solid var(--border-dark-strong)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          borderBottom: '1px solid var(--border-dark)',
          paddingBottom: '12px',
        }}
      >
        <div>
          <p className="t-label" style={{ color: 'var(--lime)' }}>
            Interactive Coverage Map
          </p>
          <p className="t-display-md" style={{ color: 'var(--white)', marginTop: '4px' }}>
            {activeInfo.name}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="t-label" style={{ color: 'var(--silver-200)', display: 'block' }}>
            {activeInfo.zone}
          </span>
          <span className="t-body-sm t-tabular" style={{ color: 'var(--silver-300)' }}>
            ZIP {activeInfo.zipSample}
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 560 400"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Stylized map of North County San Diego towns served by Fat Dumps"
      >
        <defs>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#09151a" />
            <stop offset="100%" stopColor="#070a0b" />
          </linearGradient>
          <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(230,233,236,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Ocean Left Wedge */}
        <path d="M0 0H125L188 400H0V0Z" fill="url(#ocean-grad)" />
        <rect width="560" height="400" fill="url(#map-grid)" />

        {/* Pacific Ocean Label */}
        <text
          x="36"
          y="255"
          transform="rotate(-78 36 255)"
          fill="rgba(185, 190, 196, 0.25)"
          fontSize="14"
          fontFamily="Chivo Mono, monospace"
          letterSpacing="0.32em"
        >
          PACIFIC OCEAN
        </text>

        {/* Coastline */}
        <path
          d="M100 0 C112 72, 134 148, 162 218 C178 260, 194 330, 208 400"
          fill="none"
          stroke="rgba(132, 224, 27, 0.45)"
          strokeWidth="2.5"
        />

        {/* I-5 Corridor */}
        <path
          d="M114 0 C126 78, 148 158, 174 226 C188 264, 200 330, 214 400"
          fill="none"
          stroke="rgba(230, 233, 236, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* SR-78 East-West Corridor */}
        <path
          d="M126 105 C210 112, 260 155, 372 195 L520 218"
          fill="none"
          stroke="rgba(230, 233, 236, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* I-15 North-South Corridor */}
        <path
          d="M315 0 C330 85, 355 150, 368 202 C376 255, 382 325, 392 400"
          fill="none"
          stroke="rgba(230, 233, 236, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Route Tags */}
        <text x="128" y="46" fill="#8B9096" fontSize="10" fontFamily="Chivo Mono, monospace">
          I-5
        </text>
        <text x="322" y="138" fill="#8B9096" fontSize="10" fontFamily="Chivo Mono, monospace">
          SR-78
        </text>
        <text x="380" y="255" fill="#8B9096" fontSize="10" fontFamily="Chivo Mono, monospace">
          I-15
        </text>

        {/* Town Nodes */}
        {areasData.towns.map((town) => {
          const isActive = town.name === activeName;
          return (
            <g
              key={town.name}
              transform={`translate(${town.mapX}, ${town.mapY})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredTown(town.name)}
              onMouseLeave={() => setHoveredTown(null)}
              onClick={() => onSelectTown?.(town.name)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${town.name} in ${town.zone}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTown?.(town.name);
                }
              }}
            >
              {isActive && (
                <circle r="15" fill="rgba(132, 224, 27, 0.22)" stroke="#84E01B" strokeWidth="1.2" />
              )}
              <circle
                r={isActive ? 6.5 : 4.5}
                fill={isActive ? '#84E01B' : '#E6E9EC'}
                stroke="#070807"
                strokeWidth="2"
              />
              <text
                x="10"
                y="4"
                fill={isActive ? '#A6F23A' : '#B9BEC4'}
                fontSize={isActive ? '12' : '10.5'}
                fontWeight={isActive ? '700' : '500'}
                fontFamily="Familjen Grotesk, sans-serif"
              >
                {town.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
