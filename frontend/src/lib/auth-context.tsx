'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, fetchMe } from '@/lib/api';

interface User {
  id: number;
  phone: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (phone: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, token: null, login: async () => {}, register: async () => {}, logout: () => {}, isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('kaoyan_token');
    if (saved) {
      setToken(saved);
      fetchMe(saved).then((u) => {
        if (u) setUser(u);
        else localStorage.removeItem('kaoyan_token');
        setIsLoading(false);
      }).catch(() => {
        localStorage.removeItem('kaoyan_token');
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    const data = await apiLogin(phone, password);
    localStorage.setItem('kaoyan_token', data.access_token);
    setToken(data.access_token);
    const u = await fetchMe(data.access_token);
    if (u) setUser(u);
  }, []);

  const register = useCallback(async (phone: string, password: string, name: string) => {
    const data = await apiRegister(phone, password, name);
    localStorage.setItem('kaoyan_token', data.access_token);
    setToken(data.access_token);
    const u = await fetchMe(data.access_token);
    if (u) setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('kaoyan_token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
