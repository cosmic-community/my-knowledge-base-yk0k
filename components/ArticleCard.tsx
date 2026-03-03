import Link from 'next/link';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const summary = article.metadata?.summary || '';
  const categoryTitle = article.metadata?.category?.title;
  const featuredImage = article.metadata?.featured_image;
  const createdDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group bg-white border border-surface-200 rounded-xl overflow-hidden hover:shadow-md hover:border-brand-200 transition-all duration-200 flex flex-col"
    >
      {featuredImage && (
        <div className="aspect-video overflow-hidden bg-surface-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={article.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          {categoryTitle && (
            <span className="inline-block bg-brand-50 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {categoryTitle}
            </span>
          )}
          <span className="text-xs text-surface-400">{createdDate}</span>
        </div>
        <h3 className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        {summary && (
          <p className="text-sm text-surface-500 line-clamp-3 leading-relaxed flex-1">
            {summary}
          </p>
        )}
        <span className="inline-block mt-4 text-sm font-medium text-brand-600 group-hover:text-brand-700">
          Read more →
        </span>
      </div>
    </Link>
  );
}