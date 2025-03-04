
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle link click (smooth scroll)
  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-5",
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 text-2xl font-serif font-semibold transition-all hover:opacity-80">
          <TreeDeciduous className="h-7 w-7 text-primary" />
          <span>Välkomna till Hardimans Trädvård</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-10">
            {[
              { id: 'home', label: 'Hem' },
              { id: 'about', label: 'Tjänster' },
              { id: 'contact', label: 'Kontakt' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className="font-medium text-foreground/80 hover:text-foreground transition-all relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out pt-24 px-6",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav>
          <ul className="flex flex-col items-center space-y-8">
            {[
              { id: 'home', label: 'Hem' },
              { id: 'about', label: 'Tjänster' },
              { id: 'contact', label: 'Kontakt' }
            ].map((item) => (
              <li key={item.id} className="w-full">
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className="font-medium text-xl w-full text-center py-3 hover:bg-secondary rounded-md transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
