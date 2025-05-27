import { createContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/token';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (getToken()) setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
