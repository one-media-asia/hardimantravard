
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Code, 
  Layout, 
  Share2, 
  ShieldCheck, 
  Smartphone
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
      icon: <Layout className="h-8 w-8 mb-4" />,
      title: "UI/UX Design",
      description: "Creating intuitive, engaging interfaces that delight users and meet business goals."
    },
    {
      icon: <Code className="h-8 w-8 mb-4" />,
      title: "Web Development",
      description: "Building modern, responsive websites with cutting-edge technologies and frameworks."
    },
    {
      icon: <Smartphone className="h-8 w-8 mb-4" />,
      title: "Mobile Apps",
      description: "Developing cross-platform applications that provide seamless experiences across devices."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 mb-4" />,
      title: "Security",
      description: "Implementing robust security measures to protect your digital assets and user data."
    },
    {
      icon: <Share2 className="h-8 w-8 mb-4" />,
      title: "Digital Marketing",
      description: "Strategic marketing solutions to maximize your online presence and reach your audience."
    },
    {
      icon: <Bookmark className="h-8 w-8 mb-4" />,
      title: "Brand Identity",
      description: "Crafting distinctive visual identities that capture the essence of your brand."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Digital Solutions Crafted with Precision
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine strategic thinking with technical excellence to deliver
            exceptional digital experiences tailored to your unique requirements.
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
            { value: "10+", label: "Years Experience" },
            { value: "150+", label: "Projects Completed" },
            { value: "50+", label: "Happy Clients" },
            { value: "4", label: "Industry Awards" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-border/10"
            >
              <h4 className="text-3xl md:text-4xl font-serif font-semibold mb-2">{stat.value}</h4>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
