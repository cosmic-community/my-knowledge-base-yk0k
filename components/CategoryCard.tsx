import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  articleCount?: number;
}

export default function CategoryCard({ category, articleCount }: CategoryCardProps) {
  const icon = category.metadata?.icon || '📂';
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description || '';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white border border-surface-200 rounded-xl p-6 hover:shadow-md hover:border-brand-200 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="min-w-0">
          <h3 className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors text-base truncate">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-surface-500 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
          {articleCount !== undefined && (
            <p className="text-xs text-surface-400 mt-2 font-medium">
              {articleCount} {articleCount === 1 ? 'article' : 'articles'}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}