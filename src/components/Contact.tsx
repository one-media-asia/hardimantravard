
import { useRef, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
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

  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('contact.email'),
      details: "info@hardiman.se",
      link: "mailto:info@hardiman.se"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('contact.phone'),
      details: "073-370-5058",
      link: "tel:+46733705058"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('contact.location'),
      details: "Göteborg, Sverige",
      link: "https://maps.google.com/?q=Göteborg,Sweden"
    }
  ];

  const hours = [
    { day: t('contact.monday'), hours: "9:00 - 17:00" },
    { day: t('contact.saturday'), hours: t('contact.byagreement') },
    { day: t('contact.sunday'), hours: t('contact.closed') }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
            {t('contact.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        
        {/* Contact information cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
          {contactInfo.map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-4 mb-4 bg-primary/10 rounded-full text-primary">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.details}</p>
            </a>
          ))}
        </div>
        
        {/* Working hours */}
        <div className="max-w-md mx-auto mt-16 p-6 bg-background rounded-2xl shadow-sm reveal">
          <h3 className="font-semibold text-xl mb-4 text-center">{t('contact.hours')}</h3>
          <div className="space-y-3 text-muted-foreground">
            {hours.map((item, index) => (
              <p key={index} className="flex justify-between">
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
