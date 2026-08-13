import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Videos = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Hardiman.se - ${t('videos.title')}`;

    // Load Google platform script for the YouTube subscribe button
    const id = 'gplatform-js';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.src = 'https://apis.google.com/js/platform.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-20">
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
              {t('videos.badge')}
            </Badge>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold mb-4">{t('videos.title')}</h1>
            <p className="text-muted-foreground mb-8">{t('videos.description')}</p>

            <div className="flex flex-col items-center gap-6">
              <a
                href="https://www.youtube.com/@hardimantreecare1302/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {t('videos.gotoChannel')}
              </a>

              <div>
                <div className="g-ytsubscribe" data-channel="@hardimantreecare1302" data-layout="full" data-count="default"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
