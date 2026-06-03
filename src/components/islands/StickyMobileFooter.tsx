import { useState, useEffect } from 'react';

export default function StickyMobileFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show on mobile only
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2 px-3 py-2">
        <a
          href="tel:+17736103344"
          className="flex-1 flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-3 px-4 rounded-lg text-sm hover:opacity-90 transition active:scale-95"
          aria-label="Call Sandoval Plumbing at (773) 610-3344"
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Now
        </a>
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-brand-blue text-white font-bold py-3 px-4 rounded-lg text-sm hover:opacity-90 transition active:scale-95"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Free Estimate
        </a>
      </div>
    </div>
  );
}
