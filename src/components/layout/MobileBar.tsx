import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, Phone } from 'lucide-react';
import { business } from '../../data/business';
import './layout.css';

export const MobileBar: React.FC = () => (
  <nav className="fd-mobile-bar" aria-label="Quick contact actions">
    <a href={business.phoneHref} className="fd-mobile-bar-btn">
      <Phone size={16} style={{ color: 'var(--lime)' }} />
      <span>Call</span>
    </a>
    <a href={business.smsHref} className="fd-mobile-bar-btn">
      <MessageSquare size={16} style={{ color: 'var(--lime)' }} />
      <span>Text Photos</span>
    </a>
    <Link to="/get-an-estimate" className="fd-mobile-bar-btn fd-mobile-bar-btn--primary">
      <Camera size={16} />
      <span>Estimate</span>
    </Link>
  </nav>
);
