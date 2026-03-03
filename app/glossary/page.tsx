import type { Metadata } from 'next';
import Link from 'next/link';
import { getGlossaryTerms, groupGlossaryByLetter } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Glossary | My Knowledge Base',
  description: 'Glossary of key business terms and definitions.',
};

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();
  const letterGroups = groupGlossaryByLetter(terms);
  const availableLetters = letterGroups.map((g) => g.letter);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="text-4xl mb-3 block">📝</span>
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Glossary</h1>
        <p className="text-surface-500 text-lg max-w-xl mx-auto">
          Definitions for key terms, acronyms, and jargon used across the team.
        </p>
      </div>

      {terms.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">📝</span>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">No terms yet</h2>
          <p className="text-surface-500">Glossary terms will appear here once they are added.</p>
        </div>
      ) : (
        <>
          {/* Letter Jump Links */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-10">
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
              const isAvailable = availableLetters.includes(letter);
              return isAvailable ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-surface-300 bg-surface-100"
                >
                  {letter}
                </span>
              );
            })}
          </div>

          {/* Terms by Letter */}
          <div className="space-y-10">
            {letterGroups.map((group) => (
              <section key={group.letter} id={`letter-${group.letter}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-brand-600">{group.letter}</span>
                  <div className="flex-1 h-px bg-surface-200" />
                </div>
                <div className="space-y-4">
                  {group.terms.map((term) => {
                    const displayTerm = term.metadata?.term || term.title;
                    const definition = term.metadata?.definition || '';
                    const relatedArticles = term.metadata?.related_articles || [];

                    return (
                      <div
                        key={term.id}
                        className="bg-white border border-surface-200 rounded-xl p-5"
                      >
                        <h3 className="font-semibold text-surface-900 text-base mb-2">
                          {displayTerm}
                        </h3>
                        {definition && (
                          <div
                            className="text-sm text-surface-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: definition }}
                          />
                        )}
                        {relatedArticles.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-surface-100">
                            <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-2">
                              Related Articles
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {relatedArticles.map((relatedArticle) => (
                                <Link
                                  key={relatedArticle.id}
                                  href={`/articles/${relatedArticle.slug}`}
                                  className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full font-medium transition-colors"
                                >
                                  📖 {relatedArticle.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}