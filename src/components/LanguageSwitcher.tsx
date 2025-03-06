
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: "sv",
    name: "Svenska",
    flag: "swedish",
  },
  {
    code: "en",
    name: "English",
    flag: "english",
  },
];

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    console.log(`Switched to language: ${langCode}`);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="icon"
          className={cn(
            "p-1 h-8 w-8 rounded-sm",
            language === lang.code
              ? "bg-primary/10 text-primary"
              : "hover:bg-muted"
          )}
          onClick={() => handleLanguageChange(lang.code)}
          aria-label={`Switch to ${lang.name}`}
          title={lang.name}
        >
          <span className="text-lg">{lang.flag}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
