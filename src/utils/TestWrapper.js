import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';
import { ThemeProvider } from '../context/Theme/ThemeContext';
import { jest } from '@jest/globals';

const TestWrapper = ({ children }) => {
  const mockUser = {
    name: 'Test User',
    email: 'test@email.com',
    isAuthenticated: true,
    // أي خصائص إضافية تحتاجها
  };

  return (
    <MemoryRouter>
      <ThemeProvider>
        <UserContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
          {children}
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

export default TestWrapper;
