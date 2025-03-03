import React from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t('home.searchPlaceholder')}
        value={value || ''}  // التأكد من أن القيمة لا تكون undefined أو null
        onChange={(e) => onChange(e.target.value)}  // التعامل مع القيم بشكل صحيح
        aria-label={t('home.searchPlaceholder')}
      />
    </div>
  );
};

export default SearchBar;
