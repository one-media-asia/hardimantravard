import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const Videos = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Hardiman.se - ${t('videos.title')}`;
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
              <div>
                <a
                  href="https://www.youtube.com/@hardimantreecare1302/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white"
                >
                  {t('videos.gotoChannel')}
                </a>
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
