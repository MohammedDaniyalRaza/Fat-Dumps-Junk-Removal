import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MessageSquare,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { areasData } from '../../data/areas';
import { business } from '../../data/business';
import {
  accessOptions,
  itemCategoryChips,
  loadSizes,
  timingOptions,
} from '../../data/estimate';
import { formatPhoneDigits, isValidPhone } from '../../lib/helpers';
import { submitQuote } from '../../services/quote';
import { LoadVisualizer } from '../sections/LoadVisualizer';
import { Button, LinkButton } from '../ui/Button';
import { Chip, DatePicker, Input, Select, Textarea } from '../ui/FormControls';
import { Stepper } from '../ui/InteractiveControls';
import { PhotoDropzone, SelectedPhoto } from '../ui/PhotoDropzone';

const STEPS = [
  { id: 1, label: 'Photos' },
  { id: 2, label: 'Location' },
  { id: 3, label: 'Items & Size' },
  { id: 4, label: 'Send' },
];

export const EstimateWizard: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [city, setCity] = useState(() => searchParams.get('city') || '');
  const [areaDetail, setAreaDetail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loadSizeId, setLoadSizeId] = useState(() => {
    const q = searchParams.get('load');
    return loadSizes.some((l) => l.id === q) ? (q as string) : 'half';
  });
  const [access, setAccess] = useState('Ground Floor / Driveway');
  const [timing, setTiming] = useState('Flexible');
  const [preferredDate, setPreferredDate] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'Text / SMS' | 'Phone Call' | 'Email'>('Text / SMS');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    summaryText: string;
    smsHref: string;
    mailtoHref: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cityOptions = useMemo(
    () => [
      ...areasData.towns.map((t) => ({ value: t.name, label: t.name, meta: t.zone })),
      { value: 'Other / Surrounding Area', label: 'Other / Surrounding Area', meta: 'Tell us below' },
    ],
    []
  );

  const selectedLoadObj = loadSizes.find((l) => l.id === loadSizeId) || loadSizes[2];

  const handleAddFiles = (files: File[]) => {
    setPhotos((prev) => {
      const remaining = 8 - prev.length;
      if (remaining <= 0) return prev;
      const added = files.slice(0, remaining).map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: file.name,
        previewUrl: URL.createObjectURL(file),
        sizeBytes: file.size,
      }));
      return [...prev, ...added];
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const validateStep = (targetStep: number): boolean => {
    const nextErrors: Record<string, string> = {};
    if (targetStep === 2) {
      if (!city) nextErrors.city = 'Please pick a North County city or choose Other.';
    }
    if (targetStep === 3) {
      if (categories.length === 0 && !description.trim()) {
        nextErrors.description = 'Pick at least one item type or write a quick description.';
      }
    }
    if (targetStep === 4) {
      if (!name.trim()) nextErrors.name = 'Please enter your name.';
      if (!isValidPhone(phone)) nextErrors.phone = 'Please enter a 10-digit phone number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      const res = await submitQuote({
        name: name.trim(),
        phone: phone.trim(),
        contactMethod,
        city,
        areaDetail: areaDetail.trim(),
        categories,
        loadSizeLabel: selectedLoadObj.label,
        access,
        timing,
        preferredDate: timing === 'Specific Date' ? preferredDate : '',
        description: description.trim(),
        photoCount: photos.length,
      });
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked
    }
  };

  const resetWizard = () => {
    setResult(null);
    setStep(1);
    setErrors({});
  };

  if (result) {
    return (
      <div
        style={{
          padding: 'clamp(24px, 4vw, 42px)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-ink)',
          border: '1.5px solid var(--lime)',
          boxShadow: 'var(--lime-glow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--lime)',
              color: '#070807',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={24} />
          </span>
          <div>
            <p className="t-label" style={{ color: 'var(--lime)' }}>
              Estimate Summary Ready · Ref {result.id}
            </p>
            <h2 className="t-display-lg" style={{ color: 'var(--white)', marginTop: '2px' }}>
              Now send your photos directly.
            </h2>
          </div>
        </div>

        <p className="t-body" style={{ color: 'var(--silver-200)', maxWidth: '62ch' }}>
          Your browser kept your photos private—nothing was uploaded to a server. Tap{' '}
          <strong style={{ color: 'var(--white)' }}>Text Your Photos</strong> or{' '}
          <strong style={{ color: 'var(--white)' }}>Email Your Photos</strong> below to send your pre-filled summary and attach the pictures in one quick step.
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <LinkButton href={result.smsHref} variant="primary" size="lg" fullWidth>
            <MessageSquare size={18} />
            <span>Text Photos to {business.phoneDisplay}</span>
          </LinkButton>

          <LinkButton href={result.mailtoHref} variant="light" size="lg" fullWidth>
            <Mail size={18} />
            <span>Email Your Photos</span>
          </LinkButton>

          <LinkButton href={business.phoneHref} variant="outline-dark" size="lg" fullWidth>
            <Phone size={18} />
            <span>Call {business.phoneDisplay}</span>
          </LinkButton>
        </div>

        {/* Summary Preview & Copy */}
        <div
          style={{
            marginTop: '26px',
            padding: '20px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-graphite)',
            border: '1px solid var(--border-dark-strong)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <span className="t-label" style={{ color: 'var(--lime)' }}>
              Your Pre-Filled Message
            </span>
            <Button variant="outline-dark" size="sm" onClick={handleCopySummary}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              <span>{copied ? 'Copied!' : 'Copy Details'}</span>
            </Button>
          </div>
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              lineHeight: 1.55,
              color: 'var(--silver-100)',
            }}
          >
            {result.summaryText}
          </pre>

          {photos.length > 0 && (
            <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-dark)' }}>
              <p className="t-label" style={{ color: 'var(--silver-200)', marginBottom: '10px' }}>
                Remember to attach these {photos.length} selected photo{photos.length === 1 ? '' : 's'} in your text or email:
              </p>
              <div className="fd-photo-grid" style={{ marginTop: 0 }}>
                {photos.map((p) => (
                  <div key={p.id} className="fd-photo-thumb">
                    <img src={p.previewUrl} alt={p.name} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p className="t-hand" style={{ fontSize: '1.5rem', color: 'var(--lime)' }}>
            {business.tagline}
          </p>
          <Button variant="ghost-dark" size="sm" onClick={resetWizard}>
            <RotateCcw size={15} />
            <span>Edit Estimate Details</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        padding: 'clamp(20px, 4vw, 40px)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-ink)',
        border: '1px solid var(--border-dark-strong)',
      }}
    >
      <Stepper
        steps={STEPS}
        currentStep={step}
        onStepClick={(s) => setStep(s)}
      />

      {/* STEP 1: PHOTOS */}
      {step === 1 && (
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '8px' }}>
            Step 1 of 4 · Snap Your Items
          </p>
          <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
            Add photos of what needs to go
          </h2>
          <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '8px', maxWidth: '60ch' }}>
            One wide shot of the whole pile or room plus a quick close-up of heavy furniture or appliances helps us give an accurate free estimate.
          </p>

          <div style={{ marginTop: '20px' }}>
            <PhotoDropzone
              photos={photos}
              onAddFiles={handleAddFiles}
              onRemovePhoto={handleRemovePhoto}
            />
          </div>

          <div
            style={{
              marginTop: '18px',
              padding: '14px 16px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-graphite)',
              border: '1px solid var(--border-dark)',
              color: 'var(--silver-300)',
              fontSize: '0.88rem',
            }}
          >
            Do not have photos handy right now? No problem—you can still continue to Step 2 and describe what you need hauled, or text photos directly anytime to{' '}
            <strong style={{ color: 'var(--lime)' }}>{business.phoneDisplay}</strong>.
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="lg" onClick={goNext}>
              <span>Next: Location</span>
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION */}
      {step === 2 && (
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '8px' }}>
            Step 2 of 4 · Pickup Neighborhood
          </p>
          <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
            Where in North County are you?
          </h2>
          <p className="t-body" style={{ color: 'var(--silver-200)', marginTop: '8px', maxWidth: '58ch' }}>
            Just your city and general area or ZIP is enough for an estimate—no exact street address needed yet.
          </p>

          <div style={{ display: 'grid', gap: '18px', marginTop: '22px', maxWidth: '560px' }}>
            <Select
              label="City / Town"
              options={cityOptions}
              value={city}
              onChange={(val) => {
                setCity(val);
                setErrors((e) => ({ ...e, city: '' }));
              }}
              placeholder="Choose your North County city..."
              error={errors.city}
            />

            <Input
              label="Neighborhood, Cross Street or ZIP (Optional)"
              placeholder="e.g. La Costa / 92009 / near Palomar Airport Rd"
              value={areaDetail}
              onChange={(e) => setAreaDetail(e.target.value)}
            />
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Button variant="outline-dark" onClick={() => setStep(1)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <Button variant="primary" size="lg" onClick={goNext}>
              <span>Next: Items &amp; Load Size</span>
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: ITEMS, LOAD VISUALIZER, ACCESS, TIMING */}
      {step === 3 && (
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '8px' }}>
            Step 3 of 4 · What We Are Hauling
          </p>
          <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
            Select items, access &amp; rough size
          </h2>

          <div style={{ display: 'grid', gap: '26px', marginTop: '22px' }}>
            <div>
              <span className="fd-field-label" style={{ marginBottom: '10px' }}>
                What types of items? (Select any that apply)
              </span>
              <div className="fd-chip-group">
                {itemCategoryChips.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    active={categories.includes(cat)}
                    onClick={() => {
                      toggleCategory(cat);
                      setErrors((e) => ({ ...e, description: '' }));
                    }}
                  />
                ))}
              </div>
            </div>

            <LoadVisualizer
              embedded
              selectedId={loadSizeId}
              onSelect={(id) => setLoadSizeId(id)}
            />

            <div>
              <span className="fd-field-label" style={{ marginBottom: '10px' }}>
                Access / Stairs
              </span>
              <div className="fd-chip-group">
                {accessOptions.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={access === opt}
                    onClick={() => setAccess(opt)}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="fd-field-label" style={{ marginBottom: '10px' }}>
                Preferred Timing
              </span>
              <div className="fd-chip-group">
                {timingOptions.map((opt) => (
                  <Chip
                    key={opt}
                    label={opt}
                    active={timing === opt}
                    onClick={() => setTiming(opt)}
                  />
                ))}
              </div>
              {timing === 'Specific Date' && (
                <DatePicker value={preferredDate} onChange={setPreferredDate} />
              )}
            </div>

            <Textarea
              label="Brief Description"
              placeholder="e.g. Old 3-seat sofa in garage, 1 king mattress upstairs, and ~10 cardboard boxes."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((err) => ({ ...err, description: '' }));
              }}
              error={errors.description}
            />
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Button variant="outline-dark" onClick={() => setStep(2)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <Button variant="primary" size="lg" onClick={goNext}>
              <span>Next: Contact &amp; Send</span>
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: CONTACT & HANDOFF */}
      {step === 4 && (
        <div>
          <p className="t-label" style={{ color: 'var(--lime)', marginBottom: '8px' }}>
            Step 4 of 4 · How Should We Reply?
          </p>
          <h2 className="t-display-lg" style={{ color: 'var(--white)' }}>
            Enter your contact info
          </h2>
          <p className="t-body-sm" style={{ color: 'var(--silver-200)', marginTop: '8px', maxWidth: '58ch' }}>
            Once you click Prepare Estimate Message, you will get instant 1-tap links to text or email your photos along with these details.
          </p>

          <div style={{ display: 'grid', gap: '18px', marginTop: '22px', maxWidth: '560px' }}>
            <Input
              label="Your Name"
              required
              placeholder="e.g. Alex Ramirez"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((err) => ({ ...err, name: '' }));
              }}
              error={errors.name}
            />

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

            <div>
              <span className="fd-field-label" style={{ marginBottom: '10px' }}>
                Preferred Reply Method
              </span>
              <div className="fd-chip-group">
                {(['Text / SMS', 'Phone Call', 'Email'] as const).map((method) => (
                  <Chip
                    key={method}
                    label={method}
                    active={contactMethod === method}
                    onClick={() => setContactMethod(method)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <Button variant="outline-dark" onClick={() => setStep(3)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              <span>{submitting ? 'Preparing...' : 'Prepare Estimate & Send Photos'}</span>
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
