import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const Booking = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Hardiman.se - ${t('contact.booking.title')}`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
