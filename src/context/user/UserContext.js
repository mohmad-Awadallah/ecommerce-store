import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// إنشاء السياق مع القيم الافتراضية
export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  error: null,
});

// مكون Provider لإدارة البيانات
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // استخدام useEffect لجلب بيانات المستخدم من LocalStorage أو من API عند بداية التشغيل
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setError(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook لاستهلاك السياق في مكونات أخرى
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
