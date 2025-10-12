// File: /src/context/AuthContext.tsx

import  { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the context data
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Set the token for all future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the custom useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};