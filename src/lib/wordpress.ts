export type WordPressLang = 'sv' | 'en';

export type WordPressHero = {
  subtitle?: string;
  title1?: string;
  title2?: string;
  description?: string;
  cta1?: string;
  cta2?: string;
  backgroundImage?: string;
};

export type WordPressAbout = {
  badge?: string;
  title?: string;
  description?: string;
};

export type WordPressWork = {
  title?: string;
  subtitle?: string;
};

export type WordPressStat = {
  value: string;
  label: string;
};

export type WordPressContent = {
  lang: WordPressLang;
  hero: WordPressHero;
  about: WordPressAbout;
  work: WordPressWork;
  stats: WordPressStat[];
};

export type WordPressProject = {
  id: number;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string | null;
};

export type WordPressService = {
  id: number;
  title: string;
  description: string;
  icon?: string;
};

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL?.replace(/\/$/, '') ?? '';

export function isWordPressEnabled(): boolean {
  return Boolean(WORDPRESS_URL);
}

function apiUrl(path: string, lang: WordPressLang): string {
  const url = new URL(`${WORDPRESS_URL}/wp-json/hardiman/v1/${path}`);
  url.searchParams.set('lang', lang);
  return url.toString();
}

async function fetchWordPress<T>(path: string, lang: WordPressLang): Promise<T | null> {
  if (!isWordPressEnabled()) return null;

  try {
    const response = await fetch(apiUrl(path, lang), {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function fetchWordPressContent(lang: WordPressLang): Promise<WordPressContent | null> {
  return fetchWordPress<WordPressContent>('content', lang);
}

export function fetchWordPressProjects(lang: WordPressLang): Promise<{ items: WordPressProject[] } | null> {
  // Projects are hidden in the UI — avoid fetching project list.
  return Promise.resolve(null);
}

export function fetchWordPressServices(lang: WordPressLang): Promise<{ items: WordPressService[] } | null> {
  return fetchWordPress<{ items: WordPressService[] }>('services', lang);
}
