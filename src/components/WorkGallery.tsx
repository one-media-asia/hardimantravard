import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const WorkGallery = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">{t('work.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('work.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
