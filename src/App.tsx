import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import treePruning from '@/assets/tree-pruning.jpg';
import treeRemoval from '@/assets/tree-removal.jpg';
import treeHealth from '@/assets/tree-health.jpg';
import forestManagement from '@/assets/forest-management.jpg';
import heritageTree from '@/assets/heritage-tree.jpg';
import urbanPlanting from '@/assets/urban-planting.jpg';

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

  const images = [
    { src: treePruning, alt: 'Tree pruning' },
    { src: treeRemoval, alt: 'Tree removal' },
    { src: treeHealth, alt: 'Tree health assessment' },
    { src: forestManagement, alt: 'Forest management' },
    { src: heritageTree, alt: 'Heritage tree care' },
    { src: urbanPlanting, alt: 'Urban tree planting' },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">{t('work.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('work.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 reveal">
          {images.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
