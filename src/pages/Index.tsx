
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WorkGallery from '@/components/WorkGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Add intersection observer for animations
  useEffect(() => {
    // Update document title
    document.title = "Hardiman.se - Professionell Trädvård i Sverige";
    
    // Add grid pattern to the body
    document.body.classList.add('bg-grid-pattern');
       <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script type="module" src="/src/main.tsx"></script>
    // Intersection Observer for reveal animations
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
      document.body.classList.remove('bg-grid-pattern');
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <WorkGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

  
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DPTK8X8BS5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DPTK8X8BS5');
</script>
