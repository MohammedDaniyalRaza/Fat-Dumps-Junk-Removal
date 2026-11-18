import React, { useState } from 'react';
import { Camera, CheckCircle2, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { PageHero } from '../../components/sections/PageHero';
import { Button, LinkButton } from '../../components/ui/Button';
import { Chip, Input, Select, Textarea } from '../../components/ui/FormControls';
import { areasData } from '../../data/areas';
import { business } from '../../data/business';
import { services } from '../../data/services';
import { formatPhoneDigits, isValidEmail, isValidPhone } from '../../lib/helpers';
import { usePageSeo } from '../../lib/seo';
import { submitQuote } from '../../services/quote';

export default function ContactPage() {
  usePageSeo({
    title: 'Contact Fat Dumps — North County San Diego Junk Removal',
    description:
      'Call or text (619) 627-5859, email Anguiano.cristobal.07@gmail.com, or send a quick message for junk removal in North County San Diego.',
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sentResult, setSentResult] = useState<{
    id: string;
    smsHref: string;
    mailtoHref: string;
  } | null>(null);

  const cityOptions = [
    ...areasData.towns.map((t) => ({ value: t.name, label: t.name, meta: t.zone })),
    { value: 'Other / Surrounding Area', label: 'Other / Surrounding Area' },
  ];

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!isValidPhone(phone)) nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    if (email.trim() && !isValidEmail(email)) nextErrors.email = 'Please enter a valid email address.';
    if (!message.trim()) nextErrors.message = 'Tell us briefly what you need hauled or ask your question.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await submitQuote({
        name: name.trim(),
        phone: phone.trim(),
        city: city || 'North County San Diego',
        categories: selectedServices,
        description: `${message.trim()}${email.trim() ? ` (Reply email: ${email.trim()})` : ''}`,
        photoCount: 0,
      });
      setSentResult(res);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        imageKey="coastalNorthCounty"
        title="Reach Out"
        accentWord="Today"
        subtitle={`${business.tagline} Call, text photos, email, or drop your details below.`}
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="section surface-black">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Direct Contact Column */}
            <div style={{ display: 'grid', gap: '20px' }}>
              <div
                style={{
                  padding: '26px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark-strong)',
                }}
              >
                <p className="t-label" style={{ color: 'var(--lime)' }}>
                  Direct Line
                </p>
                <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '8px' }}>
                  Call or Text Photos
                </h2>
                <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                  {business.estimatePrompt}
                </p>

                <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                  <LinkButton href={business.phoneHref} variant="primary" size="lg" fullWidth>
                    <Phone size={18} />
                    <span className="t-tabular">Call {business.phoneDisplay}</span>
                  </LinkButton>
                  <LinkButton href={business.smsHref} variant="light" size="lg" fullWidth>
                    <MessageSquare size={18} />
                    <span>Text Photos to {business.phoneDisplay}</span>
                  </LinkButton>
                  <LinkButton href={business.emailHref} variant="outline-dark" fullWidth>
                    <Mail size={17} />
                    <span>{business.email}</span>
                  </LinkButton>
                </div>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-graphite)',
                  border: '1px solid var(--border-lime)',
                }}
              >
                <p className="t-label" style={{ color: 'var(--lime)' }}>
                  Send Photos Step-by-Step
                </p>
                <h3 className="t-display-md" style={{ color: 'var(--white)', marginTop: '6px' }}>
                  Have pictures on your phone or desktop?
                </h3>
                <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                  Use our guided 4-step Photo Estimator to organize photos, rough load size, and access notes.
                </p>
                <div style={{ marginTop: '14px' }}>
                  <LinkButton to="/get-an-estimate" variant="primary" size="sm">
                    <Camera size={16} />
                    <span>Open Photo Estimator</span>
                  </LinkButton>
                </div>
              </div>

              <div
                style={{
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-ink)',
                  border: '1px solid var(--border-dark)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lime)' }}>
                  <MapPin size={16} />
                  <span className="t-label">Service Area</span>
                </div>
                <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px' }}>
                  {business.serviceAreaHeadline}. {areasData.note}
                </p>
                {business.hours && (
                  <p className="t-body-sm" style={{ color: 'var(--silver-300)', marginTop: '6px' }}>
                    Hours: {business.hours}
                  </p>
                )}
              </div>
            </div>

            {/* Message Form */}
            <div
              style={{
                padding: 'clamp(22px, 3.5vw, 34px)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-ink)',
                border: '1px solid var(--border-dark-strong)',
              }}
            >
              {sentResult ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--lime)' }}>
                    <CheckCircle2 size={24} />
                    <span className="t-label">Message Prepared · {sentResult.id}</span>
                  </div>
                  <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '10px' }}>
                    Send it straight to us
                  </h2>
                  <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '10px' }}>
                    Choose text or email below to send your prepared inquiry directly—and attach any photos if you have them handy.
                  </p>
                  <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                    <LinkButton href={sentResult.smsHref} variant="primary" size="lg" fullWidth>
                      <MessageSquare size={18} />
                      <span>Send via Text ({business.phoneDisplay})</span>
                    </LinkButton>
                    <LinkButton href={sentResult.mailtoHref} variant="light" size="lg" fullWidth>
                      <Mail size={18} />
                      <span>Send via Email</span>
                    </LinkButton>
                  </div>
                  <Button
                    variant="ghost-dark"
                    size="sm"
                    onClick={() => setSentResult(null)}
                    style={{ marginTop: '14px' }}
                  >
                    Write Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '18px' }}>
                  <div>
                    <p className="t-label" style={{ color: 'var(--lime)' }}>
                      Quick Message
                    </p>
                    <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '6px' }}>
                      Ask a question or request a callback
                    </h2>
                  </div>

                  <Input
                    label="Your Name"
                    required
                    placeholder="Alex Ramirez"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((err) => ({ ...err, name: '' }));
                    }}
                    error={errors.name}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      placeholder="(619) 555-0199"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhoneDigits(e.target.value));
                        setErrors((err) => ({ ...err, phone: '' }));
                      }}
                      error={errors.phone}
                    />
                    <Input
                      label="Email (Optional)"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((err) => ({ ...err, email: '' }));
                      }}
                      error={errors.email}
                    />
                  </div>

                  <Select
                    label="City / Town"
                    options={cityOptions}
                    value={city}
                    onChange={setCity}
                    placeholder="Pick your town..."
                  />

                  <div>
                    <span className="fd-field-label" style={{ marginBottom: '8px' }}>
                      Service Needed (Optional)
                    </span>
                    <div className="fd-chip-group">
                      {services.map((srv) => (
                        <Chip
                          key={srv.slug}
                          label={srv.shortTitle}
                          active={selectedServices.includes(srv.shortTitle)}
                          onClick={() => toggleService(srv.shortTitle)}
                        />
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="Message / Items Description"
                    required
                    placeholder="Tell us what needs to go, stairs/access, or any item you're unsure about."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setErrors((err) => ({ ...err, message: '' }));
                    }}
                    error={errors.message}
                  />

                  <Button type="submit" variant="primary" size="lg" disabled={sending} fullWidth>
                    {sending ? 'Preparing...' : 'Prepare Message to Send'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
