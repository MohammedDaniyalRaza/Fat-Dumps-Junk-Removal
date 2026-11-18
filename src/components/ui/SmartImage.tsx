import React, { useState } from 'react';
import { DumpTruck } from '../svg/DumpTruck';
import './ui.css';

interface SmartImageProps {
  src: string;
  alt: string;
  focalPoint?: string;
  aspectRatio?: string;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
  onLoad?: () => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  focalPoint = '50% 50%',
  aspectRatio = '16 / 10',
  eager = false,
  className = '',
  imgClassName = '',
  fallbackTitle,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`fd-img-frame ${className}`}
      style={{ aspectRatio }}
    >
      {!loaded && !errored && <div className="fd-img-skeleton" aria-hidden="true" />}

      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          className={`fd-img-el ${imgClassName}`}
          style={{
            objectPosition: focalPoint,
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => {
            setLoaded(true);
            onLoad?.();
          }}
          onError={() => {
            setErrored(true);
            setLoaded(true);
          }}
        />
      ) : (
        <div className="fd-img-fallback" role="img" aria-label={alt}>
          <div style={{ width: '120px', opacity: 0.9 }}>
            <DumpTruck fillPercent={45} />
          </div>
          {fallbackTitle && (
            <span className="t-label" style={{ color: 'var(--silver-200)' }}>
              {fallbackTitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
