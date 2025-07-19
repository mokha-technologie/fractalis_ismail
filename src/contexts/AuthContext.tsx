import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (telephone: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  sendOTP: (telephone: string) => Promise<boolean>;
  resetPassword: (telephone: string, newPassword: string, otp: string) => Promise<boolean>;
}

interface RegisterData {
  nom: string;
  prenom: string;
  telephone: string;
  password: string;
  acceptConditions: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('fractalis_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (telephone: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any phone/password combination
    if (telephone && password) {
      const mockUser: User = {
        id: '1',
        nom: 'KOUADIO',
        prenom: 'Jean',
        telephone: telephone,
      };
      
      setUser(mockUser);
      localStorage.setItem('fractalis_user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (userData.acceptConditions) {
      const newUser: User = {
        id: Date.now().toString(),
        nom: userData.nom,
        prenom: userData.prenom,
        telephone: userData.telephone,
      };
      
      setUser(newUser);
      localStorage.setItem('fractalis_user', JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fractalis_user');
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 800));
    return otp === '123456'; // For demo, accept 123456
  };

  const sendOTP = async (telephone: string): Promise<boolean> => {
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const resetPassword = async (telephone: string, newPassword: string, otp: string): Promise<boolean> => {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    return otp === '123456';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyOTP,
      sendOTP,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}