import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

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
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getAuthenticadUser() {
      const response = await api.get('/account');

      setUser(response.data);
    }

    getAuthenticadUser();
  }, []);

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
    setUser({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signed: !!accessToken, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
