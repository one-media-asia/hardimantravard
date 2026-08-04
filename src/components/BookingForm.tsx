import { useEffect, useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { event as analyticsEvent } from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';

const BookingForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingLocation, setBookingLocation] = useState('');
  const [bookingService, setBookingService] = useState('Tree Pruning');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingDeposit, setBookingDeposit] = useState('1000');

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
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

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const bookingServices = [
    'Tree Pruning',
    'Tree Removal',
    'Tree Health Assessment',
    'Site Visit',
    'Other',
  ];

  const handleBookingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingName.trim() || !bookingEmail.trim() || !bookingPhone.trim() || !bookingDate.trim()) {
      toast({
        title: t('contact.booking.errorTitle'),
        description: t('contact.booking.errorFields'),
        variant: 'destructive',
      });
      return;
    }

    const booking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: bookingName.trim(),
      email: bookingEmail.trim(),
      phone: bookingPhone.trim(),
      location: bookingLocation.trim(),
      service: bookingService,
      preferredDate: bookingDate,
      message: bookingMessage.trim(),
      deposit: bookingDeposit,
      createdAt: new Date().toISOString(),
    };

    // First, try server-side secured endpoint (recommended)
    try {
      const resp = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (!resp.ok) throw new Error('server-endpoint-failed');
    } catch (err) {
      // If server endpoint fails, fall back to direct Supabase client or localStorage
      const hasSupabase = Boolean((import.meta.env as any).VITE_SUPABASE_URL && (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY);
      if (hasSupabase) {
        try {
          const { error } = await supabase.from('bookings').insert([booking]);
          if (error) throw error;
        } catch (e) {
          if (typeof window !== 'undefined') {
            const existing = JSON.parse(window.localStorage.getItem('hardiman-bookings') || '[]');
            window.localStorage.setItem('hardiman-bookings', JSON.stringify([booking, ...existing].slice(0, 50)));
          }
        }
      } else {
        if (typeof window !== 'undefined') {
          const existing = JSON.parse(window.localStorage.getItem('hardiman-bookings') || '[]');
          window.localStorage.setItem('hardiman-bookings', JSON.stringify([booking, ...existing].slice(0, 50)));
        }
      }
    }

    analyticsEvent('booking_form_submit', {
      name: bookingName,
      location: bookingLocation,
    });

    const subjectText = `${t('contact.booking.emailSubjectPrefix')} ${bookingName.trim()} - ${bookingDate}`;
    const bodyLines = [
      `${t('contact.booking.emailBodyLabel')}: ${bookingName.trim()}`,
      `${t('contact.booking.emailBodyEmail')}: ${bookingEmail.trim()}`,
      `${t('contact.booking.emailBodyPhone')}: ${bookingPhone.trim()}`,
      `${t('contact.booking.emailBodyLocation')}: ${bookingLocation.trim()}`,
      `${t('contact.booking.emailBodyService')}: ${bookingService}`,
      `${t('contact.booking.emailBodyDate')}: ${bookingDate}`,
      `${t('contact.booking.emailBodyDeposit')}: ${bookingDeposit} SEK`,
      '',
      `${t('contact.booking.emailBodyMessage')}:`,
      bookingMessage.trim(),
    ];

    const web3formsKey = (import.meta.env as any).VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

    if (web3formsKey) {
      try {
        const resp = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: subjectText,
            name: bookingName.trim(),
            email: bookingEmail.trim(),
            message: bodyLines.join('\n'),
            data: {
              phone: bookingPhone.trim(),
              location: bookingLocation.trim(),
              service: bookingService,
              date: bookingDate,
              deposit: bookingDeposit,
            },
          }),
        });
        const json = await resp.json();
        if (json.success) {
          toast({
            title: t('contact.booking.successTitle'),
            description: t('contact.booking.successDescription'),
          });
        } else {
          throw new Error(json.message || 'web3forms_error');
        }
      } catch (err) {
        toast({
          title: t('contact.booking.web3formsErrorTitle'),
          description: t('contact.booking.web3formsErrorDescription'),
          variant: 'destructive',
        });
        try {
          const subject = encodeURIComponent(subjectText);
          const body = encodeURIComponent(bodyLines.join('\n'));
          const mailto = `mailto:info@hardiman.se?subject=${subject}&body=${body}`;
          window.location.href = mailto;
        } catch (e) {
          // ignore
        }
      }
    } else {
      try {
        const subject = encodeURIComponent(subjectText);
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:info@hardiman.se?subject=${subject}&body=${body}`;
        window.location.href = mailto;
      } catch (e) {
        // ignore
      }
      toast({
        title: t('contact.booking.successTitle'),
        description: t('contact.booking.successDescription'),
      });
    }

    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingLocation('');
    setBookingService('Tree Pruning');
    setBookingDate('');
    setBookingMessage('');
    setBookingDeposit('1000');
  };

  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
            {t('contact.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {t('contact.booking.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.booking.description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto p-6 bg-background rounded-2xl shadow-sm reveal">
          <form onSubmit={handleBookingSubmit} className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium">
                {t('contact.booking.name')}
                <Input
                  value={bookingName}
                  onChange={(event) => setBookingName(event.target.value)}
                  placeholder={t('contact.booking.namePlaceholder')}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                {t('contact.booking.email')}
                <Input
                  type="email"
                  value={bookingEmail}
                  onChange={(event) => setBookingEmail(event.target.value)}
                  placeholder={t('contact.booking.emailPlaceholder')}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                {t('contact.booking.phone')}
                <Input
                  value={bookingPhone}
                  onChange={(event) => setBookingPhone(event.target.value)}
                  placeholder={t('contact.booking.phonePlaceholder')}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                {t('contact.booking.location')}
                <Input
                  value={bookingLocation}
                  onChange={(event) => setBookingLocation(event.target.value)}
                  placeholder={t('contact.booking.locationPlaceholder')}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                {t('contact.booking.service')}
                <select
                  value={bookingService}
                  onChange={(event) => setBookingService(event.target.value)}
                  className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {bookingServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">
                {t('contact.booking.preferredDate')}
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(event) => setBookingDate(event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                {t('contact.booking.deposit')}
                <select
                  value={bookingDeposit}
                  onChange={(event) => setBookingDeposit(event.target.value)}
                  className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="1000">1 000 SEK</option>
                  <option value="2000">2 000 SEK</option>
                  <option value="3000">3 000 SEK</option>
                </select>
              </label>
              <label className="block text-sm font-medium col-span-2">
                {t('contact.booking.message')}
                <Textarea
                  value={bookingMessage}
                  onChange={(event) => setBookingMessage(event.target.value)}
                  placeholder={t('contact.booking.messagePlaceholder')}
                />
              </label>
              <Button type="submit" className="w-full md:w-auto">
                {t('contact.booking.button')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
