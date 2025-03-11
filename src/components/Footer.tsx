
import { ArrowUp, TreeDeciduous, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-border/40 pb-8 mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <a href="#home" className="flex items-center gap-2 text-2xl font-serif font-semibold hover:opacity-80 transition-opacity">
              <TreeDeciduous className="h-6 w-6 text-primary" />
              <span>TrädKirurgen</span>
            </a>
          </div>
          
          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-8">
              {[
                {id: 'home', label: 'Hem'},
                {id: 'about', label: 'Tjänster'}, 
                {id: 'contact', label: 'Kontakt'}
              ].map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 p-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        
        {/* Contact info section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Telefon</h4>
            </div>
            <a href="tel:+46701234567" className="text-muted-foreground hover:text-foreground transition-colors">
              070-123 45 67
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-primary" />
              <h4 className="font-medium">E-post</h4>
            </div>
            <a href="mailto:info@tradkirurgen.se" className="text-muted-foreground hover:text-foreground transition-colors">
              info@tradkirurgen.se
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Plats</h4>
            </div>
            <p className="text-muted-foreground">
              Stockholm, Göteborg, Malmö & hela Sverige
            </p>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>
            &copy; {currentYear} TrädKirurgen. Alla rättigheter förbehållna.
          </div>
          
          {/* Certifications */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-muted-foreground/80">ISA Certified Arborist</span>
            <span className="text-muted-foreground/80">Medlem i Svenska Trädföreningen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
