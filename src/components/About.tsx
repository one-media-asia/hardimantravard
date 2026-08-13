
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  TreeDeciduous, 
  Scissors, 
  Axe,
  Trees,
  Leaf,
  ShieldCheck,
  Truck
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Animation on scroll
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
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Service items with icons
  const services = [
    {
      icon: <TreeDeciduous className="h-8 w-8 mb-4" />,
      title: t('service.pruning'),
      description: t('service.pruning.desc')
    },
    {
      icon: <Axe className="h-8 w-8 mb-4" />,
      title: t('service.felling'),
      description: t('service.felling.desc')
    },
    {
      icon: <Scissors className="h-8 w-8 mb-4" />,
      title: t('service.shaping'),
      description: t('service.shaping.desc')
    },
    {
      icon: <ShieldCheck className="h-8 w-8 mb-4" />,
      title: t('service.care'),
      description: t('service.care.desc')
    },
    {
      icon: <Truck className="h-8 w-8 mb-4" />,
      title: t('service.grinding'),
      description: t('service.grinding.desc')
    },
    {
      icon: <Leaf className="h-8 w-8 mb-4" />,
      title: t('service.consulting'),
      description: t('service.consulting.desc')
    }
  ];

  const stats = [
    { value: "20+", label: t('stats.experience') },
    { value: "3500+", label: t('stats.projects') },
    { value: "500+", label: t('stats.clients') }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1 text-primary">
            {t('about.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {t('about.title')}
          </h2>
         <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
           {t('about.description')}
          </p>
        </div>

        {/* Services as cards */}
        <div className="mt-12 max-w-7xl mx-auto reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={i}
                className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-border/10"
              >
                <div className="flex items-center justify-center mb-4 text-primary">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 reveal">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-border/10"
            >
              <h4 className="text-3xl md:text-4xl font-serif font-semibold mb-2 text-primary">{stat.value}</h4>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
