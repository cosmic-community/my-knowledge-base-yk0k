import type { Metadata } from 'next';
import { getArticles, getCategories } from '@/lib/cosmic';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Articles | My Knowledge Base',
  description: 'Browse all knowledge base articles.',
};

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📖</span>
          <h1 className="text-3xl font-bold text-surface-900">Articles</h1>
        </div>
        <p className="text-surface-500 text-lg">
          Explore in-depth articles covering all aspects of our business.
        </p>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="inline-flex items-center gap-1.5 bg-white border border-surface-200 text-surface-600 px-3.5 py-2 rounded-full text-sm font-medium hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all"
            >
              <span className="text-base">{cat.metadata?.icon || '📂'}</span>
              {cat.metadata?.name || cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">📭</span>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">No articles yet</h2>
          <p className="text-surface-500">Check back soon for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}