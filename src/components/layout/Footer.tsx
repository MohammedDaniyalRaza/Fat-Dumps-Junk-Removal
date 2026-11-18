import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { business } from '../../data/business';
import { footerColumns } from '../../data/nav';
import { BannerRibbon } from '../svg/BrandGlyphs';
import { LinkButton } from '../ui/Button';
import './layout.css';

export const Footer: React.FC = () => {
  const hasSocial = Object.values(business.social).some((val) => Boolean(val));

  return (
    <footer className="fd-footer metal-edge-top">
      <div className="container">
        <div className="fd-footer-grid">
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img
                src={business.logo}
                alt={business.fullName}
                style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
            <div style={{ marginBottom: '14px' }}>
              <BannerRibbon label={business.bannerLabel} />
            </div>
            <p className="t-body" style={{ color: 'var(--silver-200)', maxWidth: '34ch' }}>
              {business.serviceAreaHeadline}. {business.tagline}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
              <a
                href={business.phoneHref}
                className="t-body t-tabular"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: 'var(--lime)', fontWeight: 700 }}
              >
                <Phone size={16} />
                <span>{business.phoneDisplay}</span>
              </a>
              <a
                href={business.emailHref}
                className="t-body-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: 'var(--silver-200)', wordBreak: 'break-word' }}
              >
                <Mail size={16} style={{ color: 'var(--lime)', flexShrink: 0 }} />
                <span>{business.email}</span>
              </a>
              <p
                className="t-body-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', color: 'var(--silver-300)' }}
              >
                <MapPin size={16} style={{ color: 'var(--silver-300)', flexShrink: 0 }} />
                <span>{business.serviceAreaShort}</span>
              </p>

              {business.address && (
                <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                  {business.address}
                </p>
              )}
              {business.hours && (
                <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                  Hours: {business.hours}
                </p>
              )}
              {business.licenseDetails && (
                <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
                  {business.licenseDetails}
                </p>
              )}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '14px' }}>
              Services
            </p>
            <ul>
              {footerColumns.services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="fd-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '14px' }}>
              Explore
            </p>
            <ul>
              {footerColumns.explore.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="fd-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerColumns.resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="fd-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Photo Estimate CTA Box */}
          <div
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-graphite)',
              border: '1px solid var(--border-dark-strong)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <p className="t-label" style={{ color: 'var(--lime)' }}>
                Free Photo Estimate
              </p>
              <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '8px' }}>
                Text a photo of your pile.
              </h3>
              <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                Send a picture of the items, your general location, and a brief description.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <LinkButton to="/get-an-estimate" variant="primary" size="sm" fullWidth>
                Start Photo Estimate
              </LinkButton>
              <LinkButton href={business.smsHref} variant="outline-dark" size="sm" fullWidth>
                <MessageSquare size={15} />
                <span>Text {business.phoneDisplay}</span>
              </LinkButton>
            </div>
          </div>
        </div>

        <div
          className="hairline-top"
          style={{
            marginTop: '44px',
            paddingTop: '22px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p className="t-body-sm" style={{ color: 'var(--silver-300)' }}>
            © {new Date().getFullYear()} {business.fullName}. Serving North County San Diego.
          </p>
          {hasSocial && (
            <div style={{ display: 'flex', gap: '14px' }}>
              {Object.entries(business.social)
                .filter(([, url]) => Boolean(url))
                .map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-label"
                    style={{ color: 'var(--silver-200)' }}
                  >
                    {network}
                  </a>
                ))}
            </div>
          )}
          <p className="t-hand" style={{ fontSize: '1.35rem', color: 'var(--lime)' }}>
            {business.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};
