import { useState, useEffect, useCallback } from 'react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when cursor moves toward the top of the page (exit intent)
      if (e.clientY <= 0 && !hasDismissed && !isVisible) {
        setIsVisible(true);
      }
    },
    [hasDismissed, isVisible],
  );

  useEffect(() => {
    // Detect desktop (only show on screens wider than 768px)
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    // Add delay before enabling detection (don't show immediately)
    const enableTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000); // Enable after 10 seconds

    return () => {
      clearTimeout(enableTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  function dismiss() {
    setIsVisible(false);
    setHasDismissed(true);
  }

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Before you leave — free estimate offer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10 text-center animate-[fadeInUp_0.3s_ease-out]">
        {/* Close button */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-5xl mb-4">🔧</div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-brand-blue font-heading mb-3">
          Before You Go…
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Get a <strong className="text-brand-red">free estimate</strong> in 60 seconds. Eddie will
          call you back personally — no robots, no dispatchers.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          onClick={dismiss}
          className="block w-full bg-brand-red text-white font-bold py-3.5 px-6 rounded-lg text-lg hover:opacity-90 transition shadow-lg mb-3"
        >
          Get Free Estimate →
        </a>

        {/* Phone */}
        <p className="text-sm text-gray-500">
          Or call now:{' '}
          <a
            href="tel:+17736103344"
            className="font-bold text-brand-blue hover:text-brand-red transition-colors"
          >
            (773) 610-3344
          </a>{' '}
          /{' '}
          <a
            href="tel:+13127238993"
            className="font-bold text-brand-blue hover:text-brand-red transition-colors"
          >
            (312) 723-8993
          </a>
        </p>

        {/* Dismiss text */}
        <button
          type="button"
          onClick={dismiss}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
        >
          No thanks, I'll browse more
        </button>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
