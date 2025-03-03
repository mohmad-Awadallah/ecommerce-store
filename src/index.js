import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // ✅ يجب أن يكون في الأعلى
import App from './App';
import { ThemeProvider } from './context/Theme/ThemeContext';
import { UserProvider } from './context/user/UserContext';
import { NotificationProvider } from './context/Notification/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router> {/* ✅ يجب أن يكون BrowserRouter في أعلى مستوى */}
      <ThemeProvider>
        <UserProvider>
          <NotificationProvider> {/* ✅ يوضع هنا بعد الراوتر */}
            <App />
          </NotificationProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);