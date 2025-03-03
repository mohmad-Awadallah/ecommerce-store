import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { SunIcon, MoonIcon } from './ThemeIcons'; // تأكد من استيراد الأيقونات
import './ThemeToggle.css'; // تأكد من استيراد ملف الأنماط

// تعريف المكون
const ThemeToggle = ({ theme, toggleTheme, className = '' }) => {
  const { t } = useTranslation();
  const toggleRef = useRef(null);

  // منع إنشاء دالة جديدة في كل مرة باستخدام useCallback
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // منع السلوك الافتراضي (مثل التمرير عند الضغط على Space)
      toggleTheme();
    }
  }, [toggleTheme]);

  useEffect(() => {
    const toggle = toggleRef.current;
    toggle.addEventListener('keydown', handleKeyDown);

    return () => {
      toggle.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <button
      ref={toggleRef}
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('activateDark') : t('activateLight')}
      aria-checked={theme === 'dark'}
      role="switch"
      data-theme={theme}
      tabIndex="0"
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {theme === 'light' ? (
            <SunIcon className="icon sun" />
          ) : (
            <MoonIcon className="icon moon" />
          )}
        </div>
      </div>
    </button>
  );
};

// تعريف PropTypes للمكون
ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
  className: PropTypes.string,
};

// تصدير المكون بشكل صحيح
export default ThemeToggle;
