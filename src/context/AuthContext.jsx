import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulación de llamada a API
      if (email === 'admin@example.com' && password === 'password') {
        const userData = {
          id: 1,
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        const token = 'mock-jwt-token';
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Inicio de sesión exitoso');
        return { success: true };
      } else if (email && password) {
        const userData = {
          id: 2,
          name: 'Usuario',
          email: email,
          role: 'user'
        };
        
        const token = 'mock-jwt-token-user';
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Inicio de sesión exitoso');
        return { success: true };
      } else {
        toast.error('Credenciales inválidas');
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast.info('Sesión cerrada');
  };

  const register = async (name, email, password) => {
    try {
      // Simulación de registro
      const userData = {
        id: Date.now(),
        name,
        email,
        role: 'user'
      };
      
      const token = 'mock-jwt-token-new-user';
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success('Registro exitoso');
      return { success: true };
    } catch (error) {
      toast.error('Error al registrarse');
      return { success: false, error: 'Error al registrarse' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};