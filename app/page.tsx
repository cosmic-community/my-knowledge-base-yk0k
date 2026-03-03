import Link from 'next/link';
import { getCategories, getArticles, getFAQs, getGlossaryTerms } from '@/lib/cosmic';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ArticleCard from '@/components/ArticleCard';

export default async function HomePage() {
  const [categories, articles, faqs, glossaryTerms] = await Promise.all([
    getCategories(),
    getArticles(),
    getFAQs(),
    getGlossaryTerms(),
  ]);

  const recentArticles = articles.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-8">
            <span>📚</span>
            <span>Internal Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            My Knowledge Base
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your team&apos;s single source of truth. Find articles, answers, and definitions — all in one place.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Categories', count: categories.length, icon: '📂', href: '/categories' },
            { label: 'Articles', count: articles.length, icon: '📖', href: '/articles' },
            { label: 'FAQs', count: faqs.length, icon: '❓', href: '/faqs' },
            { label: 'Glossary Terms', count: glossaryTerms.length, icon: '📝', href: '/glossary' },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm border border-surface-200 p-5 text-center hover:shadow-md hover:border-brand-200 transition-all duration-200 group"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                {stat.count}
              </p>
              <p className="text-sm text-surface-500 font-medium">{stat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-surface-900">Browse by Category</h2>
              <p className="text-surface-500 mt-1">Explore topics organized for easy discovery</p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="bg-white border-y border-surface-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-surface-900">Recent Articles</h2>
                <p className="text-surface-500 mt-1">Stay up to date with the latest knowledge</p>
              </div>
              <Link
                href="/articles"
                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/faqs"
            className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-4xl mb-4 block">❓</span>
            <h3 className="text-xl font-bold text-surface-900 mb-2 group-hover:text-amber-700 transition-colors">
              Frequently Asked Questions
            </h3>
            <p className="text-surface-600 leading-relaxed">
              Find quick answers to common questions about our processes, tools, and policies.
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-amber-600 group-hover:text-amber-700">
              Browse FAQs →
            </span>
          </Link>
          <Link
            href="/glossary"
            className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-4xl mb-4 block">📝</span>
            <h3 className="text-xl font-bold text-surface-900 mb-2 group-hover:text-emerald-700 transition-colors">
              Glossary of Terms
            </h3>
            <p className="text-surface-600 leading-relaxed">
              Look up definitions for key business terms, acronyms, and jargon used across the team.
            </p>
            <span className="inline-block mt-4 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
              Browse Glossary →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}