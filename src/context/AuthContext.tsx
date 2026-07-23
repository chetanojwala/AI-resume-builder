import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';
import { storageService } from '../services/storageService';

interface AuthContextType extends AuthState {
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, targetRole?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = storageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    } else {
      // Create a default logged-in demo user for frictionless experience
      const demoUser: User = {
        id: 'user-demo-123',
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        targetRole: 'Senior Software Engineer',
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      storageService.saveUser(demoUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0] || 'User',
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    storageService.saveUser(newUser);
  };

  const signup = (name: string, email: string, targetRole?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      targetRole,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    storageService.saveUser(newUser);
  };

  const logout = () => {
    setUser(null);
    storageService.removeUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
