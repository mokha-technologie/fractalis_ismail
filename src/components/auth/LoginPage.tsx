import React, { useState } from 'react';
import { Phone, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface LoginPageProps {
  onNavigate: (screen: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(telephone, password);
      if (success) {
        onNavigate('dashboard');
      } else {
        setError('Numéro de téléphone ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo & Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary-600">FRACTALIS</h1>
          <p className="text-secondary-500 mt-2">Plateforme d'Assurance</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-800">Connexion</h2>
              <p className="text-secondary-600 mt-2">Accédez à votre espace personnel</p>
            </div>

            <Input
              type="tel"
              placeholder="+225 XX XX XX XX XX"
              value={telephone}
              onChange={setTelephone}
              label="Numéro de téléphone"
              icon={<Phone className="h-5 w-5" />}
              required
            />

            <Input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={setPassword}
              label="Mot de passe"
              icon={<Lock className="h-5 w-5" />}
              required
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-blue-800 text-sm font-medium mb-2">
                🔧 Comptes de démonstration
              </p>
              <p className="text-blue-700 text-xs">
                Utilisez n'importe quel numéro de téléphone et mot de passe pour tester
              </p>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Se connecter
            </Button>

            <div className="text-center space-y-4">
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                Mot de passe oublié ?
              </button>
              
              <div className="pt-4 border-t border-secondary-200">
                <p className="text-secondary-600 text-sm">
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Créer un compte
                  </button>
                </p>
              </div>
            </div>
          </form>
        </Card>

        <div className="text-center">
          <p className="text-xs text-secondary-400">
            © 2025 FRACTALIS COURTAGE. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}