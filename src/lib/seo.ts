import { useEffect } from 'react';
import { business } from '../data/business';

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function usePageSeo({ title, description, path = '/', jsonLd }: SeoConfig) {
  useEffect(() => {
    const fullTitle = title.includes(business.name) ? title : `${title} | ${business.fullName}`;
    document.title = fullTitle;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${origin}${path}`;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setCanonical(canonicalUrl);

    const scriptId = 'page-structured-data-ld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [title, description, path, jsonLd]);
}
