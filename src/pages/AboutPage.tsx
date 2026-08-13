import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
