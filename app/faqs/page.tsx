import type { Metadata } from 'next';
import { getFAQs, groupFAQsByCategory } from '@/lib/cosmic';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQs | My Knowledge Base',
  description: 'Frequently asked questions about our business.',
};

export default async function FAQsPage() {
  const faqs = await getFAQs();
  const groupedFAQs = groupFAQsByCategory(faqs);
  const categoryNames = Object.keys(groupedFAQs).sort();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="text-4xl mb-3 block">❓</span>
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-surface-500 text-lg max-w-xl mx-auto">
          Find quick answers to common questions about our processes, tools, and policies.
        </p>
      </div>

      {/* FAQ Groups */}
      {faqs.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🤷</span>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">No FAQs yet</h2>
          <p className="text-surface-500">FAQs will appear here once they are added.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {categoryNames.map((categoryName) => {
            const categoryFaqs = groupedFAQs[categoryName];

            if (!categoryFaqs || categoryFaqs.length === 0) {
              return null;
            }

            return (
              <section key={categoryName}>
                <h2 className="text-lg font-semibold text-surface-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-brand-500 rounded-full" />
                  {categoryName}
                </h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq) => (
                    <FAQAccordion key={faq.id} faq={faq} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}