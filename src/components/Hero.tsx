
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();
  
  // Animate on load
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6 hero-section-bg"
    >
      {/* Background image and overlays */}
      <div className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 hero-bg-image"></div>
      <div className="hero-dark-overlay"></div>
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Content container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-32 hero-content text-center">
        <h4 className="hero-subtitle mb-2">{t('hero.subtitle')}</h4>
        <h1 className="hero-title mb-6">{t('hero.title1')}<br />&amp; {t('hero.title2')}</h1>
        <p className="hero-description mb-8">{t('hero.description')}</p>
        <Button 
          onClick={() => scrollToSection('contact')}
          className="hero-cta"
        >
          {t('hero.cta1')}
        </Button>
      </div>
      
      {/* Scroll down indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection('about')}
      >
        <ArrowDown className="h-6 w-6 text-white drop-shadow-lg" />
      </div>
    </section>
  );
};

export default Hero;
