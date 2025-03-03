import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const defaultLightTheme = {
  mode: 'light',
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#212529',
    border: '#dee2e6'
  }
};

const defaultDarkTheme = {
  mode: 'dark',
  colors: {
    primary: '#0d6efd',
    secondary: '#5a6268',
    background: '#1a1a1a',
    text: '#f8f9fa',
    border: '#2d2d2d'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme 
      ? JSON.parse(savedTheme)
      : defaultLightTheme;
  });

  const updateCSSVariables = useCallback((theme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--background-color', theme.colors.background);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--border-color', theme.colors.border);
    root.setAttribute('data-theme', theme.mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev.mode === 'light' 
        ? defaultDarkTheme 
        : defaultLightTheme;
      localStorage.setItem('theme', JSON.stringify(newTheme));
      updateCSSVariables(newTheme);
      return newTheme;
    });
  }, [updateCSSVariables]);

  useEffect(() => {
    updateCSSVariables(theme);
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme, updateCSSVariables]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};