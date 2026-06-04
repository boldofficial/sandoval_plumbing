import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-1">
            <button
              type="button"
              id={`faq-btn-${i}`}
              onClick={() => toggle(i)}
              className="w-full text-left py-4 pr-4 flex justify-between items-center gap-4 font-semibold text-brand-blue hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-inset rounded"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="text-base md:text-lg leading-snug">{faq.question}</span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full bg-brand-lightgray flex items-center justify-center text-brand-blue font-bold text-lg transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-5 pr-12 text-gray-600 leading-relaxed">{faq.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
