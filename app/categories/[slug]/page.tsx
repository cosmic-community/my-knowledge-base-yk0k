// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getArticlesByCategory } from '@/lib/cosmic';
import ArticleCard from '@/components/ArticleCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | My Knowledge Base' };
  }

  const name = category.metadata?.name || category.title;

  return {
    title: `${name} | My Knowledge Base`,
    description: category.metadata?.description || `Browse articles in ${name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(category.id);

  const icon = category.metadata?.icon || '📂';
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description || '';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-brand-600 transition-colors">
          Categories
        </Link>
        <span>/</span>
        <span className="text-surface-600">{name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-4xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-surface-900">{name}</h1>
            {description && (
              <p className="text-surface-500 mt-1 text-lg">{description}</p>
            )}
          </div>
        </div>
        <p className="text-sm text-surface-400 mt-4">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category
        </p>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-surface-200 rounded-xl">
          <span className="text-5xl mb-4 block">📭</span>
          <h2 className="text-xl font-semibold text-surface-900 mb-2">No articles yet</h2>
          <p className="text-surface-500 mb-6">
            No articles have been added to this category yet.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
          >
            Browse all articles →
          </Link>
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