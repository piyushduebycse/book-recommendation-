import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { LanguageContext, type Language } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className="text-sm"
    >
      {language === 'en' ? 'हिंदी' : 'English'}
    </Button>
  );
}
