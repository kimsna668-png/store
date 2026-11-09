import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('navaseal_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('navaseal_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('navaseal_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('navaseal_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('navaseal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('navaseal_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Try backend API first
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data?.status === 'success') {
        const { token: receivedToken, user: receivedUser } = res.data.data;
        setToken(receivedToken);
        setUser(receivedUser);
        setLoading(false);
        return { success: true, user: receivedUser };
      }
    } catch (err) {
      // Mock fallback if running without backend connected
      if (email === 'admin@navaseal.site' && password === 'Admin123!') {
        const adminUser = {
          id: 'user-admin-1',
          email: 'admin@navaseal.site',
          fullName: 'Nava Seal Administrator',
          role: 'SUPER_ADMIN'
        };
        const mockToken = 'mock-jwt-admin-token-navaseal-store';
        setToken(mockToken);
        setUser(adminUser);
        setLoading(false);
        return { success: true, user: adminUser };
      }

      if (email === 'customer@navaseal.site' && password === 'Customer123!') {
        const customerUser = {
          id: 'user-customer-1',
          email: 'customer@navaseal.site',
          fullName: 'Sokha Visal (Customer)',
          role: 'CUSTOMER'
        };
        const mockToken = 'mock-jwt-customer-token-navaseal-store';
        setToken(mockToken);
        setUser(customerUser);
        setLoading(false);
        return { success: true, user: customerUser };
      }

      setLoading(false);
      const msg = err.response?.data?.message || 'Invalid email or password.';
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', userData);
      if (res.data?.status === 'success') {
        const { token: receivedToken, user: receivedUser } = res.data.data;
        setToken(receivedToken);
        setUser(receivedUser);
        setLoading(false);
        return { success: true, user: receivedUser };
      }
    } catch (err) {
      // Mock fallback
      const newUser = {
        id: `usr-${Date.now()}`,
        email: userData.email,
        fullName: userData.fullName,
        role: 'CUSTOMER'
      };
      const mockToken = `mock-token-${Date.now()}`;
      setToken(mockToken);
      setUser(newUser);
      setLoading(false);
      return { success: true, user: newUser };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch {}
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAdmin,
      isSuperAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

