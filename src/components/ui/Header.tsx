import React from 'react';
import { ArrowLeft, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showProfile?: boolean;
}

export default function Header({ title, onBack, showProfile = true }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg border-b border-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-secondary-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-secondary-600" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-primary-600">{title}</h1>
              <p className="text-sm text-secondary-500">FRACTALIS COURTAGE</p>
            </div>
          </div>
          
          {showProfile && user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-secondary-700">
                  {user.prenom} {user.nom}
                </p>
                <p className="text-xs text-secondary-500">{user.telephone}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-red-100 rounded-xl transition-colors group"
                  title="Déconnexion"
                >
                  <LogOut className="h-5 w-5 text-secondary-600 group-hover:text-red-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}