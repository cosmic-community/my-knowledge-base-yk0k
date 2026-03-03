// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
  };
}

// Article object type
export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    content?: string;
    category?: Category;
    summary?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// FAQ object type
export interface FAQ extends CosmicObject {
  type: 'faqs';
  metadata: {
    question?: string;
    answer?: string;
    category?: Category;
  };
}

// Glossary object type
export interface GlossaryTerm extends CosmicObject {
  type: 'glossary';
  metadata: {
    term?: string;
    definition?: string;
    related_articles?: Article[];
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Search result type
export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  type: 'articles' | 'faqs' | 'glossary';
  snippet: string;
  categoryTitle?: string;
}

// Grouped FAQ type
export interface GroupedFAQs {
  [categoryTitle: string]: FAQ[];
}

// Glossary letter group
export interface GlossaryLetterGroup {
  letter: string;
  terms: GlossaryTerm[];
}