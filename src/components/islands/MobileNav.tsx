import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-brand-blue hover:text-brand-red transition-colors"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Navigation panel */}
          <nav
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 p-6 pt-20"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-gray-700 font-semibold rounded-lg hover:bg-brand-lightgray hover:text-brand-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="tel:+17736103344"
                className="block w-full text-center bg-brand-red text-white font-bold py-3 px-4 rounded-lg mb-2 hover:opacity-90 transition"
              >
                📞 Call (773) 610-3344
              </a>
              <a
                href="tel:+13127238993"
                className="block w-full text-center text-sm text-gray-500 hover:text-brand-red font-medium py-1.5 mb-3 transition-colors"
              >
                Alt: (312) 723-8993
              </a>
              <a
                href="/contact"
                className="block w-full text-center bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition"
              >
                📋 Free Estimate
              </a>
              <a
                href="/es"
                className="block w-full text-center mt-3 text-sm text-gray-500 hover:text-brand-blue transition-colors"
              >
                🌎 Español
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
