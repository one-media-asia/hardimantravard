import { ArrowUp, Phone, Mail, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const whatsappNumber = "+46733705058";
  
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="py-12 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-border/40 pb-8 mb-8">
            {/* Back to top button */}
            <button 
              onClick={scrollToTop}
              className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
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
                <h4 className="font-medium">{t('contact.phone')}</h4>
              </div>
              <a href="tel:+46733705058" className="text-muted-foreground hover:text-foreground transition-colors">
                0733-05058
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-primary" />
                <h4 className="font-medium">{t('contact.email')}</h4>
              </div>
              <a href="mailto:info@hardiman.se" className="text-muted-foreground hover:text-foreground transition-colors">
                info@hardiman.se
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-medium">{t('contact.social')}</h4>
              </div>
              <div className="flex gap-4">
                <a href="https://facebook.com/hardimantrees" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/hardimantree" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="flex flex-col items-center text-sm text-muted-foreground">
            <div className="text-center">
              &copy; {currentYear} Hardiman.se. {t('footer.rights')} • <a href="https://onemedia.asia" className="hover:text-foreground transition-colors">Powered by www.OneMedia.asia</a>
            </div>
            
            {/* Certifications */}
            {/* <div className="flex gap-6 mt-4">
              <span className="text-muted-foreground/80">{t('footer.certified')}</span>
              <span className="text-muted-foreground/80">{t('footer.member')}</span>
            </div> */}
          </div>
        </div>
      </footer>
      
      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Im on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

    
    </>
  );
};

export default Footer;
