
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

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
      title: "Trädbeskärning",
      description: "Professionell beskärning för att förbättra trädens hälsa, säkerhet och utseende."
    },
    {
      icon: <Axe className="h-8 w-8 mb-4" />,
      title: "Trädfällning",
      description: "Säker och kontrollerad fällning av träd i alla miljöer, även på begränsade ytor."
    },
    {
      icon: <Scissors className="h-8 w-8 mb-4" />,
      title: "Trädformning",
      description: "Specialiserad beskärning för att forma träd enligt specifika estetiska önskemål."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 mb-4" />,
      title: "Trädvård",
      description: "Förebyggande vård och behandling av sjukdomar för att säkerställa trädens långsiktiga hälsa."
    },
    {
      icon: <Truck className="h-8 w-8 mb-4" />,
      title: "Stubbfräsning",
      description: "Effektiv borttagning av stubbar för att förbereda marken för ny plantering eller anläggning."
    },
    {
      icon: <Leaf className="h-8 w-8 mb-4" />,
      title: "Rådgivning",
      description: "Expertråd och konsultation för trädgårdsplanering och långsiktig trädvård."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1 text-primary">
            Våra Tjänster
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Professionell Trädvård för Alla Behov
          </h2>
          <p style="text-align: justify;">

           
           Vår filosofi och vårt mål är att utföra tjänster av högsta kvalitet inom all trädvård och vi erbjuder ärliga och kloka råd för de projekt som vi åtar oss. Vi strävar efter att uppmärksamma trädens viktiga roll i vår miljö och att våra kunder får rätt slags vård för sina träd.

Våra kunder är kommuner, kyrkoförvaltningar, byggföretag, bostadsrättsföreningar fastighetsägare och många privata markägare.
Hardimans Trädvård bryr sig om alla sina kunder, stora som små och vi är kända för vår personliga service, effektiva personal och våra bra priser.

Vårt sätt att tänka: Den som bryr sig om träd bryr sig även om dess ägare. Kontakta oss för ett kostnadsförslag. Längst ner finner du telefonnummer och e-mailadress
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 reveal">
          {[
            { value: "20+", label: "Års Erfarenhet" },
            { value: "3500+", label: "Projekt Avslutade" },
            { value: "500+", label: "Nöjda Kunder" },
            { value: "100%", label: "Certifierade Arborister" }
          ].map((stat, index) => (
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
