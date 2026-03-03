import Link from 'next/link';
import type { Metadata } from 'next';
import { searchContent } from '@/lib/cosmic';
import SearchBar from '@/components/SearchBar';
import type { SearchResult } from '@/types';

export const metadata: Metadata = {
  title: 'Search | My Knowledge Base',
  description: 'Search the knowledge base.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const typeConfig: Record<string, { icon: string; label: string; basePath: string }> = {
  articles: { icon: '📖', label: 'Article', basePath: '/articles' },
  faqs: { icon: '❓', label: 'FAQ', basePath: '/faqs' },
  glossary: { icon: '📝', label: 'Glossary', basePath: '/glossary' },
};

function getResultLink(result: SearchResult): string {
  if (result.type === 'articles') {
    return `/articles/${result.slug}`;
  }
  if (result.type === 'faqs') {
    return '/faqs';
  }
  return '/glossary';
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? await searchContent(query) : [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="text-4xl mb-3 block">🔍</span>
        <h1 className="text-3xl font-bold text-surface-900 mb-6">Search</h1>
        <SearchBar />
      </div>

      {/* Results */}
      {query && (
        <div className="mt-10">
          <p className="text-sm text-surface-400 mb-6">
            {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
          </p>

          {results.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🔎</span>
              <h2 className="text-xl font-semibold text-surface-900 mb-2">No results found</h2>
              <p className="text-surface-500 mb-6">
                Try a different search term or browse our content.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/articles"
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  Browse Articles
                </Link>
                <span className="text-surface-300">·</span>
                <Link
                  href="/faqs"
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  Browse FAQs
                </Link>
                <span className="text-surface-300">·</span>
                <Link
                  href="/glossary"
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  Browse Glossary
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => {
                const config = typeConfig[result.type];
                if (!config) return null;

                return (
                  <Link
                    key={result.id}
                    href={getResultLink(result)}
                    className="block group bg-white border border-surface-200 rounded-xl p-5 hover:shadow-md hover:border-brand-200 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{config.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
                            {config.label}
                          </span>
                          {result.categoryTitle && (
                            <>
                              <span className="text-surface-300">·</span>
                              <span className="text-xs text-surface-400">
                                {result.categoryTitle}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
                          {result.title}
                        </h3>
                        {result.snippet && (
                          <p className="text-sm text-surface-500 mt-1 line-clamp-2">
                            {result.snippet}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* No query state */}
      {!query && (
        <div className="text-center py-10">
          <p className="text-surface-500">
            Enter a search term to find articles, FAQs, and glossary terms.
          </p>
        </div>
      )}
    </div>
  );
}