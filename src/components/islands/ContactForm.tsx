import { useState, useRef, type FormEvent } from 'react';
import { Zap } from 'lucide-react';

type ServiceType =
  | 'emergency'
  | 'drain-cleaning'
  | 'water-heater'
  | 'leak-detection'
  | 'sewer-line'
  | 'other';

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: ServiceType | '';
  description: string;
  preferredContact: 'call' | 'text' | 'email';
  zip: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const serviceLabels: Record<ServiceType, string> = {
  emergency: 'Emergency Plumbing',
  'drain-cleaning': 'Drain Cleaning',
  'water-heater': 'Water Heater Repair / Installation',
  'leak-detection': 'Leak Detection & Repair',
  'sewer-line': 'Sewer Line Services',
  other: 'Other Service',
};

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  service: '',
  description: '',
  preferredContact: 'call',
  zip: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-().+]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.service) {
      newErrors.service = 'Please select a service';
    }
    if (!form.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) {
      newErrors.zip = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setServerError('');
    setStatus('submitting');

    try {
      const payload = {
        ...form,
        honeypot: honeypotRef.current?.value || '',
      };

      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to submit form');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-green-800 font-heading">Request Received!</h3>
        <p className="text-green-700 mt-2 leading-relaxed">
          We'll call you back within 60 minutes. For immediate emergencies, call{' '}
          <a
            href="tel:+17736103344"
            className="font-bold underline text-green-900 hover:text-green-700"
          >
            (773) 610-3344
          </a>{' '}
          or{' '}
          <a
            href="tel:+13127238993"
            className="font-bold underline text-green-900 hover:text-green-700"
          >
            (312) 723-8993
          </a>{' '}
          — available 24/7.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setForm(initialForm);
          }}
          className="mt-6 text-sm text-green-600 hover:text-green-800 underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-blue'
    } focus:outline-none focus:ring-2 transition text-gray-800 bg-white`;

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, traps spam bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" type="text" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Full Name <span className="text-brand-red">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={inputClass('name')}
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone Number <span className="text-brand-red">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className={inputClass('phone')}
          placeholder="(773) 610-3344"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email Address <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={inputClass('email')}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="contact-service" className={labelClass}>
          Service Needed <span className="text-brand-red">*</span>
        </label>
        <select
          id="contact-service"
          value={form.service}
          onChange={(e) => updateField('service', e.target.value as ServiceType)}
          className={inputClass('service')}
        >
          <option value="">— Select a service —</option>
          {(Object.entries(serviceLabels) as [ServiceType, string][]).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="contact-desc" className={labelClass}>
          Describe the Issue
        </label>
        <textarea
          id="contact-desc"
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          className={inputClass('description')}
          rows={4}
          placeholder="Briefly describe the plumbing issue you're experiencing…"
        />
      </div>

      {/* ZIP Code */}
      <div>
        <label htmlFor="contact-zip" className={labelClass}>
          ZIP Code <span className="text-brand-red">*</span>
        </label>
        <input
          id="contact-zip"
          type="text"
          value={form.zip}
          onChange={(e) => updateField('zip', e.target.value)}
          className={inputClass('zip')}
          placeholder="60618"
          maxLength={10}
        />
        {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
      </div>

      {/* Preferred Contact Method */}
      <fieldset>
        <legend className="block text-sm font-semibold text-gray-700 mb-2">
          Preferred Contact Method
        </legend>
        <div className="flex flex-wrap gap-4">
          {(['call', 'text', 'email'] as const).map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={form.preferredContact === method}
                onChange={() => updateField('preferredContact', method)}
                className="w-4 h-4 text-brand-blue focus:ring-brand-blue"
              />
              <span className="text-sm text-gray-700 capitalize">{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-brand-blue text-white py-3.5 px-6 rounded-lg font-bold text-lg hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </span>
        ) : (
          'Request Free Estimate'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        <Zap size={12} className="inline -mt-0.5 text-yellow-500" aria-hidden="true" /> We typically
        respond within 60 minutes. For emergencies, call{' '}
        <a href="tel:+17736103344" className="text-brand-blue underline">
          {' '}
          (773) 610-3344
        </a>{' '}
        or{' '}
        <a href="tel:+13127238993" className="text-brand-blue underline">
          (312) 723-8993
        </a>
        .
      </p>
    </form>
  );
}
