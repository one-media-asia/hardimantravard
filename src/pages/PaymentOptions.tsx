import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const PaymentOptions = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Hardiman.se - ${t('payment.title')}`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-20">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-10 text-center">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {t('payment.badge')}
              </span>
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">{t('payment.title')}</h1>
              <p className="mt-3 max-w-3xl mx-auto text-base text-muted-foreground md:text-lg">
                {t('payment.description')}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <h2 className="text-xl font-semibold mb-4">{t('payment.paypal.title')}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t('payment.paypal.description')}</p>
                <p className="font-medium">{t('payment.paypal.accountLabel')}</p>
                <p className="mb-4">paypal.me/hardimantravard</p>
                <a
                  href="https://www.paypal.com/paypalme/hardimantravard"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary" size="lg">{t('payment.paypal.button')}</Button>
                </a>
              </div>

              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <h2 className="text-xl font-semibold mb-4">{t('payment.revolut.title')}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t('payment.revolut.description')}</p>
                <p className="font-medium">{t('payment.revolut.accountLabel')}</p>
                <p className="mb-4">+46 73 370 50 58</p>
                <p className="font-medium">{t('payment.revolut.ownerLabel')}</p>
                <p className="mb-4">Hardiman Trädvård</p>
              </div>

              <div className="rounded-3xl border border-border bg-background/50 p-6">
                <h2 className="text-xl font-semibold mb-4">{t('payment.bank.title')}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t('payment.bank.description')}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('payment.bank.accountName')}</p>
                    <p>Hardiman Trädvård</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('payment.bank.iban')}</p>
                    <p>SE55 5000 0000 0543 1234 5678</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('payment.bank.bic')}</p>
                    <p>SWEDSESS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-border bg-background/70 p-6">
              <h2 className="text-xl font-semibold mb-3">{t('payment.noteTitle')}</h2>
              <p className="text-sm text-muted-foreground">{t('payment.noteDescription')}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentOptions;
