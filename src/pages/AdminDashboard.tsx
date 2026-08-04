import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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

type TrackedKeyword = {
  phrase: string;
  sourceUrl: string;
  language: 'EN' | 'SV';
  volume: number;
  trend: 'Up' | 'Steady' | 'Down';
  status: 'Active' | 'Monitoring' | 'Review';
};

const STORAGE_KEY = 'hardiman-tracked-keywords';

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

  const sourceCount = useMemo(
    () => new Set(trackedKeywords.map((item) => item.sourceUrl)).size,
    [trackedKeywords],
  );

  const totalKeywords = trackedKeywords.length;
  const englishKeywords = trackedKeywords.filter((item) => item.language === 'EN').length;
  const swedishKeywords = trackedKeywords.filter((item) => item.language === 'SV').length;
  const activeKeywords = trackedKeywords.filter((item) => item.status === 'Active').length;

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-8">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {t('admin.badge')}
              </span>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">{t('admin.title')}</h1>
              <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
                {t('admin.subtitle')}
              </p>
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
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('admin.column.keyword')}</TableHead>
                    <TableHead>{t('admin.column.source')}</TableHead>
                    <TableHead>{t('admin.column.language')}</TableHead>
                    <TableHead>{t('admin.column.volume')}</TableHead>
                    <TableHead>{t('admin.column.trend')}</TableHead>
                    <TableHead>{t('admin.column.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trackedKeywords.map((keyword) => (
                    <TableRow key={`${keyword.phrase}-${keyword.sourceUrl}-${keyword.volume}`}>
                      <TableCell className="font-medium">{keyword.phrase}</TableCell>
                      <TableCell>{keyword.sourceUrl}</TableCell>
                      <TableCell>{keyword.language}</TableCell>
                      <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                      <TableCell>{keyword.trend}</TableCell>
                      <TableCell>{keyword.status}</TableCell>
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
