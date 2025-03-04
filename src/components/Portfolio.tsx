
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
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

  // Portfolio items
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern shopping experience with seamless checkout and personalized recommendations.",
      category: "web",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Finance App",
      description: "Mobile application for personal finance management with intuitive analytics.",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Corporate Identity",
      description: "Complete brand identity redesign for a growing technology company.",
      category: "branding",
      image: "https://images.unsplash.com/photo-1634937916753-ec1cce0ff48c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      description: "Comprehensive admin interface for a cloud-based software service.",
      category: "web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1630&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Health Tracker",
      description: "Health and fitness tracking application with personalized insights.",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1575909812264-6902b55846ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 6,
      title: "Restaurant Rebranding",
      description: "Complete visual identity refresh for an upscale dining establishment.",
      category: "branding",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    }
  ];

  // Filter projects by category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Categories
  const categories = [
    { id: "all", label: "All Work" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "branding", label: "Branding" }
  ];

  return (
    <section id="work" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
            Our Portfolio
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Selected Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio showcasing innovative solutions 
            across web, mobile, and branding projects.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full px-6"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative overflow-hidden rounded-2xl reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <Badge className="mb-2 w-fit">{
                  categories.find(cat => cat.id === project.category)?.label
                }</Badge>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 text-sm mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  className="flex items-center gap-2 text-white font-medium text-sm"
                >
                  View Project <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all projects link */}
        <div className="text-center mt-16 reveal">
          <Button variant="outline" className="group">
            View All Projects 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
