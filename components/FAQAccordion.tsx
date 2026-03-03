'use client';

import { useState } from 'react';
import type { FAQ } from '@/types';

interface FAQAccordionProps {
  faq: FAQ;
}

export default function FAQAccordion({ faq }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const question = faq.metadata?.question || faq.title;
  const answer = faq.metadata?.answer || '';

  return (
    <div className="border border-surface-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-surface-900 text-base leading-relaxed pr-2">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-surface-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-surface-100">
          <div
            className="prose-kb text-sm text-surface-600 pt-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      )}
    </div>
  );
}