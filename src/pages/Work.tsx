
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Work = () => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Norwegian Forest Services",
      category: "Landscape Architecture",
      description: "Comprehensive tree management and landscape design for sustainable urban forests.",
      image: "/lovable-uploads/a46d0cb5-29c5-4a44-8ea4-dd45bfaa8323.png",
      year: "2023",
    },
    {
      id: 2,
      title: "Stockholm Residential Gardens",
      category: "Urban Planning",
      description: "Transforming residential areas with thoughtful tree placement and maintenance.",
      image: "/placeholder.svg",
      year: "2022",
    },
    {
      id: 3,
      title: "Göteborg Park Restoration",
      category: "Ecological Conservation",
      description: "Revitalizing public parks with native species and sustainable practices.",
      image: "/placeholder.svg",
      year: "2021",
    },
    {
      id: 4,
      title: "Swedish Heritage Trees",
      category: "Conservation",
      description: "Preserving historic trees through specialized care and documentation.",
      image: "/placeholder.svg",
      year: "2020",
    },
  ];

  useEffect(() => {
    // Smooth scroll initialization
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.min(1, scrollPosition / 300);
        document.documentElement.style.setProperty('--header-opacity', opacity.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900" ref={containerRef}>
      {/* Header with blur effect */}
      <header className="fixed top-0 w-full backdrop-blur-lg z-50 transition-all duration-300" 
        style={{ backgroundColor: 'rgba(245, 245, 245, var(--header-opacity, 0))' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-light text-xl tracking-tight">
            Hardimans
          </Link>
          <Link to="/" className="text-sm font-light tracking-wide opacity-70 hover:opacity-100 transition-opacity">
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-32 pb-16 px-6 container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium px-3 py-1 bg-neutral-100 rounded-full">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mt-6 leading-tight">
            Our work is defined by precision, craft, and dedication
          </h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl">
            For over two decades, we've been transforming landscapes across Sweden. Each project represents our commitment to excellence in tree care and environmental stewardship.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 * index 
              }}
              className="group"
              onClick={() => toast({
                title: "Project details",
                description: `${project.title} details would open here.`,
              })}
            >
              <div className="overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-neutral-100">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                    {project.category}
                  </span>
                  <span className="text-sm text-neutral-400">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium px-3 py-1 bg-neutral-100 rounded-full">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-light mt-6 leading-tight">
            Ready to transform your landscape?
          </h2>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            We bring the same level of care and expertise to projects of all sizes.
          </p>
          <Link 
            to="/contact" 
            className="inline-block mt-8 px-8 py-4 bg-neutral-900 text-white rounded-full text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Hardimans Tradvard. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Work;
