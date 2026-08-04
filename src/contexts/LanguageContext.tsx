
import { createContext, useState, useContext, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// Create translations for both languages
const translations = {
  sv: {
    // Navigation
    "nav.home": "Hem",
    "nav.services": "Tjänster",
    "nav.work": "Projekt",
    "nav.admin": "Admin",
    "nav.contact": "Kontakta oss",
    
    // Hero section
    "hero.subtitle": "Professionell Trädvård i Sverige",
    "hero.title1": "Expert Trädkirurgi",
    "hero.title2": "& Trädvård",
    "hero.description": "Hardimans Trädvård är ett professionellt arboristföretag som utför vård och underhåll av träd samt trädfällning över hela Sverige. Certifierade arborister med över 20 års erfarenhet.",
    "hero.cta1": "Kontakta Oss",
    "hero.cta2": "Våra Tjänster",
    
    // About/Services section
    "about.badge": "Våra Tjänster",
    "about.title": "Professionell Trädvård för Alla Behov",
    "about.description": "Vår filosofi och vårt mål är att utföra tjänster av högsta kvalitet inom all trädvård och vi erbjuder ärliga och kloka råd för de projekt som vi åtar oss. Vi strävar efter att uppmärksamma trädens viktiga roll i vår miljö och att våra kunder får rätt slags vård för sina träd.",
    
    // Service items
    "service.pruning": "Trädbeskärning",
    "service.pruning.desc": "Professionell beskärning för att förbättra trädens hälsa, säkerhet och utseende.",
    "service.felling": "Trädfällning",
    "service.felling.desc": "Säker och kontrollerad fällning av träd i alla miljöer, även på begränsade ytor.",
    "service.shaping": "Trädformning",
    "service.shaping.desc": "Specialiserad beskärning för att forma träd enligt specifika estetiska önskemål.",
    "service.care": "Trädvård",
    "service.care.desc": "Förebyggande vård och behandling av sjukdomar för att säkerställa trädens långsiktiga hälsa.",
    "service.grinding": "Stubbfräsning",
    "service.grinding.desc": "Effektiv borttagning av stubbar för att förbereda marken för ny plantering eller anläggning.",
    "service.consulting": "Rådgivning",
    "service.consulting.desc": "Expertråd och konsultation för trädgårdsplanering och långsiktig trädvård.",
    
    // Stats
    "stats.experience": "Års Erfarenhet",
    "stats.projects": "Projekt Avslutade",
    "stats.clients": "Nöjda Kunder",
    "stats.certified": "Certifierade Arborister",
    
    // Contact section
    "contact.badge": "Kontakta Oss",
    "contact.title": "Vill du veta mer?",
    "contact.description": "Har du ett projekt i åtanke eller vill du veta mer om våra tjänster? Vi ser fram emot att höra från dig.",
    "contact.email": "E-post",
    "contact.phone": "Telefon",
    "contact.social": "Sociala Medier",
    "contact.location": "Serviceområde",
    "contact.hours": "Öppettider",
    "contact.monday": "Måndag - Fredag",
    "contact.saturday": "Lördag",
    "contact.sunday": "Söndag",
    "contact.byagreement": "Efter överenskommelse",
    "contact.closed": "Stängt",
    
    // Footer
    "footer.rights": "Alla rättigheter förbehållna.",
    "footer.certified": "Certified Arborist",
    "footer.member": "Hardimans Trädvård | Certifierade Arborister",
    
    // Work page
    "work.title": "Våra Projekt",
    "work.subtitle": "Se exempel på vårt arbete och hur vi tar hand om träd i olika miljöer",
    "work.project1.title": "Villa i Göteborg ",
    "work.project1.description": "Beskärning och formning av flera stora ekar för att förbättra ljusinsläpp och säkerhet.",
    "work.project2.title": "Kontorspark i Göteborg",
    "work.project2.description": "Borttagning av stormskadade träd och plantering av nya arter för framtida tillväxt.",
    "work.project3.title": "Stadspark i Malmö",
    "work.project3.description": "Hälsobedömning och vård av historiska träd i centrala Malmö.",
    "work.tags.pruning": "Beskärning",
    "work.tags.removal": "Trädfällning",
    "work.tags.health": "Hälsovård",
    "work.tags.residential": "Bostadsområde",
    "work.tags.commercial": "Kommersiellt",
    "work.tags.parks": "Parkområde",

    // Admin dashboard
    "admin.badge": "Admin Dashboard",
    "admin.title": "Keyword Monitoring",
    "admin.subtitle": "Monitor keyword performance and status for English and Swedish campaigns.",
    "admin.metric.keywords": "Totalt antal sökord",
    "admin.metric.pages": "Sporrade sidor",
    "admin.metric.english": "Engelska sökord",
    "admin.metric.swedish": "Svenska sökord",
    "admin.metric.active": "Aktiva sökord",
    "admin.table.caption": "Liveövervakning av sökord för trädvård och arboristtermer.",
    "admin.column.keyword": "Sökord",
    "admin.column.source": "Källa URL",
    "admin.column.language": "Språk",
    "admin.column.volume": "Sökvolym",
    "admin.column.trend": "Trend",
    "admin.column.status": "Status",
    "admin.source.title": "Sporrade källsidor",
    "admin.source.description": "Lägg till sökord och sid-URL:er du vill övervaka på din egen webbplats.",
    "admin.form.keyword": "Sökordsfras",
    "admin.form.source": "Källa URL",
    "admin.form.volume": "Beräknad volym",
    "admin.form.language": "Språk",
    "admin.form.trend": "Trend",
    "admin.form.status": "Status",
    "admin.form.add": "Lägg till sökord",
    "admin.google.title": "Google Connect",
    "admin.google.description": "Connect to Google to review Search Console sites and monitor keyword health.",
    "admin.google.status": "Google Status:",
    "admin.google.connect": "Connect with Google",
    "admin.google.connected": "Connected",
    "admin.google.disconnected": "Disconnected",
    "admin.google.pending": "Connecting…",
    "admin.google.error": "Unable to connect to Google.",
    "admin.google.missingClientId": "Google client ID is not configured.",
    "admin.google.invalidClientId": "Google client ID must be a valid OAuth client identifier ending with .apps.googleusercontent.com.",
    "admin.google.user": "Signed in as",
    "admin.google.sites.title": "Search Console Sites",
    "admin.google.noSites": "No Search Console sites found or authorized yet.",
    "admin.track.ownDescription": "Track your own target keywords and performance metrics in one place.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.work": "Projects",
    "nav.admin": "Admin",
    "nav.contact": "Contact Us",
    
    // Hero section
    "hero.subtitle": "Professional Tree Care in Sweden",
    "hero.title1": "Expert Tree Surgery",
    "hero.title2": "& Tree Care",
    "hero.description": "Hardimans Tree Care is a professional arborist company that performs tree care, maintenance, and tree removal throughout Sweden. Certified arborists with over 20 years of experience.",
    "hero.cta1": "Contact Us",
    "hero.cta2": "Our Services",
    
    // About/Services section
    "about.badge": "Our Services",
    "about.title": "Professional Tree Care for All Needs",
    "about.description": "Our philosophy and goal is to perform services of the highest quality in all tree care, and we offer honest and wise advice for the projects we undertake. We strive to highlight the important role of trees in our environment and ensure our customers receive the right kind of care for their trees.",
    
    // Service items
    "service.pruning": "Tree Pruning",
    "service.pruning.desc": "Professional pruning to improve tree health, safety, and appearance.",
    "service.felling": "Tree Removal",
    "service.felling.desc": "Safe and controlled tree felling in all environments, even in confined spaces.",
    "service.shaping": "Tree Shaping",
    "service.shaping.desc": "Specialized pruning to shape trees according to specific aesthetic preferences.",
    "service.care": "Tree Care",
    "service.care.desc": "Preventive care and treatment of diseases to ensure long-term tree health.",
    "service.grinding": "Stump Grinding",
    "service.grinding.desc": "Efficient removal of stumps to prepare the ground for new planting or development.",
    "service.consulting": "Consulting",
    "service.consulting.desc": "Expert advice and consultation for garden planning and long-term tree care.",
    
    // Stats
    "stats.experience": "Years of Experience",
    "stats.projects": "Completed Projects",
    "stats.clients": "Happy Clients",
    "stats.certified": "Certified Arborists",
    
    // Contact section
    "contact.badge": "Contact Us",
    "contact.title": "Want to Know More?",
    "contact.description": "Do you have a project in mind or want to know more about our services? We look forward to hearing from you.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.social": "Social Media",
    "contact.location": "Service Area",
    "contact.hours": "Opening Hours",
    "contact.monday": "Monday - Friday",
    "contact.saturday": "Saturday",
    "contact.sunday": "Sunday",
    "contact.byagreement": "By appointment",
    "contact.closed": "Closed",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.certified": "Certified Arborists",
    "footer.member": "Hardimans Tree Care | Certified Arborists",
    
    // Work page
    "work.title": "Our Projects",
    "work.subtitle": "See examples of our work and how we care for trees in various environments",
    "work.project1.title": "Residence in Göteborg",
    "work.project1.description": "Pruning and shaping of several large oak trees to improve light penetration and safety.",
    "work.project2.title": "Office Park in Gothenburg",
    "work.project2.description": "Removal of storm-damaged trees and planting of new species for future growth.",
    "work.project3.title": "City Park in Malmö",
    "work.project3.description": "Health assessment and care of historic trees in central Malmö.",
    "work.tags.pruning": "Pruning",
    "work.tags.removal": "Tree Removal",
    "work.tags.health": "Health Care",
    "work.tags.residential": "Residential",
    "work.tags.commercial": "Commercial",
    "work.tags.parks": "Park Area",

    // Admin dashboard
    "admin.badge": "Admin Dashboard",
    "admin.title": "Keyword Monitoring",
    "admin.subtitle": "Monitor keyword performance and status for English and Swedish campaigns.",
    "admin.metric.keywords": "Total Keywords",
    "admin.metric.pages": "Tracked Pages",
    "admin.metric.english": "English Keywords",
    "admin.metric.swedish": "Swedish Keywords",
    "admin.metric.active": "Active Keywords",
    "admin.table.caption": "Live keyword monitoring for tree care and arborist search terms.",
    "admin.column.keyword": "Keyword",
    "admin.column.source": "Source URL",
    "admin.column.language": "Language",
    "admin.column.volume": "Search Volume",
    "admin.column.trend": "Trend",
    "admin.column.status": "Status",
    "admin.source.title": "Tracked Source Pages",
    "admin.source.description": "Add keywords and the page URLs you want to monitor for your own site.",
    "admin.form.keyword": "Keyword phrase",
    "admin.form.source": "Source URL",
    "admin.form.volume": "Estimated volume",
    "admin.form.language": "Language",
    "admin.form.trend": "Trend",
    "admin.form.status": "Status",
    "admin.form.add": "Add keyword",
    "admin.visitor.title": "Visitor Session Metrics",
    "admin.visitor.description": "See where visitors came from, how long they stayed, and where they left.",
    "admin.visitor.refresh": "Refresh sessions",
    "admin.visitor.table.caption": "Most recent visitor sessions.",
    "admin.visitor.column.sessionId": "Session",
    "admin.visitor.column.referrer": "Referrer",
    "admin.visitor.column.pages": "Pages Visited",
    "admin.visitor.column.duration": "Varaktighet",
    "admin.metric.sessions": "Sessioner",
    "admin.metric.averageDuration": "Genomsnittlig varaktighet",
    "admin.metric.topReferrer": "Topp hänvisare",
    "admin.metric.topExitPage": "Topp utgångssida",
    "admin.google.title": "Google Connect",
    "admin.google.description": "Connect to Google to review Search Console sites and monitor keyword health.",
    "admin.google.status": "Google Status:",
    "admin.google.connect": "Connect with Google",
    "admin.google.connected": "Connected",
    "admin.google.disconnected": "Disconnected",
    "admin.google.pending": "Connecting…",
    "admin.google.error": "Unable to connect to Google.",
    "admin.google.missingClientId": "Google client ID is not configured.",
    "admin.google.invalidClientId": "Google client ID must be a valid OAuth client identifier ending with .apps.googleusercontent.com.",
    "admin.google.user": "Signed in as",
    "admin.google.sites.title": "Search Console Sites",
    "admin.google.noSites": "No Search Console sites found or authorized yet.",
    "admin.track.ownDescription": "Track your own target keywords and performance metrics in one place.",
  }
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "sv",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("sv");

  // Translation function
  const t = (key: string): string => {
    // @ts-ignore - We know these keys exist
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
