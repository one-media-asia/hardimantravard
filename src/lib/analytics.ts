const GA_MEASUREMENT_ID = 'G-7D1XJL0DVL';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const isGtagEnabled = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const pageview = (path: string, title?: string) => {
  if (!isGtagEnabled()) return;

  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
};

export const event = (action: string, params: Record<string, unknown> = {}) => {
  if (!isGtagEnabled()) return;

  window.gtag?.('event', action, params);
};

export const GA_TRACKING_ID = GA_MEASUREMENT_ID;
