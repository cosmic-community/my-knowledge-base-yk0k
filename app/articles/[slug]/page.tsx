// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getArticles } from '@/lib/cosmic';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found | My Knowledge Base' };
  }

  return {
    title: `${article.title} | My Knowledge Base`,
    description: article.metadata?.summary || `Read ${article.title}`,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryTitle = article.metadata?.category?.title;
  const categorySlug = article.metadata?.category?.slug;
  const featuredImage = article.metadata?.featured_image;
  const content = article.metadata?.content || article.content || '';
  const createdDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get related articles from same category
  let relatedArticles: Awaited<ReturnType<typeof getArticles>> = [];
  if (article.metadata?.category?.id) {
    const allArticles = await getArticles();
    relatedArticles = allArticles
      .filter(
        (a) => a.metadata?.category?.id === article.metadata?.category?.id && a.id !== article.id
      )
      .slice(0, 3);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-400 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-brand-600 transition-colors">
          Articles
        </Link>
        {categoryTitle && categorySlug && (
          <>
            <span>/</span>
            <Link
              href={`/categories/${categorySlug}`}
              className="hover:text-brand-600 transition-colors"
            >
              {categoryTitle}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-surface-600 truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {categoryTitle && (
              <span className="inline-block bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full">
                {categoryTitle}
              </span>
            )}
            <span className="text-sm text-surface-400">{createdDate}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 leading-tight">
            {article.title}
          </h1>
          {article.metadata?.summary && (
            <p className="text-lg text-surface-500 mt-4 leading-relaxed">
              {article.metadata.summary}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="rounded-xl overflow-hidden mb-10 bg-surface-100">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose-kb"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-10 border-t border-surface-200">
          <h2 className="text-xl font-bold text-surface-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.slug}`}
                className="group bg-white border border-surface-200 rounded-xl p-5 hover:shadow-md hover:border-brand-200 transition-all duration-200"
              >
                <h3 className="font-medium text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm">
                  {related.title}
                </h3>
                {related.metadata?.summary && (
                  <p className="text-xs text-surface-500 mt-2 line-clamp-2">
                    {related.metadata.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to articles */}
      <div className="mt-12 pt-8 border-t border-surface-200">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all articles
        </Link>
      </div>
    </div>
  );
}