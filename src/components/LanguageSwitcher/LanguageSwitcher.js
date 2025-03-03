import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // تأكد من استيراد ملف الأنماط

const LanguageSwitcher = ({ changeLanguage, currentLanguage }) => {
  const { t } = useTranslation();

  // قائمة اللغات المدعومة مع تحديد اتجاه الكتابة
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'he', label: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  ];

  const handleLanguageChange = (langCode, langDir) => {
    changeLanguage(langCode);              // تغيير اللغة
    document.documentElement.dir = langDir;  // تغيير اتجاه النص بناءً على اللغة
  };

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code, lang.dir)}
          className={`language-button ${currentLanguage === lang.code ? 'active' : ''}`}
          aria-label={t('switchToLanguage', { language: lang.label })}
        >
          <span className="flag">{lang.flag}</span>
          <span className="label">{lang.label}</span>
        </button>
      ))}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

export default LanguageSwitcher;
