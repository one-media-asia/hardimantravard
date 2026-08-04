import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { clearAdminToken } from '@/lib/auth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { getVisitorSessions, type VisitorSession } from '@/lib/analytics';

// Admin dashboard provides a simple analytics and booking review interface.
// It combines local storage and Supabase-backed booking storage with visitor session metrics.

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
  deposit?: string;
  createdAt?: string;
};

type TrackedKeyword = {
  phrase: string;
  sourceUrl: string;
  language: 'EN' | 'SV';
  volume: number;
  trend: 'Up' | 'Steady' | 'Down';
  status: 'Active' | 'Monitoring' | 'Review';
};

const STORAGE_KEY = 'hardiman-tracked-keywords';
const BOOKING_NOTES_KEY = 'hardiman-booking-notes';

const initialTrackedKeywords: TrackedKeyword[] = [
  { phrase: 'local certified arborist near me', sourceUrl: '/', language: 'EN', volume: 420, trend: 'Up', status: 'Active' },
  { phrase: 'professional tree care services', sourceUrl: '/services', language: 'EN', volume: 360, trend: 'Steady', status: 'Active' },
  { phrase: 'tree maintenance and health care', sourceUrl: '/services', language: 'EN', volume: 290, trend: 'Up', status: 'Monitoring' },
  { phrase: 'expert tree pruning services', sourceUrl: '/work', language: 'EN', volume: 240, trend: 'Up', status: 'Active' },
  { phrase: 'safe tree removal service', sourceUrl: '/contact', language: 'EN', volume: 310, trend: 'Steady', status: 'Active' },
  { phrase: 'lokal certifierad tradarborist nara mig', sourceUrl: '/', language: 'SV', volume: 220, trend: 'Up', status: 'Active' },
  { phrase: 'professionella tradvardstjanster', sourceUrl: '/services', language: 'SV', volume: 200, trend: 'Steady', status: 'Active' },
  { phrase: 'tradvard och underhall', sourceUrl: '/services', language: 'SV', volume: 190, trend: 'Up', status: 'Monitoring' },
  { phrase: 'professionell tradgallring och beskarning', sourceUrl: '/work', language: 'SV', volume: 160, trend: 'Up', status: 'Active' },
  { phrase: 'certifierad tradarborist', sourceUrl: '/contact', language: 'SV', volume: 210, trend: 'Steady', status: 'Active' },
];

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [trackedKeywords, setTrackedKeywords] = useState<TrackedKeyword[]>(initialTrackedKeywords);
  const [newPhrase, setNewPhrase] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newLanguage, setNewLanguage] = useState<TrackedKeyword['language']>('EN');
  const [newVolume, setNewVolume] = useState('100');
  const [newTrend, setNewTrend] = useState<TrackedKeyword['trend']>('Up');
  const [newStatus, setNewStatus] = useState<TrackedKeyword['status']>('Active');
  const [editingKeywordIndex, setEditingKeywordIndex] = useState<number | null>(null);
  const [editingKeyword, setEditingKeyword] = useState<TrackedKeyword | null>(null);
  const [visitorSessions, setVisitorSessions] = useState<VisitorSession[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingNotes, setBookingNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setVisitorSessions(getVisitorSessions());

    // Load booking records on initial page visit.
    // Prefer Supabase when configured, otherwise fall back to local storage.
    (async () => {
      try {
        const hasSupabase = Boolean((import.meta.env as any).VITE_SUPABASE_URL && (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY);
        if (hasSupabase) {
          const { data, error } = await supabase.from('bookings').select('*').order('createdAt', { ascending: false }).limit(200);
          if (!error && Array.isArray(data)) {
            setBookings(data as Booking[]);
          } else {
            const saved = window.localStorage.getItem('hardiman-bookings');
            setBookings(saved ? JSON.parse(saved) : []);
          }
        } else {
          const saved = window.localStorage.getItem('hardiman-bookings');
          setBookings(saved ? JSON.parse(saved) : []);
        }
      } catch (e) {
        const saved = window.localStorage.getItem('hardiman-bookings');
        setBookings(saved ? JSON.parse(saved) : []);
      }
    })();
  }, []);

  // Visitor analytics helpers.
  const loadVisitorSessions = () => {
    setVisitorSessions(getVisitorSessions());
  };

  // Booking data helpers.
  const loadBookings = () => {
    // Refresh bookings manually from Supabase or local storage.
    (async () => {
      if (typeof window === 'undefined') return;
      try {
        const hasSupabase = Boolean((import.meta.env as any).VITE_SUPABASE_URL && (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY);
        if (hasSupabase) {
          const { data, error } = await supabase.from('bookings').select('*').order('createdAt', { ascending: false }).limit(200);
          if (!error && Array.isArray(data)) {
            setBookings(data as Booking[]);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      try {
        const saved = window.localStorage.getItem('hardiman-bookings');
        setBookings(saved ? JSON.parse(saved) : []);
      } catch {
        setBookings([]);
      }
    })();
  };

  const deleteBooking = (id: string) => {
    // Remove a booking entry both from Supabase (if available) and local state.
    (async () => {
      const hasSupabase = Boolean((import.meta.env as any).VITE_SUPABASE_URL && (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY);
      if (hasSupabase) {
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (error) {
          toast({ title: 'Error', description: 'Failed to delete booking from Supabase', variant: 'destructive' });
        }
      }
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      if (typeof window !== 'undefined') window.localStorage.setItem('hardiman-bookings', JSON.stringify(updated));
    })();
  };

  const clearBookings = () => {
    // Delete all booking entries for cleanup or reset.
    (async () => {
      const hasSupabase = Boolean((import.meta.env as any).VITE_SUPABASE_URL && (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY);
      if (hasSupabase) {
        const { error } = await supabase.from('bookings').delete().neq('id', '');
        if (error) {
          toast({ title: 'Error', description: 'Failed to clear bookings from Supabase', variant: 'destructive' });
        }
      }
      setBookings([]);
      setBookingNotes({});
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('hardiman-bookings');
        window.localStorage.removeItem(BOOKING_NOTES_KEY);
      }
    })();
  };

  const totalSessions = visitorSessions.length;
  const averageSessionDuration = useMemo(() => {
    if (!visitorSessions.length) return 0;
    const totalSeconds = visitorSessions.reduce((sum, session) => sum + (session.durationSeconds ?? 0), 0);
    return Math.round(totalSeconds / visitorSessions.length);
  }, [visitorSessions]);

  const formattedAverageDuration = useMemo(() => {
    const minutes = Math.floor(averageSessionDuration / 60);
    const seconds = averageSessionDuration % 60;
    return `${minutes}m ${seconds}s`;
  }, [averageSessionDuration]);

  const topReferrer = useMemo(() => {
    const counts = visitorSessions.reduce<Record<string, number>>((acc, session) => {
      const ref = session.entranceReferrer || 'direct';
      acc[ref] = (acc[ref] ?? 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length ? `${sorted[0][0]} (${sorted[0][1]})` : '—';
  }, [visitorSessions]);

  const topExitPage = useMemo(() => {
    const counts = visitorSessions.reduce<Record<string, number>>((acc, session) => {
      const page = session.exitPage ?? session.pagesVisited[session.pagesVisited.length - 1] ?? session.entrancePage;
      acc[page] = (acc[page] ?? 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length ? `${sorted[0][0]} (${sorted[0][1]})` : '—';
  }, [visitorSessions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as TrackedKeyword[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTrackedKeywords(parsed);
      }
    } catch {
      // ignore invalid saved state
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedKeywords));
  }, [trackedKeywords]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedNotes = window.localStorage.getItem(BOOKING_NOTES_KEY);
    if (!savedNotes) return;

    try {
      const parsed = JSON.parse(savedNotes) as Record<string, string>;
      setBookingNotes(parsed);
    } catch {
      // ignore invalid saved notes
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(BOOKING_NOTES_KEY, JSON.stringify(bookingNotes));
  }, [bookingNotes]);

  const sourceCount = useMemo(
    () => new Set(trackedKeywords.map((item) => item.sourceUrl)).size,
    [trackedKeywords],
  );

  const totalKeywords = trackedKeywords.length;
  const englishKeywords = trackedKeywords.filter((item) => item.language === 'EN').length;
  const swedishKeywords = trackedKeywords.filter((item) => item.language === 'SV').length;
  const activeKeywords = trackedKeywords.filter((item) => item.status === 'Active').length;
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login');
  };

  // Keyword tracker helpers.
  // Add a new tracked keyword to the dashboard state and persist it locally.
  const handleAddKeyword = () => {
    if (!newPhrase.trim() || !newSourceUrl.trim()) return;

    setTrackedKeywords((current) => [
      {
        phrase: newPhrase.trim(),
        sourceUrl: newSourceUrl.trim(),
        language: newLanguage,
        volume: Number(newVolume) || 0,
        trend: newTrend,
        status: newStatus,
      },
      ...current,
    ]);

    setNewPhrase('');
    setNewSourceUrl('');
    setNewVolume('100');
    setNewTrend('Up');
    setNewStatus('Active');
  };

  const handleEditKeyword = (index: number) => {
    setEditingKeywordIndex(index);
    setEditingKeyword(trackedKeywords[index]);
  };

  const handleSaveKeyword = (index: number) => {
    if (!editingKeyword) return;

    setTrackedKeywords((current) =>
      current.map((item, idx) => (idx === index ? editingKeyword : item)),
    );

    setEditingKeywordIndex(null);
    setEditingKeyword(null);
  };

  const handleCancelEditKeyword = () => {
    setEditingKeywordIndex(null);
    setEditingKeyword(null);
  };

  const handleDeleteKeyword = (index: number) => {
    setTrackedKeywords((current) => current.filter((_, idx) => idx !== index));
    if (editingKeywordIndex === index) {
      handleCancelEditKeyword();
    }
  };

  const handleBookingNoteChange = (bookingId: string, value: string) => {
    setBookingNotes((current) => ({
      ...current,
      [bookingId]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {t('admin.badge')}
                </span>
                <h1 className="mt-4 text-3xl font-bold md:text-4xl">{t('admin.title')}</h1>
                <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
                  {t('admin.subtitle')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleLogout}>
                  {t('admin.action.logout')}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-10">
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.keywords')}</p>
                <p className="mt-3 text-3xl font-semibold">{totalKeywords}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.pages')}</p>
                <p className="mt-3 text-3xl font-semibold">{sourceCount}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.english')}</p>
                <p className="mt-3 text-3xl font-semibold">{englishKeywords}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.swedish')}</p>
                <p className="mt-3 text-3xl font-semibold">{swedishKeywords}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.active')}</p>
                <p className="mt-3 text-3xl font-semibold">{activeKeywords}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background/50 p-6 mb-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{t('admin.visitor.title')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                    {t('admin.visitor.description')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={loadVisitorSessions} className="w-full md:w-auto" variant="default">
                    {t('admin.visitor.refresh')}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                <div className="rounded-3xl border border-border bg-background/50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.sessions')}</p>
                  <p className="mt-3 text-3xl font-semibold">{totalSessions}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.averageDuration')}</p>
                  <p className="mt-3 text-3xl font-semibold">{formattedAverageDuration}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.topReferrer')}</p>
                  <p className="mt-3 text-3xl font-semibold">{topReferrer}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background/50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.metric.topExitPage')}</p>
                  <p className="mt-3 text-3xl font-semibold">{topExitPage}</p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-background/70">
                <Table className="min-w-full">
                  <TableCaption>{t('admin.visitor.table.caption')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.visitor.column.sessionId')}</TableHead>
                      <TableHead>{t('admin.visitor.column.referrer')}</TableHead>
                      <TableHead>{t('admin.visitor.column.pages')}</TableHead>
                      <TableHead>{t('admin.visitor.column.duration')}</TableHead>
                      <TableHead>{t('admin.visitor.column.ipLocation')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitorSessions.slice(0, 8).map((session) => (
                      <TableRow key={session.sessionId}>
                        <TableCell className="font-medium">{session.sessionId.slice(0, 8)}</TableCell>
                        <TableCell>{session.entranceReferrer || 'direct'}</TableCell>
                        <TableCell>{session.pagesVisited.join(' → ')}</TableCell>
                        <TableCell>{session.durationSeconds != null ? `${session.durationSeconds}s` : 'active'}</TableCell>
                        <TableCell>{session.ipLocation || 'unknown'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background/50 p-6 mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{t('admin.bookings.title')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t('admin.bookings.description')}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={loadBookings} variant="default">{t('admin.bookings.refresh')}</Button>
                  <Button onClick={clearBookings} variant="destructive">{t('admin.bookings.clear')}</Button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-background/70">
                <Table className="min-w-full">
                  <TableCaption>{t('admin.bookings.table.caption')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.bookings.column.id')}</TableHead>
                      <TableHead>{t('admin.bookings.column.name')}</TableHead>
                      <TableHead>{t('admin.bookings.column.email')}</TableHead>
                      <TableHead>{t('admin.bookings.column.phone')}</TableHead>
                      <TableHead>{t('admin.bookings.column.date')}</TableHead>
                      <TableHead>{t('admin.bookings.column.deposit')}</TableHead>
                      <TableHead>{t('admin.bookings.column.notes')}</TableHead>
                      <TableHead>{t('admin.bookings.column.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.slice(0, 50).map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.id.slice(0, 8)}</TableCell>
                        <TableCell>{b.name}</TableCell>
                        <TableCell>{b.email}</TableCell>
                        <TableCell>{b.phone}</TableCell>
                        <TableCell>{b.preferredDate ?? '—'}</TableCell>
                        <TableCell>{b.deposit ? `${b.deposit} SEK` : '—'}</TableCell>
                        <TableCell>
                          <input
                            type="text"
                            value={bookingNotes[b.id] ?? ''}
                            onChange={(event) => handleBookingNoteChange(b.id, event.target.value)}
                            placeholder={t('admin.bookings.notePlaceholder')}
                            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button onClick={() => navigator.clipboard?.writeText(JSON.stringify(b))} size="sm">Copy</Button>
                            <Button onClick={() => deleteBooking(b.id)} variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background/50 p-6 mb-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{t('admin.source.title')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                    {t('admin.source.description')}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.keyword')}</span>
                  <input
                    value={newPhrase}
                    onChange={(event) => setNewPhrase(event.target.value)}
                    placeholder="Example: tree health diagnosis"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.source')}</span>
                  <input
                    value={newSourceUrl}
                    onChange={(event) => setNewSourceUrl(event.target.value)}
                    placeholder="Example: /services"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.volume')}</span>
                  <input
                    type="number"
                    value={newVolume}
                    onChange={(event) => setNewVolume(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mt-4">
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.language')}</span>
                  <select
                    value={newLanguage}
                    onChange={(event) => setNewLanguage(event.target.value as TrackedKeyword['language'])}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="EN">EN</option>
                    <option value="SV">SV</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.trend')}</span>
                  <select
                    value={newTrend}
                    onChange={(event) => setNewTrend(event.target.value as TrackedKeyword['trend'])}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Up">Up</option>
                    <option value="Steady">Steady</option>
                    <option value="Down">Down</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm">
                  <span>{t('admin.form.status')}</span>
                  <select
                    value={newStatus}
                    onChange={(event) => setNewStatus(event.target.value as TrackedKeyword['status'])}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Active">Active</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Review">Review</option>
                  </select>
                </label>
                <div className="flex items-end">
                  <Button onClick={handleAddKeyword} className="w-full" variant="default">
                    {t('admin.form.add')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background/70">
              <Table className="min-w-full">
                <TableCaption>{t('admin.table.caption')}</TableCaption>
                {/* Keyword tracker table with inline edit controls */}
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.column.keyword')}</TableHead>
                    <TableHead>{t('admin.column.source')}</TableHead>
                    <TableHead>{t('admin.column.language')}</TableHead>
                    <TableHead>{t('admin.column.volume')}</TableHead>
                    <TableHead>{t('admin.column.trend')}</TableHead>
                    <TableHead>{t('admin.column.status')}</TableHead>
                    <TableHead>{t('admin.column.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trackedKeywords.map((keyword, index) => (
                    <TableRow key={`${keyword.phrase}-${keyword.sourceUrl}-${keyword.volume}`}>
                      {editingKeywordIndex === index && editingKeyword ? (
                        <>
                          <TableCell>
                            <input
                              value={editingKeyword.phrase}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, phrase: event.target.value })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              value={editingKeyword.sourceUrl}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, sourceUrl: event.target.value })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            />
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingKeyword.language}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, language: event.target.value as TrackedKeyword['language'] })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            >
                              <option value="EN">EN</option>
                              <option value="SV">SV</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              value={editingKeyword.volume}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, volume: Number(event.target.value) || 0 })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            />
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingKeyword.trend}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, trend: event.target.value as TrackedKeyword['trend'] })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            >
                              <option value="Up">Up</option>
                              <option value="Steady">Steady</option>
                              <option value="Down">Down</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingKeyword.status}
                              onChange={(event) => setEditingKeyword({ ...editingKeyword, status: event.target.value as TrackedKeyword['status'] })}
                              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
                            >
                              <option value="Active">Active</option>
                              <option value="Monitoring">Monitoring</option>
                              <option value="Review">Review</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSaveKeyword(index)}>{t('admin.action.save')}</Button>
                              <Button size="sm" variant="secondary" onClick={handleCancelEditKeyword}>{t('admin.action.cancel')}</Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">{keyword.phrase}</TableCell>
                          <TableCell>{keyword.sourceUrl}</TableCell>
                          <TableCell>{keyword.language}</TableCell>
                          <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                          <TableCell>{keyword.trend}</TableCell>
                          <TableCell>{keyword.status}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEditKeyword(index)}>{t('admin.action.edit')}</Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteKeyword(index)}>{t('admin.action.delete')}</Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
