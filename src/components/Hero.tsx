
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, TreeDeciduous, TreePine, Trees } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_38%),linear-gradient(135deg,_#f8faf8_0%,_#ffffff_55%,_#f0fdf4_100%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 delay-100 transform ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur">
            <TreeDeciduous className="mr-2 h-4 w-4" />
            {t('hero.subtitle')}
          </div>

          <div>
            <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('hero.title1')}<br />
              <span className="text-primary">{t('hero.title2')}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground lg:mx-0">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              onClick={() => scrollToSection('contact')}
              className="rounded-full px-7 py-6 text-base font-medium transition-all hover:-translate-y-1"
            >
              {t('hero.cta1')}
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="rounded-full px-7 py-6 text-base font-medium transition-all hover:-translate-y-1"
            >
              {t('hero.cta2')}
            </Button>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}>
          <div className="rounded-[2rem] border border-border/60 bg-white/90 p-6 shadow-[0_20px_80px_-25px_rgba(15,23,42,0.25)] backdrop-blur">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Professionell service</p>
                  <p className="text-xl font-semibold text-foreground">Trygg vård för träd och mark</p>
                </div>
                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  20+ år
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 text-center shadow-sm">
                  <TreeDeciduous className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">Besiktning</p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 text-center shadow-sm">
                  <TreePine className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">Pruning</p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 text-center shadow-sm">
                  <Trees className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">Skötsel</p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-primary/10 p-4 text-center shadow-sm">
                  <p className="text-3xl font-semibold text-primary">100%</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Ansvar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection('about')}
      >
        <ArrowDown className="h-6 w-6 text-foreground/70" />
      </div>
    </section>
  );
};

export default Hero;
