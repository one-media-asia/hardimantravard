
import { ArrowUp } from "lucide-react";

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
            <a href="#home" className="text-2xl font-serif font-semibold hover:opacity-80 transition-opacity">
              hardiman.se
            </a>
          </div>
          
          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-8">
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item}
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
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>
            &copy; {currentYear} Hardiman. All rights reserved.
          </div>
          
          {/* Social links */}
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((platform) => (
              <a 
                key={platform}
                href="#"
                className="hover:text-foreground transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
