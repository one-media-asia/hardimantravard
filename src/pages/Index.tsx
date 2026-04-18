
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Hardiman.se - Professionell Trädvård i Sverige";
    // Add grid pattern to the body
    document.body.classList.add('bg-grid-pattern');
    return () => {
      document.body.classList.remove('bg-grid-pattern');
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
