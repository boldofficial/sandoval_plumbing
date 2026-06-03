export interface MetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  lang?: 'en' | 'es';
}

export function buildMeta({
  title,
  description,
  canonical,
  ogImage = '/images/og-image.jpg',
  lang = 'en',
}: MetaProps) {
  const siteUrl = 'https://sandovalplumbingchicago.com';
  const fullCanonical = canonical || `${siteUrl}${canonical || ''}`;

  return {
    title,
    description,
    canonical: fullCanonical,
    ogImage: `${siteUrl}${ogImage}`,
    lang,
  };
}
