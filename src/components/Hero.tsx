
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, TreeDeciduous, TreePine, Trees } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-tree-cutting.jpg';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 px-6"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(20, 40, 25, 0.55) 70%, rgba(10, 25, 15, 0.65) 100%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto w-full text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        {/* Hero text content */}
        <div className={`flex-1 space-y-8 transition-all duration-1000 delay-100 transform ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <div>
            <h4 className="text-sm md:text-base text-primary uppercase tracking-widest mb-3 font-sans font-semibold">
              {t('hero.subtitle')}
            </h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 leading-tight">
              {t('hero.title1')}<br />
              & {t('hero.title2')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md md:max-w-xl">
              {t('hero.description')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="font-medium rounded-full px-7 py-6 text-base hover:translate-y-[-2px] transition-all"
            >
              {t('hero.cta1')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('about')}
              className="font-medium rounded-full px-7 py-6 text-base hover:translate-y-[-2px] transition-all"
            >
              {t('hero.cta2')}
            </Button>
          </div>
        </div>
        
        {/* Hero image/visual */}
        <div className={`flex-1 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center p-6">
                <div className="grid grid-cols-2 gap-6 w-full h-full">
                  <div className="bg-primary/10 rounded-2xl flex items-center justify-center">
                    <TreeDeciduous className="h-20 w-20 text-primary" />
                  </div>
                  <div className="bg-primary/10 rounded-2xl flex items-center justify-center">
                    <TreePine className="h-20 w-20 text-primary" />
                  </div>
                  <div className="bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Trees className="h-20 w-20 text-primary" />
                  </div>
                  <div className="bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-primary font-serif font-bold text-4xl">20+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
