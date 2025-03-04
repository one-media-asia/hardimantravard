
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto w-full text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        {/* Hero text content */}
        <div className={`flex-1 space-y-8 transition-all duration-1000 delay-100 transform ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <div>
            <h4 className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mb-3 font-sans">
              Premium Digital Solutions
            </h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 leading-tight">
              Where <span className="text-foreground/90">Design</span><br />
              Meets <span className="text-foreground/90">Innovation</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md md:max-w-xl">
              Creating exceptional digital experiences that merge elegance with functionality. 
              We craft solutions that elevate your brand and engage your audience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="font-medium rounded-full px-7 py-6 text-base hover:translate-y-[-2px] transition-all"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('work')}
              className="font-medium rounded-full px-7 py-6 text-base hover:translate-y-[-2px] transition-all"
            >
              View Portfolio
            </Button>
          </div>
        </div>
        
        {/* Hero image/visual */}
        <div className={`flex-1 transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full animate-pulse duration-4000"></div>
            <div className="absolute inset-10 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full animate-pulse duration-7000 delay-1000"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 bg-secondary/80 backdrop-blur-sm rounded-3xl shadow-2xl transform -rotate-6 transition-transform hover:rotate-0 duration-700"></div>
              <div className="absolute w-4/5 h-4/5 bg-accent/70 backdrop-blur-sm rounded-3xl shadow-xl transform rotate-3 transition-transform hover:rotate-0 duration-700"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => scrollToSection('about')}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground/70" />
      </div>
    </section>
  );
};

export default Hero;
