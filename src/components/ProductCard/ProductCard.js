// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { t } = useTranslation(); // استخدام الترجمة

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info"> 
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">{product.price} {t('currency.shekel')}</p> {/* ترجمة العملة */}
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProductCard);
