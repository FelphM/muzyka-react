import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/User.ts'; // Import global User type
import { login as apiLogin } from '../services/api'; // Import login function from api service

interface IAuthContext {
  user: User | null;
  token: string | null; // Add token to context
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  // Effect to keep localStorage in sync with state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      // apiLogin now returns an object with user and token
      const { user: authenticatedUser, token: jwtToken } = await apiLogin({ email, password });
      setUser(authenticatedUser);
      setToken(jwtToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to be caught by the calling component
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, logout }; // Include token in context value

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};