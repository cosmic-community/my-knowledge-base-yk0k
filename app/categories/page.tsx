import type { Metadata } from 'next';
import { getCategories, getArticles } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories | My Knowledge Base',
  description: 'Browse knowledge base categories.',
};

export default async function CategoriesPage() {
  const [categories, articles] = await Promise.all([getCategories(), getArticles()]);

  // Count articles per category
  const articleCounts: Record<string, number> = {};
  for (const article of articles) {
    const catId = article.metadata?.category?.id;
    if (catId) {
      articleCounts[catId] = (articleCounts[catId] || 0) + 1;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📂</span>
          <h1 className="text-3xl font-bold text-surface-900">Categories</h1>
        </div>
        <p className="text-surface-500 text-lg">
          Browse knowledge organized by topic.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">📂</span>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">No categories yet</h2>
          <p className="text-surface-500">Categories will appear here once content is added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              articleCount={articleCounts[category.id] || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}