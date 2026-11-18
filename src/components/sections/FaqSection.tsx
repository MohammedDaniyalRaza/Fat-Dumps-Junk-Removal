import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { faqCategories, faqs } from '../../data/faqs';
import { LinkButton } from '../ui/Button';
import { Accordion, Tabs } from '../ui/InteractiveControls';

interface FaqSectionProps {
  showCategoryTabs?: boolean;
  limit?: number;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ showCategoryTabs = false, limit }) => {
  const [activeCat, setActiveCat] = useState('All');

  const items = useMemo(() => {
    let list = faqs;
    if (showCategoryTabs && activeCat !== 'All') {
      list = list.filter((f) => f.category === activeCat);
    }
    if (limit) list = list.slice(0, limit);
    return list.map((f) => ({ id: f.id, question: f.q, answer: f.a }));
  }, [activeCat, limit, showCategoryTabs]);

  return (
    <section className="section surface-ink hairline-top">
      <div className="container-narrow">
        <div style={{ marginBottom: '28px' }}>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '10px' }}>
            Questions &amp; Answers
          </p>
          <h2 className="t-display-xl">
            <span className="text-metal">Straight answers</span>{' '}
            <span className="t-serif-accent" style={{ color: 'var(--lime)' }}>
              before we roll up.
            </span>
          </h2>
        </div>

        {showCategoryTabs && (
          <div style={{ marginBottom: '26px' }}>
            <Tabs tabs={faqCategories} activeTab={activeCat} onChange={setActiveCat} />
          </div>
        )}

        <Accordion items={items} />

        {!showCategoryTabs && (
          <div style={{ marginTop: '26px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <p className="t-body-sm muted-dark">
              Have a specific item or access question? Ask us anytime.
            </p>
            <LinkButton to="/faq" variant="outline-dark" size="sm">
              <span>View All 18 FAQs</span>
              <ArrowRight size={15} />
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
};
