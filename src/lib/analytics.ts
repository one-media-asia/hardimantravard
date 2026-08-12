const GA_MEASUREMENT_ID = 'G-DPTK8X8BS5';
const VISITOR_SESSION_KEY = 'hardiman-visitor-session';
const VISITOR_SESSIONS_KEY = 'hardiman-visitor-sessions';

export type VisitorSession = {
  sessionId: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  entranceReferrer: string;
  entrancePage: string;
  exitPage?: string;
  pagesVisited: string[];
  ipLocation: string;
  location?: string;
};

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

const safeJSONParse = <T>(value: string | null, fallback: T) => {
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const IP_GEO_API = 'https://ipapi.co/json/';
const IPWHO_API = 'https://ipwho.is/';

const getIpLocation = async (): Promise<string> => {
  if (typeof window === 'undefined') return 'unknown';

  const fallbackLocation = () => {
    const host = window.location.hostname;
    if (host && host !== 'localhost' && host !== '127.0.0.1' && host !== '::1') {
      return host;
    }
    return window.navigator.language || 'unknown';
  };

  const parseIpApiResponse = (data: any): string => {
    const parts = [data.city, data.region, data.country_name].filter(Boolean);
    return parts.join(', ') || data.country_name || 'unknown';
  };

  try {
    const resp = await fetch(IP_GEO_API, { cache: 'reload' });
    if (resp.ok) {
      const data = await resp.json();
      return parseIpApiResponse(data);
    }
  } catch {
    // ignore and try fallback
  }

  try {
    const resp = await fetch(IPWHO_API, { cache: 'reload' });
    if (resp.ok) {
      const data = await resp.json();
      const parts = [data.city, data.region, data.country].filter(Boolean);
      return parts.join(', ') || data.country || fallbackLocation();
    }
  } catch {
    // ignore fallback failures
  }

  return fallbackLocation();
};

export const getVisitorSessions = (): VisitorSession[] => {
  if (typeof window === 'undefined') return [];
  return safeJSONParse<VisitorSession[]>(window.localStorage.getItem(VISITOR_SESSIONS_KEY), []);
};

const saveVisitorSessions = (sessions: VisitorSession[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(VISITOR_SESSIONS_KEY, JSON.stringify(sessions.slice(0, 200)));
};

const getCurrentSession = (): VisitorSession | null => {
  if (typeof window === 'undefined') return null;
  return safeJSONParse<VisitorSession>(window.sessionStorage.getItem(VISITOR_SESSION_KEY), null);
};

const saveCurrentSession = (session: VisitorSession) => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(VISITOR_SESSION_KEY, JSON.stringify(session));
};

export const trackVisitorPage = async (path: string) => {
  if (typeof window === 'undefined') return;

  const referrer = document.referrer || 'direct';
  const current = getCurrentSession();

  if (!current) {
    const ipLocation = await getIpLocation();
    saveCurrentSession({
      sessionId: createSessionId(),
      startedAt: new Date().toISOString(),
      entranceReferrer: referrer,
      entrancePage: path,
      pagesVisited: [path],
      ipLocation,
    });
    return;
  }

  const pagesVisited = current.pagesVisited;
  if (pagesVisited[pagesVisited.length - 1] !== path) {
    pagesVisited.push(path);
  }

  const updatedSession = {
    ...current,
    pagesVisited,
    ipLocation: current.ipLocation || (await getIpLocation()),
  };

  saveCurrentSession(updatedSession);
};

export const endVisitorSession = () => {
  if (typeof window === 'undefined') return;

  const current = getCurrentSession();
  if (!current) return;

  const endedAt = new Date().toISOString();
  const durationSeconds = Math.max(
    0,
    Math.round((new Date(endedAt).getTime() - new Date(current.startedAt).getTime()) / 1000),
  );
  const exitPage = current.pagesVisited[current.pagesVisited.length - 1] ?? current.entrancePage;

  const completed: VisitorSession = {
    ...current,
    endedAt,
    durationSeconds,
    exitPage,
  };

  const sessions = [completed, ...getVisitorSessions()];
  saveVisitorSessions(sessions);
  window.sessionStorage.removeItem(VISITOR_SESSION_KEY);
};

export const GA_TRACKING_ID = GA_MEASUREMENT_ID;
