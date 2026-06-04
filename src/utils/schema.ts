const siteUrl = 'https://sandovalplumbingchicago.com';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: 'Sandoval Plumbing',
    telephone: ['+17736103344', '+13127238993'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3922 N Bernard St',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      postalCode: '60618',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.9527077,
      longitude: -87.7143835,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '306',
    },
    priceRange: '$$',
    areaServed: 'Chicago, IL',
    url: siteUrl,
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sandoval Plumbing',
      url: siteUrl,
    },
    image: post.image ? `${siteUrl}${post.image}` : undefined,
  };
}

export function serviceSchema(service: { name: string; description: string; areaServed?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Plumber',
      name: 'Sandoval Plumbing',
      url: siteUrl,
    },
    areaServed: service.areaServed || 'Chicago, IL',
  };
}
