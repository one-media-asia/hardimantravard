
import { useRef, useEffect, useState, type FormEvent } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { event } from '@/lib/analytics';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  // Animation on scroll
  useEffect(() => {
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
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Contact info items
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('contact.email'),
      details: "info@hardiman.se",
      link: "mailto:info@hardiman.se",
      type: 'email'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('contact.phone'),
      details: "0733-705058",
      link: "tel:+46733705058",
      type: 'phone'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('contact.location'),
      details: "Kungsbacka, Göteborg, Sverige",
      link: "https://maps.google.com/?q=Kungsbacka,Göteborg,Sweden",
      type: 'location'
    }
  ];

  const hours = [
    { day: t('contact.monday'), hours: "9:00 - 17:00" },
    { day: t('contact.saturday'), hours: t('contact.byagreement') },
    { day: t('contact.sunday'), hours: t('contact.closed') }
  ];

  const bookingServices = [
    "Tree Pruning",
    "Tree Removal",
    "Tree Health Assessment",
    "Site Visit",
    "Other"
  ];

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bookingName.trim() || !bookingEmail.trim() || !bookingPhone.trim() || !bookingDate.trim()) {
      toast({
        title: t('contact.booking.errorTitle'),
        description: t('contact.booking.errorFields'),
        variant: 'destructive',
      });
      return;
    }

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(window.localStorage.getItem('hardiman-bookings') || '[]');
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
      window.localStorage.setItem('hardiman-bookings', JSON.stringify([booking, ...existing].slice(0, 50)));
    }

    event('booking_form_submit', {
      name: bookingName,
      location: bookingLocation,
    });

    toast({
      title: t('contact.booking.successTitle'),
      description: t('contact.booking.successDescription'),
    });

    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingService('Tree Pruning');
    setBookingDate('');
    setBookingMessage('');
    setBookingDeposit('1000');
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <Badge variant="outline" className="mb-4 font-medium px-4 py-1">
            {t('contact.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        
        {/* Contact information cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
          {contactInfo.map((item, index) => (
            <a 
              key={index} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => event('contact_link_click', { linkType: item.type, label: item.title, url: item.link })}
              className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-4 mb-4 bg-primary/10 rounded-full text-primary">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.details}</p>
            </a>
          ))}
        </div>
        
        {/* Booking form */}
        <div className="max-w-5xl mx-auto mt-16 p-6 bg-background rounded-2xl shadow-sm reveal">
          <div className="mb-8 text-center">
            <h3 className="font-semibold text-2xl mb-2">{t('contact.booking.title')}</h3>
            <p className="text-muted-foreground">{t('contact.booking.description')}</p>
          </div>
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
                    <option key={service} value={service}>{service}</option>
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

        {/* Working hours */}
        <div className="max-w-md mx-auto mt-16 p-6 bg-background rounded-2xl shadow-sm reveal">
          <h3 className="font-semibold text-xl mb-4 text-center">{t('contact.hours')}</h3>
          <div className="space-y-3 text-muted-foreground">
            {hours.map((item, index) => (
              <p key={index} className="flex justify-between">
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
