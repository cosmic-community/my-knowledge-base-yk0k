# My Knowledge Base

![App Preview](https://imgix.cosmicjs.com/5fd24d50-1726-11f1-8f19-f3dd3ee2f907-autopilot-photo-1552664730-d307ca884978-1772558900881.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, internal knowledge base for teams — powered by [Cosmic](https://www.cosmicjs.com). Browse articles by category, search FAQs, explore a glossary, and keep your entire team aligned with a single source of truth.

## Features

- 📚 **Category Organization** — Browse content by category with custom icons
- 📖 **Rich Articles** — Full articles with summaries, featured images, and category tags
- ❓ **FAQ Accordion** — Expandable Q&A grouped by category
- 📝 **Glossary** — Alphabetical terms with definitions and related article links
- 🔍 **Global Search** — Search across all content types from anywhere
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- ⚡ **Server-Side Rendered** — Fast page loads with Next.js 16 App Router
- 🎨 **Modern UI** — Clean, Notion-inspired design with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a719cafa2ad19da1888d9d&clone_repository=69a71b3ffa2ad19da1888de4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a knowledge base with articles organized by category, FAQs, and a glossary. User instructions: A knowledge base for all internal team members to access to learn about our business. Like notion for internal teams only."

### Code Generation Prompt

> "Build a Next.js application for a content management system called 'My Knowledge Base'. The content is managed in Cosmic CMS with the following object types: categories, articles, faqs, glossary. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A knowledge base for all internal team members to access to learn about our business. Like notion for internal teams only."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic SDK](https://www.cosmicjs.com/docs) — Content management
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) — Beautiful prose styling

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-knowledge-base

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Articles

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: articles } = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Article by Slug

```typescript
const { object: article } = await cosmic.objects
  .findOne({ type: 'articles', slug: 'my-article' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Slug | Metafields |
|---|---|---|
| 📚 Categories | `categories` | name, description, icon |
| 📖 Articles | `articles` | content, category, summary, featured_image |
| ❓ FAQs | `faqs` | question, answer, category |
| 📝 Glossary | `glossary` | term, definition, related_articles |

All content is fetched server-side using Cosmic's JavaScript SDK. Connected objects (like categories on articles) are resolved using the `depth` parameter.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->