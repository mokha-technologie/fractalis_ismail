import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';

interface OTPInputProps {
  onComplete: (otp: string) => void;
  loading?: boolean;
  error?: string;
  onResend?: () => void;
}

export default function OTPInput({ onComplete, loading = false, error, onResend }: OTPInputProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all fields are filled
      if (newOtp.every(digit => digit) && newOtp.join('').length === 6) {
        onComplete(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (onResend) {
      onResend();
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-secondary-800 mb-2">
          Entrez le code de vérification
        </h3>
        <p className="text-secondary-600 text-sm mb-2">
          Un code à 6 chiffres a été envoyé à votre numéro
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm font-medium">
            🔧 Mode Démonstration
          </p>
          <p className="text-blue-700 text-xs">
            Utilisez le code: <strong>123456</strong>
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-secondary-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200 transition-all"
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      <div className="text-center space-y-4">
        <div className="text-sm text-secondary-600">
          Code incorrect ? {' '}
          {resendTimer > 0 ? (
            <span>Renvoyer dans {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Renvoyer le code
            </button>
          )}
        </div>

        <Button
          onClick={() => onComplete(otp.join(''))}
          disabled={otp.some(digit => !digit)}
          loading={loading}
          className="w-full"
        >
          Vérifier le code
        </Button>
      </div>
    </div>
  );
}