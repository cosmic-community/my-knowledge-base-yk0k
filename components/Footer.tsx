import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-surface-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl">📚</span>
              <span className="font-bold text-surface-900">Knowledge Base</span>
            </Link>
            <p className="text-sm text-surface-500 leading-relaxed">
              Your team&apos;s internal knowledge base. Everything you need to know, all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-surface-900 mb-3 text-sm uppercase tracking-wider">
              Browse
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/articles', label: 'Articles' },
                { href: '/categories', label: 'Categories' },
                { href: '/faqs', label: 'FAQs' },
                { href: '/glossary', label: 'Glossary' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-500 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-surface-900 mb-3 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-sm text-surface-500 hover:text-brand-600 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-200 mt-8 pt-6 text-center">
          <p className="text-xs text-surface-400">
            © {currentYear} My Knowledge Base. Internal use only.
          </p>
        </div>
      </div>
    </footer>
  );
}