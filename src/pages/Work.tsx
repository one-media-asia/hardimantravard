
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Work = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Update document title
    document.title = "Hardimans Trädvård - " + t("work.title");
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
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
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [t]);

  // Image assets removed from Work page

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto reveal">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{t("work.title")}</h1>
              <p className="text-lg text-muted-foreground mb-8">{t("work.subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Projects Gallery */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
              {/* Project 1 */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t("work.project1.title")}</h3>
                  <p className="text-muted-foreground mb-4">{t("work.project1.description")}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.pruning")}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.residential")}</span>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t("work.project2.title")}</h3>
                  <p className="text-muted-foreground mb-4">{t("work.project2.description")}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.removal")}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.commercial")}</span>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{t("work.project3.title")}</h3>
                  <p className="text-muted-foreground mb-4">{t("work.project3.description")}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.health")}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t("work.tags.parks")}</span>
                  </div>
                </div>
              </div>

              {/* Additional Projects */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Forest Management</h3>
                  <p className="text-muted-foreground mb-4">Sustainable forest management practices for a large private woodland area.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Management</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Conservation</span>
                  </div>
                </div>
              </div>

              {/* Additional Project */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Heritage Tree Preservation</h3>
                  <p className="text-muted-foreground mb-4">Preserving and caring for century-old trees in a historic estate.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Preservation</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Heritage</span>
                  </div>
                </div>
              </div>

              {/* Additional Project */}
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="aspect-video bg-muted"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Urban Tree Planting</h3>
                  <p className="text-muted-foreground mb-4">Increasing urban canopy coverage with strategic tree planting in city centers.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Planting</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Urban</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Work;
