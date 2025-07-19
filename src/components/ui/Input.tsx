import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  icon,
  className = '',
}: InputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
            ${icon ? 'pl-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-secondary-200 focus:border-primary-500 focus:ring-primary-200'
            }
            focus:outline-none focus:ring-4
            ${disabled ? 'bg-secondary-50 cursor-not-allowed' : 'bg-white hover:border-secondary-300'}
          `}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
}