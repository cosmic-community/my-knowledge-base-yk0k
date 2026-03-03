import { createBucketClient } from '@cosmicjs/sdk';
import type {
  Article,
  Category,
  FAQ,
  GlossaryTerm,
  SearchResult,
  GroupedFAQs,
  GlossaryLetterGroup,
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

// Helper: safely check error status
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Helper: safely extract string value from metafield (handles select-dropdown objects)
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// ─── Categories ────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// ─── Articles ──────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles');
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'articles', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as Article;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch article');
  }
}

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    const articles = response.objects as Article[];
    return articles.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch articles by category');
  }
}

// ─── FAQs ──────────────────────────────────────────────────

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as FAQ[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch FAQs');
  }
}

export function groupFAQsByCategory(faqs: FAQ[]): GroupedFAQs {
  const grouped: GroupedFAQs = {};
  for (const faq of faqs) {
    const categoryTitle = faq.metadata?.category?.title || 'General';
    if (!grouped[categoryTitle]) {
      grouped[categoryTitle] = [];
    }
    grouped[categoryTitle].push(faq);
  }
  return grouped;
}

// ─── Glossary ──────────────────────────────────────────────

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'glossary' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    const terms = response.objects as GlossaryTerm[];
    return terms.sort((a, b) => {
      const termA = (a.metadata?.term || a.title).toLowerCase();
      const termB = (b.metadata?.term || b.title).toLowerCase();
      return termA.localeCompare(termB);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch glossary terms');
  }
}

export function groupGlossaryByLetter(terms: GlossaryTerm[]): GlossaryLetterGroup[] {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const displayTerm = term.metadata?.term || term.title;
    const letter = displayTerm.charAt(0).toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(term);
  }
  return Object.keys(grouped)
    .sort()
    .map((letter) => {
      const letterTerms = grouped[letter];
      return {
        letter,
        terms: letterTerms || [],
      };
    });
}

// ─── Search ────────────────────────────────────────────────

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search articles
  const articles = await getArticles();
  for (const article of articles) {
    const titleMatch = article.title.toLowerCase().includes(lowerQuery);
    const summaryMatch = (article.metadata?.summary || '').toLowerCase().includes(lowerQuery);
    const contentMatch = (article.metadata?.content || '').toLowerCase().includes(lowerQuery);

    if (titleMatch || summaryMatch || contentMatch) {
      results.push({
        id: article.id,
        slug: article.slug,
        title: article.title,
        type: 'articles',
        snippet: article.metadata?.summary || article.title,
        categoryTitle: article.metadata?.category?.title,
      });
    }
  }

  // Search FAQs
  const faqs = await getFAQs();
  for (const faq of faqs) {
    const questionMatch = (faq.metadata?.question || '').toLowerCase().includes(lowerQuery);
    const answerMatch = (faq.metadata?.answer || '').toLowerCase().includes(lowerQuery);

    if (questionMatch || answerMatch) {
      results.push({
        id: faq.id,
        slug: faq.slug,
        title: faq.metadata?.question || faq.title,
        type: 'faqs',
        snippet: (faq.metadata?.answer || '').substring(0, 150) + '...',
        categoryTitle: faq.metadata?.category?.title,
      });
    }
  }

  // Search glossary
  const glossaryTerms = await getGlossaryTerms();
  for (const term of glossaryTerms) {
    const termMatch = (term.metadata?.term || '').toLowerCase().includes(lowerQuery);
    const defMatch = (term.metadata?.definition || '').toLowerCase().includes(lowerQuery);

    if (termMatch || defMatch) {
      results.push({
        id: term.id,
        slug: term.slug,
        title: term.metadata?.term || term.title,
        type: 'glossary',
        snippet: (term.metadata?.definition || '').substring(0, 150) + '...',
      });
    }
  }

  return results;
}