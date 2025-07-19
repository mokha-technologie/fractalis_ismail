import React, { useState } from 'react';
import { Phone, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import OTPInput from './OTPInput';

interface ForgotPasswordPageProps {
  onNavigate: (screen: string) => void;
}

export default function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'reset'>('phone');
  const [telephone, setTelephone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { sendOTP, verifyOTP, resetPassword } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendOTP(telephone);
      setStep('otp');
    } catch (err) {
      setError('Erreur lors de l\'envoi du code. Veuillez réessayer.');
    }
    setLoading(false);
  };

  const handleOTPVerification = async (otpCode: string) => {
    setOtp(otpCode);
    setLoading(true);
    try {
      const valid = await verifyOTP(otpCode);
      if (valid) {
        setStep('reset');
      } else {
        setError('Code OTP incorrect');
      }
    } catch (err) {
      setError('Erreur de vérification. Veuillez réessayer.');
    }
    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const success = await resetPassword(telephone, newPassword, otp);
      if (success) {
        onNavigate('login');
      } else {
        setError('Erreur lors de la réinitialisation du mot de passe');
      }
    } catch (err) {
      setError('Erreur de réinitialisation. Veuillez réessayer.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary-600">
            {step === 'phone' && 'Mot de passe oublié'}
            {step === 'otp' && 'Vérification'}
            {step === 'reset' && 'Nouveau mot de passe'}
          </h1>
          <p className="text-secondary-600 mt-2">
            {step === 'phone' && 'Entrez votre numéro de téléphone'}
            {step === 'otp' && `Code envoyé au ${telephone}`}
            {step === 'reset' && 'Définissez votre nouveau mot de passe'}
          </p>
        </div>

        <Card className="p-8">
          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <Input
                type="tel"
                placeholder="+225 XX XX XX XX XX"
                value={telephone}
                onChange={setTelephone}
                label="Numéro de téléphone"
                icon={<Phone className="h-5 w-5" />}
                required
              />

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
                Envoyer le code
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-secondary-600 hover:text-secondary-700 text-sm transition-colors"
                >
                  Retour à la connexion
                </button>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm font-medium mb-1">
                  🔧 Mode Démonstration
                </p>
                <p className="text-blue-700 text-xs">
                  Utilisez le code de test: <strong>123456</strong>
                </p>
              </div>
            <OTPInput
              onComplete={handleOTPVerification}
              loading={loading}
              error={error}
              onResend={() => sendOTP(telephone)}
            />
            </div>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <Input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={setNewPassword}
                label="Nouveau mot de passe"
                icon={<Lock className="h-5 w-5" />}
                required
              />

              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={setConfirmPassword}
                label="Confirmer le mot de passe"
                icon={<Lock className="h-5 w-5" />}
                required
              />

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
                Réinitialiser le mot de passe
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}