import React from 'react';
import { useTranslation } from 'react-i18next';

const CategoryFilter = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="category-filter" style={{ marginBottom: '20px' }}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{t('home.allCategories')}</option>
        <option value="electronics">{t('home.electronics')}</option>
        <option value="jewelery">{t('home.jewelery')}</option>
        <option value="men's clothing">{t('home.mensClothing')}</option>
        <option value="women's clothing">{t('home.womensClothing')}</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
