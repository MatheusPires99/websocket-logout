import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem('@Websocket-logout:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return token;
    }

    return '';
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('@Websocket-logout:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAccessToken({
      token,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Websocket-logout:token');

    setAccessToken('');
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!accessToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
