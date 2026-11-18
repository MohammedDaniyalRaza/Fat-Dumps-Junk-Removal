import React from 'react';
import { Camera, CheckCircle2, Truck } from 'lucide-react';
import { business } from '../../data/business';
import { LinkButton } from '../ui/Button';

const STEPS = [
  {
    num: '01',
    title: 'Send Photos & Location',
    body: 'Text or email a picture of the items, your general North County location, and a brief description.',
    Icon: Camera,
  },
  {
    num: '02',
    title: 'Get a Free Estimate',
    body: 'We review the load size and pickup access, then get back to you with a clear, no-obligation estimate.',
    Icon: CheckCircle2,
  },
  {
    num: '03',
    title: 'We Haul It Away',
    body: 'Pick a flexible morning, afternoon, or weekend window. We carry it out, load the truck, and sweep up.',
    Icon: Truck,
  },
];

export const ProcessSteps: React.FC = () => (
  <section className="section surface-light" data-surface="light">
    <div className="container">
      <div className="section-head section-head-split">
        <div>
          <p className="t-label" style={{ color: 'var(--green-deep)', marginBottom: '10px' }}>
            How It Works
          </p>
          <h2 className="t-display-xl" style={{ color: '#0d0f0d' }}>
            Three steps.{' '}
            <span className="t-serif-accent" style={{ color: 'var(--green-deep)' }}>
              Zero guesswork.
            </span>
          </h2>
        </div>
        <p className="t-body muted-light">{business.estimatePrompt}</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '22px',
        }}
      >
        {STEPS.map(({ num, title, body, Icon }) => (
          <article
            key={num}
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                className="t-display-lg t-tabular"
                style={{ color: '#0d0f0d', opacity: 0.28 }}
              >
                {num}
              </span>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#0d0f0d',
                  color: 'var(--lime)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} />
              </span>
            </div>
            <h3 className="t-display-md" style={{ color: '#0d0f0d' }}>
              {title}
            </h3>
            <p className="t-body-sm" style={{ color: 'var(--muted-on-light)' }}>
              {body}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
        }}
      >
        <p className="t-hand" style={{ fontSize: '1.75rem', color: '#0d0f0d' }}>
          {business.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <LinkButton to="/get-an-estimate" variant="dark">
            Send Photos for Estimate
          </LinkButton>
          <LinkButton href={business.phoneHref} variant="outline-light">
            Call {business.phoneDisplay}
          </LinkButton>
        </div>
      </div>
    </div>
  </section>
);
