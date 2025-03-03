import React, { memo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useTranslation } from 'react-i18next'; // استيراد useTranslation
import './ProductList.css';

const ProductList = ({ products }) => {
  const { t } = useTranslation(); // استخدام الترجمة

  if (products.length === 0) {
    return <p>{t('productList.noProductsFound')}</p>; // استخدام الترجمة للنص
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default memo(ProductList);
