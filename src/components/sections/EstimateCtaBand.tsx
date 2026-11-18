import React from 'react';
import { Camera, Mail, MessageSquare, Phone } from 'lucide-react';
import { business } from '../../data/business';
import { images } from '../../data/images';
import { BannerRibbon } from '../svg/BrandGlyphs';
import { LinkButton } from '../ui/Button';

export const EstimateCtaBand: React.FC<{ imageKey?: keyof typeof images }> = ({
  imageKey = 'coastalNorthCounty',
}) => {
  const bg = images[imageKey] || images.coastalNorthCounty;

  return (
    <section
      className="section hairline-top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-black)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <img
          src={bg.url}
          alt={bg.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: bg.focalPoint,
            opacity: 0.34,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 80% 30%, rgba(132, 224, 27, 0.16), transparent 52%), linear-gradient(90deg, rgba(7, 8, 7, 0.96) 0%, rgba(7, 8, 7, 0.84) 65%, rgba(7, 8, 7, 0.92) 100%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ marginBottom: '14px' }}>
              <BannerRibbon label="FREE PHOTO ESTIMATES" />
            </div>
            <h2 className="t-display-xl" style={{ maxWidth: '16ch' }}>
              <span className="text-metal">Send a picture.</span>{' '}
              <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
                Consider it gone.
              </span>
            </h2>
            <p className="t-body-lg" style={{ color: 'var(--silver-200)', marginTop: '14px', maxWidth: '48ch' }}>
              {business.estimatePrompt}
            </p>
            <p className="t-hand" style={{ fontSize: '1.65rem', color: 'var(--lime-bright)', marginTop: '12px' }}>
              {business.tagline}
            </p>
          </div>

          <div
            style={{
              padding: '26px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(13, 15, 13, 0.92)',
              border: '1px solid var(--border-lime)',
              display: 'grid',
              gap: '11px',
            }}
          >
            <LinkButton to="/get-an-estimate" variant="primary" size="lg" fullWidth>
              <Camera size={18} />
              <span>Send Photos for a Free Estimate</span>
            </LinkButton>
            <LinkButton href={business.smsHref} variant="light" fullWidth>
              <MessageSquare size={17} />
              <span>Text Photos to {business.phoneDisplay}</span>
            </LinkButton>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <LinkButton href={business.phoneHref} variant="outline-dark" size="sm" fullWidth>
                <Phone size={15} />
                <span>Call Us</span>
              </LinkButton>
              <LinkButton href={business.emailHref} variant="outline-dark" size="sm" fullWidth>
                <Mail size={15} />
                <span>Email</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
