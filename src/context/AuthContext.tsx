import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, login } from '../services/api';
import { toast } from '../lib/toast';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
      navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid username or password. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
