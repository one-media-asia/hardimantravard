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
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [payDepositNow, setPayDepositNow] = useState(false);

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
      preferredDate: bookingDate,
      message: bookingMessage.trim(),
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
      name: bookingName.trim(),
      location: bookingLocation.trim(),
      preferredDate: bookingDate,
    });

    const subjectText = `${t('contact.booking.emailSubjectPrefix')} ${bookingName.trim()} - ${bookingDate}`;
    const bodyLines = [
      `New booking request from ${bookingName.trim()}`,
      `----------------------------------------`,
      `${t('contact.booking.emailEmail')}: ${bookingEmail.trim()}`,
      `${t('contact.booking.emailPhone')}: ${bookingPhone.trim()}`,
      `${t('contact.booking.emailLocation')}: ${bookingLocation.trim()}`,
      `${t('contact.booking.emailDate')}: ${bookingDate}`,
      '',
      `${t('contact.booking.emailMessage')}:`,
      bookingMessage.trim() || 'No message provided',
      '',
      `----------------------------------------`,
      `Please respond to this request as soon as possible.`,
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
              date: bookingDate,
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
    setBookingDate('');
    setBookingMessage('');
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
              <label className="block text-sm font-medium col-span-2">
                {t('contact.booking.message')}
                <Textarea
                  value={bookingMessage}
                  onChange={(event) => setBookingMessage(event.target.value)}
                  placeholder={t('contact.booking.messagePlaceholder')}
                />
              </label>
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={payDepositNow}
                    onChange={(e) => setPayDepositNow(e.target.checked)}
                    className="rounded"
                  />
                  <span>{t('contact.booking.payDepositOpt')}</span>
                </label>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <Button type="submit" className="w-full md:w-auto">
                    {t('contact.booking.button')}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      // Build payment URL with basic query params
                      const params = new URLSearchParams();
                      if (bookingName) params.set('name', bookingName);
                      if (bookingEmail) params.set('email', bookingEmail);
                      if (bookingDate) params.set('date', bookingDate);
                      if (bookingLocation) params.set('location', bookingLocation);
                      const url = `/payment?${params.toString()}`;
                      if (payDepositNow) window.open(url, '_blank');
                      else {
                        // If checkbox not checked, toggle it to true and open
                        setPayDepositNow(true);
                        window.open(url, '_blank');
                      }
                    }}
                    className="w-full md:w-auto"
                  >
                    {t('contact.booking.payDeposit')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
