import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import Dashboard from './components/dashboard/Dashboard';
import CarInsurance from './components/insurance/CarInsurance';
import EducationInsurance from './components/insurance/EducationInsurance';
import ClaimsForm from './components/forms/ClaimsForm';
import ComplaintsForm from './components/forms/ComplaintsForm';
import ContactRedirect from './components/ContactRedirect';

type Screen = 'login' | 'register' | 'forgot-password' | 'dashboard' | 'car-insurance' | 'travel-insurance' | 'home-insurance' | 'education-insurance' | 'claims' | 'complaints';

function AppContent() {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>(user ? 'dashboard' : 'login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginPage onNavigate={setCurrentScreen} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentScreen} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />;
      case 'car-insurance':
        return <CarInsurance onNavigate={setCurrentScreen} />;
      case 'education-insurance':
        return <EducationInsurance onNavigate={setCurrentScreen} />;
      case 'travel-insurance':
      case 'home-insurance':
        return <ContactRedirect 
          type={currentScreen === 'travel-insurance' ? 'voyage' : 'habitation'} 
          onNavigate={setCurrentScreen} 
        />;
      case 'claims':
        return <ClaimsForm onNavigate={setCurrentScreen} />;
      case 'complaints':
        return <ComplaintsForm onNavigate={setCurrentScreen} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {renderScreen()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;