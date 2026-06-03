# AGENT PROMPT: Full Website Rebuild — Sandoval Plumbing, Chicago IL
## Built with Astro

---

## PROJECT OVERVIEW

You are building a complete, professional, conversion-optimized website for **Sandoval Plumbing**, a family-owned plumbing company in Chicago, IL. They currently have NO real website — only a broken Facebook page. This is a ground-up rebuild. The website must serve as their primary digital presence, rank locally on Google, and convert visitors into paying customers.

This site is built with **Astro**. Read and apply all Astro-specific guidance in this prompt before writing any code.

---

## BUSINESS DETAILS (Use Exactly)

- **Business Name:** Sandoval Plumbing
- **Owner / Lead Plumber:** Eduardo "Eddie" Sandoval
- **Address:** 3922 N Bernard St, Chicago, IL 60618
- **Neighborhood:** Irving Park, Chicago
- **Phone:** (773) 610-3344
- **Hours:** Open 24 Hours, 7 Days a Week
- **Years in Business:** 25+ years (family-owned since ~1999)
- **Service Type:** Residential & Commercial
- **Service Area:** Irving Park, Logan Square, Avondale, Roscoe Village, Wicker Park, Bucktown, Lakeview, Lincoln Square, North Center, Belmont-Cragin, Hermosa, Portage Park, and all of Chicagoland
- **Google Rating:** 4.9 stars / 306+ reviews
- **Yelp Rating:** 5.0 stars / 16+ reviews
- **Key Differentiators:**
  - 24/7 true availability including Sundays and holidays
  - Eddie personally does the work — not a franchise or dispatcher
  - Saves customers 3–6x vs. large companies
  - Explains every step of the job to the homeowner
  - Proactive communication (calls if running late)
  - Fair, transparent pricing — no hidden fees
  - Hispanic-owned, serves Spanish-speaking community

---

## ASTRO ARCHITECTURE OVERVIEW

### Why Astro for This Project

Astro is the right choice for a local business site like this because:
- **Zero JS by default** — only ship JavaScript for interactive components (forms, accordions, sliders). The rest is static HTML.
- **Excellent Core Web Vitals** — Google rewards fast-loading local business sites with better rankings. Astro's output is highly optimized.
- **Content Collections** — blog posts and reviews are managed as typed Markdown/MDX files, not hardcoded strings.
- **Islands Architecture** — interactive components (contact form, FAQ accordion, before/after slider) are isolated hydration islands; the rest of the page ships with zero runtime JS.
- **Native i18n routing** — `/es` Spanish pages are handled cleanly with Astro's routing.
- **SEO-first** — Astro's `<head>` management, canonical tags, and schema injection are straightforward and reliable.

---

## ASTRO PROJECT SETUP

### Initialize the Project

```bash
npm create astro@latest sandoval-plumbing -- --template minimal --typescript strict
cd sandoval-plumbing
```

### Required Integrations — Install All

```bash
npx astro add react        # For interactive island components
npx astro add tailwind     # Utility-first CSS
npx astro add sitemap      # Auto-generate sitemap.xml
npx astro add mdx          # Blog posts and rich content pages
```

Install additional packages:

```bash
npm install @astrojs/image  # Image optimization (WebP conversion, lazy loading)
npm install sharp           # Required by @astrojs/image for build-time processing
```

### `astro.config.mjs` — Full Configuration

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://sandovalplumbingchicago.com',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    mdx(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,  // English at /, Spanish at /es/
    },
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  output: 'static',  // Full static build — deploy to Netlify, Vercel, or Cloudflare Pages
});
```

---

## FILE & DIRECTORY STRUCTURE

Every file and folder below must exist. Follow this structure exactly.

```
sandoval-plumbing/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── hero-plumber.jpg          # Placeholder — replace with real photo
│       ├── eddie-sandoval.jpg        # Placeholder — replace with real photo
│       ├── logo.svg
│       └── og-image.jpg             # Open Graph image (1200×630)
├── src/
│   ├── assets/                      # Build-time processed images (use <Image> from astro:assets)
│   │   └── hero-placeholder.jpg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── AnnouncementBar.astro
│   │   ├── ui/
│   │   │   ├── ServiceCard.astro
│   │   │   ├── ReviewCard.astro
│   │   │   ├── TrustBadges.astro
│   │   │   ├── EmergencyCTA.astro
│   │   │   ├── BlogCard.astro
│   │   │   └── ServiceAreaMap.astro
│   │   └── islands/                 # Interactive components — React, hydrated client-side
│   │       ├── ContactForm.tsx      # client:load
│   │       ├── FAQAccordion.tsx     # client:visible
│   │       ├── BeforeAfterSlider.tsx # client:visible
│   │       ├── MobileNav.tsx        # client:load
│   │       ├── ExitIntentPopup.tsx  # client:idle
│   │       └── StickyMobileFooter.tsx # client:load
│   ├── content/
│   │   ├── config.ts                # Content Collections schema
│   │   ├── blog/
│   │   │   ├── frozen-pipes-chicago.mdx
│   │   │   ├── water-heater-replacement.mdx
│   │   │   └── plumbing-emergency-guide.mdx
│   │   ├── reviews/
│   │   │   ├── jennifer-b.md
│   │   │   ├── kim-z.md
│   │   │   └── [12+ review files].md
│   │   └── services/
│   │       ├── emergency-plumbing.md
│   │       ├── drain-cleaning.md
│   │       └── [all 12 services].md
│   ├── layouts/
│   │   ├── BaseLayout.astro         # <html>, <head>, meta tags, schema, GA
│   │   ├── PageLayout.astro         # BaseLayout + Header + Footer
│   │   └── ServiceLayout.astro     # PageLayout + service-specific sidebar/CTA
│   ├── pages/
│   │   ├── index.astro              # Home (/)
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── reviews.astro
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog listing (/blog)
│   │   │   └── [slug].astro         # Dynamic blog post page
│   │   ├── services/
│   │   │   ├── index.astro          # Services overview
│   │   │   ├── emergency-plumbing.astro
│   │   │   ├── drain-cleaning.astro
│   │   │   ├── water-heater.astro
│   │   │   ├── leak-detection.astro
│   │   │   ├── sewer-line.astro
│   │   │   ├── bathroom-plumbing.astro
│   │   │   ├── kitchen-plumbing.astro
│   │   │   ├── pipe-repair.astro
│   │   │   ├── gas-line.astro
│   │   │   └── preventive-maintenance.astro
│   │   ├── service-areas/
│   │   │   ├── index.astro
│   │   │   ├── irving-park.astro
│   │   │   ├── logan-square.astro
│   │   │   ├── avondale.astro
│   │   │   ├── roscoe-village.astro
│   │   │   └── lakeview.astro
│   │   └── es/                      # Spanish locale — Astro i18n routing
│   │       └── index.astro          # Spanish homepage (/es)
│   ├── styles/
│   │   └── global.css               # Tailwind base + custom overrides
│   └── utils/
│       ├── seo.ts                   # Helper: buildMeta(title, description, canonical)
│       └── schema.ts                # JSON-LD schema builders
```

---

## ASTRO COMPONENT PATTERNS

### `.astro` Files vs. React Islands — When to Use Each

| Need | Use |
|---|---|
| Static markup, no interactivity | `.astro` component |
| Renders once at build time | `.astro` component |
| Needs `useState`, `useEffect`, event handlers | React `.tsx` island |
| SEO-critical content (H1, meta, schema) | Always `.astro` — never hide in a React component |
| Forms with validation, error states | React `.tsx` island |
| Accordion, tabs, sliders | React `.tsx` island |
| Header nav (desktop static + mobile hamburger) | Header in `.astro`, MobileNav as React island |

**Rule:** If a component can be static, make it `.astro`. Only reach for React when you need browser interactivity. This keeps the JS bundle small and Core Web Vitals high — which directly helps Google rankings for a local business.

### Astro Component Anatomy

Every `.astro` file has two sections separated by `---`:

```astro
---
// Component Script (runs at build time on the server)
// Import other components, fetch data, define props here
import ServiceCard from '../components/ui/ServiceCard.astro';
import { getCollection } from 'astro:content';

interface Props {
  title: string;
  featured?: boolean;
}
const { title, featured = false } = Astro.props;

const services = await getCollection('services');
---

<!-- Component Template (HTML output) -->
<section class="py-16 bg-gray-50">
  <h2 class="text-3xl font-bold text-center mb-8">{title}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {services.map(service => (
      <ServiceCard service={service} />
    ))}
  </div>
</section>
```

**Key rules for `.astro` files:**
- The frontmatter (between `---`) runs **at build time**, not in the browser. No `window`, no `document` here.
- Use `{expression}` for dynamic values, `{array.map(...)}` for lists.
- Use `<slot />` for composable layout components.
- Import CSS with `<style>` tags (scoped by default) or Tailwind classes.
- Never use React hooks (`useState`, `useEffect`) in `.astro` files.

### Hydration Directives — Use the Right One

React island components are mounted with a `client:*` directive. Choose carefully:

```astro
<!-- Hydrates immediately on page load — use for above-the-fold interactive UI -->
<MobileNav client:load />
<StickyMobileFooter client:load />

<!-- Hydrates when component enters viewport — use for below-the-fold components -->
<FAQAccordion client:visible />
<BeforeAfterSlider client:visible />
<ContactForm client:visible />

<!-- Hydrates during browser idle time — use for non-critical popups -->
<ExitIntentPopup client:idle />

<!-- Only hydrates in matching media query — use for mobile-only components -->
<StickyMobileFooter client:media="(max-width: 768px)" />

<!-- No hydration — renders to static HTML only, no JS shipped -->
<StaticBanner client:only="react" />   <!-- use sparingly -->
```

**For this project:** The heavy interactive components (contact form, FAQ accordion, before/after slider) should all be `client:visible`. The mobile nav and sticky footer should be `client:load`. The exit-intent popup should be `client:idle`.

---

## LAYOUTS

### `BaseLayout.astro` — All SEO, `<head>`, Schema

This is the root layout that every page uses. It handles all `<head>` content:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  lang?: 'en' | 'es';
  schema?: object;  // Pass page-specific JSON-LD here
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/images/og-image.jpg',
  lang = 'en',
  schema,
} = Astro.props;

const siteUrl = 'https://sandovalplumbingchicago.com';

// LocalBusiness schema — included on every page
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Sandoval Plumbing",
  "telephone": "+17736103344",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3922 N Bernard St",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60618",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.9527077,
    "longitude": -87.7143835
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "306"
  },
  "priceRange": "$$",
  "areaServed": "Chicago, IL",
  "url": siteUrl
};
---

<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}${ogImage}`} />
    <meta property="og:url" content={canonical} />
    <meta property="og:type" content="website" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- JSON-LD Schema: LocalBusiness (every page) -->
    <script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)} />

    <!-- JSON-LD Schema: Page-specific (optional) -->
    {schema && <script type="application/ld+json" set:html={JSON.stringify(schema)} />}

    <!-- Google Analytics 4 — replace G-XXXXXXXXXX -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### `PageLayout.astro` — Standard Pages

```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import AnnouncementBar from '../components/layout/AnnouncementBar.astro';
import StickyMobileFooter from '../components/islands/StickyMobileFooter';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
  lang?: 'en' | 'es';
}

const props = Astro.props;
---

<BaseLayout {...props}>
  <AnnouncementBar />
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
  <StickyMobileFooter client:load />
</BaseLayout>
```

### `ServiceLayout.astro` — Service Pages

Wraps `PageLayout` and adds the emergency sidebar CTA that appears on all service pages:

```astro
---
import PageLayout from './PageLayout.astro';
import EmergencyCTA from '../components/ui/EmergencyCTA.astro';

interface Props {
  title: string;
  description: string;
  serviceName: string;
}

const { serviceName, ...layoutProps } = Astro.props;
---

<PageLayout {...layoutProps}>
  <div class="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <slot />
    </div>
    <aside class="space-y-6">
      <EmergencyCTA />
      <!-- Sidebar: related services, trust badges -->
    </aside>
  </div>
</PageLayout>
```

---

## CONTENT COLLECTIONS

Content Collections give you typed, validated content for blog posts, reviews, and services. Define schemas in `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Sandoval Plumbing'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    reviewer: z.string(),
    rating: z.number().min(1).max(5),
    platform: z.enum(['google', 'yelp', 'other']),
    date: z.date(),
    verified: z.boolean().default(true),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),  // SVG icon name or emoji
    order: z.number(), // For display ordering
    emergency: z.boolean().default(false),
  }),
});

export const collections = { blog, reviews, services };
```

### Querying Collections in Pages

```astro
---
import { getCollection, getEntry } from 'astro:content';

// Get all blog posts, sorted newest first
const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

// Get all reviews for the reviews page
const reviews = await getCollection('reviews');

// Get a single entry
const emergencyService = await getEntry('services', 'emergency-plumbing');
---
```

### Blog Post Frontmatter Example (`frozen-pipes-chicago.mdx`)

```mdx
---
title: "How to Prevent Frozen Pipes in Chicago This Winter"
description: "Chicago winters are brutal on plumbing. Learn how to protect your pipes from freezing — and what to do if they burst."
pubDate: 2024-11-15
author: "Eduardo Sandoval"
tags: ["winter", "emergency", "prevention", "chicago"]
image: "/images/blog/frozen-pipes.jpg"
imageAlt: "Frozen pipe with ice buildup in a Chicago home basement"
---

## Why Chicago Winters Are Hard on Your Pipes

Chicago's polar vortex events...
```

### Dynamic Blog Post Page (`src/pages/blog/[slug].astro`)

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PageLayout title={post.data.title} description={post.data.description}>
  <article class="max-w-3xl mx-auto px-4 py-12">
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</PageLayout>
```

---

## COMPONENT ISLANDS — REACT IMPLEMENTATION GUIDE

These are the only components that ship JavaScript to the browser. Keep them lean.

### `ContactForm.tsx` (`client:visible`)

```tsx
import { useState } from 'react';

type ServiceType =
  | 'emergency' | 'drain-cleaning' | 'water-heater'
  | 'leak-detection' | 'sewer-line' | 'other';

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: ServiceType | '';
  description: string;
  preferredContact: 'call' | 'text' | 'email';
  zip: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', service: '',
    description: '', preferredContact: 'call', zip: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Form uses a backend form handler (Netlify Forms, Formspree, etc.)
  // Add action="/api/contact" or Netlify's data-netlify="true" attribute
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    // Submit to backend / form service
    // ...
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-green-800">Request Received!</h3>
        <p className="text-green-700 mt-2">
          We'll call you back within 60 minutes. For emergencies, call{' '}
          <a href="tel:+17736103344" className="font-bold underline">(773) 610-3344</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fields: name, phone, email, service dropdown, description, preferredContact, zip */}
      {/* All inputs use onChange={(e) => setForm(prev => ({ ...prev, fieldName: e.target.value }))} */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-900 transition disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Request Free Estimate'}
      </button>
    </form>
  );
}
```

### `FAQAccordion.tsx` (`client:visible`)

```tsx
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            className="w-full text-left py-4 flex justify-between items-center font-semibold text-gray-800"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            {faq.question}
            <span className="ml-4 text-blue-700">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="pb-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

**Usage in an `.astro` file:**

```astro
---
import FAQAccordion from '../../components/islands/FAQAccordion';

const faqs = [
  { question: "Do you offer 24/7 emergency plumbing?", answer: "Yes — call (773) 610-3344 any time." },
  // ...
];
---

<!-- Pass data from Astro to the React island via props -->
<FAQAccordion client:visible faqs={faqs} />
```

### Passing Data from Astro to React Islands

Props passed to React island components must be **serializable** (plain objects, strings, arrays, numbers). You cannot pass Astro component instances, functions, or non-serializable values.

```astro
<!-- ✅ Correct: pass plain data -->
<FAQAccordion client:visible faqs={plainObjectArray} />

<!-- ❌ Wrong: pass an Astro component or a function -->
<SomeIsland client:visible renderItem={MyAstroComponent} />
```

---

## INTERNATIONALIZATION (i18n) — SPANISH PAGE

With the i18n config set in `astro.config.mjs`, Astro handles routing automatically:
- English pages live at `src/pages/` → served at `/`
- Spanish pages live at `src/pages/es/` → served at `/es/`

```astro
<!-- src/pages/es/index.astro -->
---
import PageLayout from '../../layouts/PageLayout.astro';

const spanishMeta = {
  title: 'Plomero en Chicago — Disponible 24/7 | Sandoval Plumbing',
  description: 'Sandoval Plumbing — Su plomero de confianza en Chicago. 25+ años, 300+ reseñas de 5 estrellas. Disponible 24/7. Llame al (773) 610-3344.',
  lang: 'es' as const,
};
---

<PageLayout {...spanishMeta}>
  <!-- Full Spanish homepage content here -->
  <!-- Keep all phone numbers, addresses, and CTAs identical -->
</PageLayout>
```

Add a language toggle in the header that switches between `/` and `/es`.

---

## IMAGE OPTIMIZATION

Use Astro's built-in `<Image>` component for **all** images. It handles WebP conversion, responsive `srcset`, and lazy loading automatically.

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero-placeholder.jpg';
---

<!-- Build-time optimization: converts to WebP, generates srcset, adds width/height -->
<Image
  src={heroImage}
  alt="Eddie Sandoval, licensed plumber, working on pipes in a Chicago home"
  width={1200}
  height={600}
  loading="eager"     <!-- Above the fold: eager. Everything else: lazy (default) -->
  class="w-full h-auto object-cover rounded-lg"
/>
```

For images in `public/` (not processed by Astro), use a plain `<img>` tag with `loading="lazy"` and explicit `width`/`height` to prevent layout shift:

```html
<img
  src="/images/og-image.jpg"
  alt="Sandoval Plumbing — Chicago's 24/7 Plumber"
  width="1200"
  height="630"
  loading="lazy"
/>
```

**Rules:**
- All images in `src/assets/` → use `<Image>` from `astro:assets`
- All images in `public/images/` → use plain `<img>` with `loading="lazy"`
- Every `<img>` and `<Image>` must have descriptive `alt` text with keywords
- Hero image: `loading="eager"` (above the fold)
- All other images: `loading="lazy"` (default for `<Image>`)

---

## SEO IMPLEMENTATION

### Schema Injection Per Page

Pass page-specific schema to `BaseLayout` via the `schema` prop:

```astro
<!-- FAQ page -->
---
import PageLayout from '../layouts/PageLayout.astro';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};
---

<PageLayout
  title="Plumbing FAQs — Sandoval Plumbing Chicago"
  description="Answers to common plumbing questions from Sandoval Plumbing, Chicago's 24/7 family plumber."
  schema={faqSchema}
>
```

### Blog Post Schema

```astro
---
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.data.title,
  "datePublished": post.data.pubDate.toISOString(),
  "author": {
    "@type": "Person",
    "name": post.data.author,
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sandoval Plumbing",
    "url": "https://sandovalplumbingchicago.com",
  },
};
---
```

### `robots.txt` (`public/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://sandovalplumbingchicago.com/sitemap-index.xml
```

The `@astrojs/sitemap` integration auto-generates `sitemap-index.xml` and `sitemap-0.xml` at build time from all your pages. No manual maintenance needed.

---

## BRAND & DESIGN GUIDELINES

- **Primary Color:** Deep trust blue — `#1A3C6E`
- **Secondary Color:** Emergency red/orange — `#E84525`
- **Accent:** White `#FFFFFF`, Light gray `#F5F7FA`
- **Typography:** Bold, clean sans-serif — Poppins or Montserrat for headings; Open Sans for body (load via Google Fonts in `BaseLayout.astro`)
- **Tone:** Personal, confident, trustworthy, plain-spoken — NOT corporate. "Your Chicago plumber, not a call center."
- **Logo:** Text-based — "Sandoval Plumbing" with wrench icon, blue background

### `tailwind.config.mjs`

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1A3C6E',
          red: '#E84525',
          lightgray: '#F5F7FA',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
};
```

---

## SITE ARCHITECTURE (All Pages Required)

Build every page listed. Each page must have unique meta title, meta description, and H1.

### PRIMARY PAGES
1. **Home** (`/`)
2. **About Us** (`/about`)
3. **Services Overview** (`/services`)
4. **Emergency Plumbing** (`/services/emergency-plumbing`)
5. **Drain Cleaning** (`/services/drain-cleaning`)
6. **Water Heater Repair & Installation** (`/services/water-heater`)
7. **Leak Detection & Repair** (`/services/leak-detection`)
8. **Sewer Line Services** (`/services/sewer-line`)
9. **Bathroom Plumbing** (`/services/bathroom-plumbing`)
10. **Kitchen Plumbing** (`/services/kitchen-plumbing`)
11. **Pipe Repair & Replacement** (`/services/pipe-repair`)
12. **Gas Line Services** (`/services/gas-line`)
13. **Preventive Maintenance** (`/services/preventive-maintenance`)
14. **Service Areas** (`/service-areas`)
15. **Reviews & Testimonials** (`/reviews`)
16. **FAQ** (`/faq`)
17. **Blog** (`/blog`) with 3 sample posts
18. **Contact / Free Estimate** (`/contact`)
19. **Spanish Home Page** (`/es`) — Full Spanish version of homepage

---

## PAGE-BY-PAGE SPECIFICATIONS

### PAGE 1: HOME (`/`)
**Meta Title:** Chicago Plumber — 24/7 Emergency Service | Sandoval Plumbing
**Meta Description:** Sandoval Plumbing — Chicago's trusted family plumber. 25+ years, 300+ 5-star reviews. Available 24/7 including holidays. Call (773) 610-3344 for a free estimate.
**H1:** Chicago's Trusted 24/7 Plumber — Fair Prices, Real Results

**Sections (in order):**

**A. TOP ANNOUNCEMENT BAR** (`AnnouncementBar.astro`, red background)
- Text: "🚨 Plumbing Emergency? We're Available 24/7 — Call (773) 610-3344 Now"
- Mobile: full-width, click-to-call link

**B. STICKY HEADER** (`Header.astro` + `MobileNav.tsx client:load`)
- Logo left, Nav center (Services, About, Reviews, Contact), Phone + CTA button right
- CTA Button: "Free Estimate" → `/contact`
- Mobile: hamburger using `MobileNav` React island

**C. HERO SECTION**
- Headline: "Chicago's Trusted 24/7 Plumber"
- Subheadline: "Family-owned for 25+ years. Eddie Sandoval brings fair pricing and expert service to your door — any time, any day."
- Two CTAs: [Call Now: (773) 610-3344] [Get Free Estimate →]
- Star rating badge: ⭐ 4.9 Stars | 300+ Google Reviews
- Background: `<Image>` hero placeholder with `loading="eager"`

**D. TRUST BADGES BAR** (`TrustBadges.astro`)
- ✅ Licensed & Insured
- ✅ 24/7 Emergency Service
- ✅ Family-Owned 25+ Years
- ✅ Free Estimates

**E. WHY SANDOVAL SECTION**
- Headline: "Why Hundreds of Chicago Homeowners Choose Sandoval"
- 3-column cards (static `.astro`)

**F. SERVICES GRID**
- Query `getCollection('services')` — map to `<ServiceCard>` components
- 3×4 grid, each card links to its service page

**G. SOCIAL PROOF / REVIEWS SECTION**
- Query `getCollection('reviews')` — display 4–6 `<ReviewCard>` components
- Real review content from research:
  - "Sandoval saved me from a $2,000 repair quote from a larger company — fixed it for a fraction of the cost." — Jennifer B. ⭐⭐⭐⭐⭐
  - "Eddie assessed our faucet, tub spout and toilets and repaired them to perfection." — Kim Z. ⭐⭐⭐⭐⭐
  - "He is responsive and keeps you updated if running late — rare for contractors." — Verified Google Review ⭐⭐⭐⭐⭐
  - "We had a plumbing emergency on a Sunday. He answered and showed up fast." — Verified Google Review ⭐⭐⭐⭐⭐
- "See All 300+ Reviews →" → `/reviews`

**H. SERVICE AREA MAP** (`ServiceAreaMap.astro`)
- Google Maps iframe centered on 3922 N Bernard St, Chicago IL 60618
- Neighborhood chips below map

**I. ABOUT SNIPPET**
- `<Image>` placeholder for Eddie
- Quote: "I'm Eddie Sandoval. I've been fixing Chicago's plumbing for over 25 years..."
- "Read Our Story →" → `/about`

**J. EMERGENCY CTA SECTION** (`EmergencyCTA.astro`, red background)
- "Plumbing Emergency? Don't Wait."
- `<a href="tel:+17736103344">` button

**K. BLOG PREVIEW**
- Query `getCollection('blog')`, display latest 3 as `<BlogCard>` components

**L. BILINGUAL CTA**
- "¿Hablas español? También ofrecemos servicio en español." → `/es`

**M. FOOTER** (`Footer.astro`)
- Logo, address, phone, hours, quick links, neighborhoods, social icons
- License number placeholder

---

### SERVICE PAGES (Pages 4–13) — Template

Each service page at `src/pages/services/[service-name].astro` uses `ServiceLayout.astro`.

**Template Structure:**
1. H1: "[Service Name] in Chicago, IL"
2. `<Image>` hero
3. Intro paragraph (150–200 words)
4. "Signs You Need This Service" — `<ul>` list
5. "What We Do" — step-by-step process
6. "Why Choose Sandoval" — 3 bullets
7. `BeforeAfterSlider` React island (`client:visible`) with placeholder images
8. Related review quote from Content Collections
9. `FAQAccordion` React island (`client:visible`) — 5 service-specific questions
10. CTA: `EmergencyCTA.astro` + `ContactForm` React island (`client:visible`)

**Service-Specific Notes:**
- **Emergency Plumbing:** Lead with urgency. Red styling. Large phone number. List: burst pipes, sewage backup, gas leaks, flooding. "Average response time: under 60 minutes."
- **Water Heater:** Mention tank vs. tankless, A.O. Smith / Navien / Rheem expertise, Chicago hard water.
- **Sewer Line:** Chicago's older clay/cast iron lines, camera inspection, hydro-jetting.
- **Drain Cleaning:** Chicago winters and frozen drains, hydro-jet vs. rodding.

---

### FAQ PAGE (`/faq`)

Use `FAQAccordion` React island with `FAQPage` JSON-LD schema passed to `BaseLayout`. Include at minimum:

1. How much does it cost to hire a plumber in Chicago?
2. Do you offer emergency plumbing service 24/7?
3. Are you licensed and insured in Illinois?
4. What neighborhoods do you serve?
5. How quickly can you respond to an emergency?
6. Do you offer free estimates?
7. What payment methods do you accept?
8. Can you help with both residential and commercial plumbing?
9. What should I do if I have a burst pipe?
10. Do you speak Spanish? (Sí, ofrecemos servicio en español.)
11. How long have you been in business?
12. Do you charge extra for weekend or holiday calls?

---

### BLOG (`/blog`)

- `/blog/index.astro` — listing page, queries `getCollection('blog')`, maps to `<BlogCard>`
- `/blog/[slug].astro` — dynamic route using `getStaticPaths()` (see pattern above)

**3 required sample posts in `src/content/blog/`:**

1. `frozen-pipes-chicago.mdx` — "How to Prevent Frozen Pipes in Chicago This Winter" (600+ words)
2. `water-heater-replacement.mdx` — "Signs Your Chicago Home Needs a Water Heater Replacement" (600+ words)
3. `plumbing-emergency-guide.mdx` — "What to Do When You Have a Plumbing Emergency in Chicago" (600+ words)

Each post must have the full frontmatter schema defined in Content Collections.

---

### CONTACT PAGE (`/contact`)

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import ContactForm from '../components/islands/ContactForm';
---

<PageLayout title="Free Estimate — Sandoval Plumbing Chicago" description="...">
  <section class="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
      <h1 class="text-3xl font-bold mb-6">Get a Free Plumbing Estimate</h1>
      <ContactForm client:visible />
    </div>
    <div>
      <!-- Phone, WhatsApp, hours, Google Map -->
      <a href="tel:+17736103344">(773) 610-3344</a>
      <!-- Google Maps iframe -->
    </div>
  </section>
</PageLayout>
```

---

## REUSABLE COMPONENTS CHECKLIST

| Component | Type | Hydration |
|---|---|---|
| `Header.astro` | Astro | Static |
| `Footer.astro` | Astro | Static |
| `AnnouncementBar.astro` | Astro | Static |
| `ServiceCard.astro` | Astro | Static |
| `ReviewCard.astro` | Astro | Static |
| `TrustBadges.astro` | Astro | Static |
| `EmergencyCTA.astro` | Astro | Static |
| `BlogCard.astro` | Astro | Static |
| `ServiceAreaMap.astro` | Astro | Static (iframe) |
| `MobileNav.tsx` | React island | `client:load` |
| `ContactForm.tsx` | React island | `client:visible` |
| `FAQAccordion.tsx` | React island | `client:visible` |
| `BeforeAfterSlider.tsx` | React island | `client:visible` |
| `ExitIntentPopup.tsx` | React island | `client:idle` |
| `StickyMobileFooter.tsx` | React island | `client:load` |

---

## CONVERSION OPTIMIZATION REQUIREMENTS

- **Sticky mobile footer** (`StickyMobileFooter.tsx`, `client:load`): Fixed bottom bar on mobile with [📞 Call Now] and [📋 Get Estimate] buttons
- **Exit-intent popup** (`ExitIntentPopup.tsx`, `client:idle`): Trigger on desktop when cursor moves toward browser close. Offer: "Before you go — get a free estimate in 60 seconds."
- **CTA Buttons:** Minimum 3 CTAs per page, at least one above the fold
- **Click-to-call:** Every phone number must be `<a href="tel:+17736103344">`
- **WhatsApp button:** Floating on mobile — `https://wa.me/17736103344`
- **Response time badge:** "⚡ We typically call back within 60 minutes"

---

## ACCESSIBILITY

- All `<Image>` and `<img>` must have descriptive `alt` attributes with keywords
- All form fields must have associated `<label>` elements
- Color contrast: WCAG 2.1 AA minimum (4.5:1 for body text)
- Skip navigation link at top of `PageLayout.astro`
- Keyboard navigable
- ARIA labels on icon-only buttons
- `lang` attribute on `<html>` set correctly for each page (en / es)

---

## DEPLOYMENT

This project uses `output: 'static'` — the build output is a folder of plain HTML, CSS, and JS files. Deploy to:

- **Netlify** (recommended): `netlify.toml` with `build.command = "npm run build"` and `build.publish = "dist"`
- **Vercel**: zero-config, detects Astro automatically
- **Cloudflare Pages**: configure build command and output directory

For form submissions: use **Netlify Forms** (add `data-netlify="true"` to the form element) or **Formspree** (POST to their endpoint from `ContactForm.tsx`).

---

## CONTENT TONE EXAMPLES

**Do write like this:**
- "Call Eddie directly — not a robot, not a dispatcher."
- "We've been fixing Chicago's pipes since before you moved here."
- "You'll always know what you're paying before we start."

**Don't write like this:**
- "We leverage cutting-edge synergies to deliver optimal plumbing solutions."
- "Our team of professionals strives to exceed customer expectations."

---

## DELIVERABLE CHECKLIST

When complete, the following must exist and work:

- [ ] `astro.config.mjs` with all integrations configured (React, Tailwind, Sitemap, MDX, i18n)
- [ ] `src/content/config.ts` with schemas for blog, reviews, services
- [ ] All 19 pages built and linked
- [ ] All page routes match the file structure exactly
- [ ] Responsive on mobile, tablet, desktop (Tailwind breakpoints)
- [ ] All forms functional or marked with backend integration notes
- [ ] All phone numbers use `<a href="tel:+17736103344">`
- [ ] `BaseLayout.astro` injects LocalBusiness JSON-LD on every page
- [ ] FAQ page has FAQPage JSON-LD schema
- [ ] Blog posts have BlogPosting JSON-LD schema
- [ ] Meta tags (title, description, og:*, canonical) on all pages
- [ ] Blog listing + 3 full MDX posts in Content Collections
- [ ] Spanish homepage at `/es`
- [ ] 5 service area sub-pages
- [ ] FAQ page with `FAQAccordion` island
- [ ] Reviews page querying Content Collections
- [ ] `BeforeAfterSlider` island on service pages
- [ ] `EmergencyCTA` on every page (via layout or directly)
- [ ] Google Maps iframe on contact and service area pages
- [ ] WhatsApp floating button (mobile)
- [ ] `StickyMobileFooter` island (mobile)
- [ ] `ExitIntentPopup` island (desktop)
- [ ] `TrustBadges` on homepage
- [ ] `Footer.astro` with complete info
- [ ] `robots.txt` in `public/`
- [ ] Sitemap auto-generated by `@astrojs/sitemap`
- [ ] All images use `<Image>` from `astro:assets` with descriptive alt text
- [ ] Tailwind config extends brand colors and fonts
- [ ] Facebook page link NOT included anywhere (it is broken)

---

## NOTES FOR AGENT

- Use placeholder images from `https://picsum.photos` or describe clearly with `{/* REPLACE WITH: photo of Eddie Sandoval */}` comments in JSX, or `<!-- REPLACE WITH: ... -->` in Astro templates
- For Google Maps: use a static iframe embed URL for 3922 N Bernard St, Chicago IL 60618 — `https://www.google.com/maps/embed?pb=...`
- All review content used is from verified public reviews — safe to display
- The Facebook page link (HTTP 400) must NOT be linked anywhere
- The blog is CMS-ready: Content Collections' Markdown/MDX files are a natural migration target for a headless CMS (Contentful, Sanity, Keystatic) later — no restructuring needed
- The site should out-compete Vanguard Plumbing and Sewer — Chicago's current top-ranked local plumber — by leaning into 24/7 service, personal service (Eddie himself), and bilingual capability as the three main differentiators
