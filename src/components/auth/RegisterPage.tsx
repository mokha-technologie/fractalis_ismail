import React, { useState } from 'react';
import { User, Phone, Lock, Shield, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import OTPInput from './OTPInput';

interface RegisterPageProps {
  onNavigate: (screen: string) => void;
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    acceptConditions: false,
  });
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, verifyOTP, sendOTP } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.acceptConditions) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);
    try {
      await sendOTP(formData.telephone);
      setStep('otp');
    } catch (err) {
      setError('Erreur lors de l\'envoi du code. Veuillez réessayer.');
    }
    setLoading(false);
  };

  const handleOTPVerification = async (otp: string) => {
    setLoading(true);
    try {
      const otpValid = await verifyOTP(otp);
      if (otpValid) {
        const success = await register(formData);
        if (success) {
          onNavigate('dashboard');
        } else {
          setError('Erreur lors de la création du compte');
        }
      } else {
        setError('Code OTP incorrect');
      }
    } catch (err) {
      setError('Erreur de vérification. Veuillez réessayer.');
    }
    setLoading(false);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary-600">Vérification OTP</h1>
            <p className="text-secondary-600 mt-2 mb-4">
              Code envoyé au {formData.telephone}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 text-sm font-medium">
                🔧 Version de démonstration
              </p>
              <p className="text-blue-700 text-xs">
                Code de test: <strong>123456</strong>
              </p>
            </div>
          </div>

          <Card className="p-8">
            <OTPInput
              onComplete={handleOTPVerification}
              loading={loading}
              error={error}
              onResend={() => sendOTP(formData.telephone)}
            />
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setStep('form')}
                className="text-secondary-600 hover:text-secondary-700 text-sm transition-colors"
              >
                Retour au formulaire
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary-600">Créer un compte</h1>
          <p className="text-secondary-600 mt-2">Rejoignez FRACTALIS COURTAGE</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Nom"
                value={formData.nom}
                onChange={(value) => updateFormData('nom', value)}
                label="Nom"
                icon={<User className="h-5 w-5" />}
                required
              />
              <Input
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(value) => updateFormData('prenom', value)}
                label="Prénom"
                icon={<User className="h-5 w-5" />}
                required
              />
            </div>

            <Input
              type="tel"
              placeholder="+227 XX XX XX XX"
              value={formData.telephone}
              onChange={(value) => updateFormData('telephone', value)}
              label="Numéro de téléphone"
              icon={<Phone className="h-5 w-5" />}
              required
            />

            <Input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(value) => updateFormData('password', value)}
              label="Mot de passe"
              icon={<Lock className="h-5 w-5" />}
              required
            />

            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={(value) => updateFormData('confirmPassword', value)}
              label="Confirmer le mot de passe"
              icon={<Lock className="h-5 w-5" />}
              required
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  checked={formData.acceptConditions}
                  onChange={(e) => updateFormData('acceptConditions', e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  formData.acceptConditions 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'border-secondary-300 hover:border-primary-400'
                }`}>
                  {formData.acceptConditions && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-sm text-secondary-600">
                J'accepte les{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  conditions d'utilisation
                </a>
              </span>
            </label>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Créer mon compte
            </Button>

            <div className="text-center pt-4 border-t border-secondary-200">
              <p className="text-secondary-600 text-sm">
                Déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}