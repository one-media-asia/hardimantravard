import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { setAdminToken } from '@/lib/auth';

const AdminLogin = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password.trim() === '') {
      setError(t('admin.login.errorRequired'));
      return;
    }

    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password !== validPassword) {
      setError(t('admin.login.errorInvalid'));
      return;
    }

    setAdminToken('authenticated');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{t('admin.login.badge')}</p>
            <h1 className="mt-4 text-3xl font-semibold text-foreground">{t('admin.login.title')}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t('admin.login.subtitle')}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">{t('admin.login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t('admin.login.passwordPlaceholder')}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex items-center justify-between gap-3">
              <Button type="submit" className="w-full">{t('admin.login.submit')}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
