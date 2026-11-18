import React, { useMemo, useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { useLightbox } from '../../app/providers';
import { galleryItems } from '../../data/gallery';
import { getThumb, images } from '../../data/images';
import { LinkButton } from '../ui/Button';
import { Tabs } from '../ui/InteractiveControls';
import { SmartImage } from '../ui/SmartImage';
import './sections.css';

interface GalleryPreviewProps {
  showFilters?: boolean;
  limit?: number;
  categoryFilter?: string;
}

const FILTER_TABS = ['All', 'Residential Cleanouts', 'Furniture & Appliances', 'Garage & Yard'];

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  showFilters = false,
  limit,
  categoryFilter,
}) => {
  const { open } = useLightbox();
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = useMemo(() => {
    let base = galleryItems;
    if (categoryFilter) {
      base = base.filter((item) => item.category === categoryFilter);
    } else if (showFilters && activeTab !== 'All') {
      base = base.filter((item) => item.categoryLabel === activeTab);
    }
    if (limit) base = base.slice(0, limit);
    return base;
  }, [activeTab, categoryFilter, limit, showFilters]);

  const lightboxPayload = useMemo(
    () =>
      filteredItems.map((item) => {
        const img = images[item.imageKey];
        return {
          url: img.url,
          alt: img.alt,
          title: item.title,
          caption: item.caption,
          town: item.town,
          categoryLabel: item.categoryLabel,
        };
      }),
    [filteredItems]
  );

  return (
    <section className="section surface-black hairline-top">
      <div className="container">
        <div className="section-head section-head-split">
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
              Sample Project Gallery
            </p>
            <h2 className="t-display-xl">
              <span className="text-metal">Real-world</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                hauling jobs.
              </span>
            </h2>
          </div>
          <div>
            <p className="t-body muted-dark">
              Tap any photo to inspect full screen. Sample imagery shown—ready for client job photos.
            </p>
            {showFilters && (
              <div style={{ marginTop: '16px' }}>
                <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={setActiveTab} />
              </div>
            )}
          </div>
        </div>

        <div className="fd-gallery-grid">
          {filteredItems.map((item, idx) => {
            const img = images[item.imageKey];
            return (
              <button
                key={item.id}
                type="button"
                className="fd-gallery-tile"
                onClick={(e) => open(lightboxPayload, idx, e.currentTarget)}
                aria-label={`Open full preview: ${item.title}`}
              >
                <div style={{ position: 'relative' }}>
                  <SmartImage
                    src={getThumb(img.url)}
                    alt={img.alt}
                    focalPoint={img.focalPoint}
                    aspectRatio="4 / 3"
                    fallbackTitle={item.title}
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(7, 8, 7, 0.85)',
                      color: 'var(--lime)',
                      border: '1px solid rgba(132, 224, 27, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Maximize2 size={15} />
                  </span>
                </div>

                <div className="fd-gallery-caption">
                  <p className="t-label" style={{ color: 'var(--lime)', fontSize: '0.7rem' }}>
                    {item.categoryLabel} · {item.town}
                  </p>
                  <h3 className="t-display-md" style={{ color: 'var(--white)', fontSize: '1.02rem', marginTop: '4px' }}>
                    {item.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {!showFilters && (
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
            <LinkButton to="/gallery" variant="outline-dark">
              <span>Explore Full Gallery</span>
              <ArrowRight size={16} />
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
};
