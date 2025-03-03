import React, { useMemo, useCallback } from "react";
import { useFavorites } from "../context/Favorites/FavoritesContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites, removeFavorite } = useFavorites();

  // دالة لإزالة المنتج مع التأكيد باستخدام toast
  const handleRemove = useCallback(
    (product) => {
      toast.warn(
        <div>
          <p>{t('favorites.confirmRemove', { name: product.title })}</p>
          <button 
            onClick={() => {
              removeFavorite(product.id);
              toast.dismiss();
              toast.success(t('favorites.removed', { name: product.title }));
            }} 
            className="confirm-remove-btn"
            aria-label={t('a11y.confirmRemove')}
          >
            {t('common.confirm')}
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        }
      );
    },
    [removeFavorite, t]
  );

  // قائمة المفضلة
  const favoriteList = useMemo(() => {
    if (!favorites || favorites.length === 0) {
      return (
        <div className="empty-state">
          <p className="no-favorites">{t('favorites.empty')}</p>
        </div>
      );
    }

    return (
      <ul className="favorites-list" aria-label={t('a11y.favoritesList')}>
        {favorites.map((product) => (
          <li key={product.id} className="favorite-item" data-testid="favorite-item">
            <div className="favorite-product-info">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={t('a11y.productImage', { name: product.title })} 
                  className="favorite-product-image"
                />
              )}
              <div className="favorite-product-details">
                <h3>{product.title}</h3>
                {product.price && (
                  <p className="favorite-price">
                    {t('common.price', { value: product.price })}
                  </p>
                )}
                {product.description && (
                  <p className="favorite-description">{product.description}</p>
                )}
                {product.category && (
                  <p className="favorite-category">
                    <strong>{t('common.category')}:</strong> {product.category}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => handleRemove(product)}
              className="favorite-remove-button"
              aria-label={t('a11y.removeFavorite', { name: product.title })}
              data-testid="remove-button"
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">{t('common.remove')}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }, [favorites, handleRemove, t]);

  return (
    <main className="favorites-page container">
      <header className="favorite-page-header">
        <h1 className="favorite-page-title">{t('favorites.title')}</h1>
      </header>
      
      <section className="favorites-content">
        {favoriteList}
      </section>
    </main>
  );
};

export default FavoritesPage;
