import React, { useEffect, useReducer, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/create/CartContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import RatingComponent from '../RatingComponent/RatingComponent';
import { useFavorites } from '../../context/Favorites/FavoritesContext';
import { useUser } from '../../context/user/UserContext'; // ✅ استيراد حالة المستخدم
import { toast } from 'react-toastify';
import ShareButtons from '../ShareButtons/ShareButtons';
import './ProductDetails.css';

// تعريف reducer لإدارة الحالة
const initialState = {
  loading: true,
  error: null,
  product: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
}

// مكون لعرض الرسائل عند حدوث خطأ
const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, product } = state;

  const { addToCart } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { user } = useUser(); // ✅ الحصول على حالة تسجيل الدخول
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(t('productDetails.error'));
        }
        const data = await response.json();
        if (isMounted.current) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted.current) {
          dispatch({ type: 'FETCH_ERROR', payload: err.message });
        }
      }
    };

    if (id) {
      fetchProduct();
    }

    return () => {
      controller.abort();
      isMounted.current = false;
    };
  }, [id, t]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product);
    }
  }, [addToCart, product]);

  const isFavorite = useMemo(() => {
    return product ? favorites.some(fav => fav.id === product.id) : false;
  }, [favorites, product]);

  const toggleFavorite = useCallback(() => {
    if (!user) { // ✅ منع غير المسجلين
      toast.warning(t('favorites.loginRequired'));
      navigate("/login");
      return;
    }

    if (!product) return;
    if (isFavorite) {
      removeFavorite(product.id);
      toast.success(t('productDetails.removedFromFavorites'));
    } else {
      addFavorite(product);
      toast.success(t('productDetails.addedToFavorites'));
    }
  }, [user, isFavorite, product, addFavorite, removeFavorite, navigate, t]);

  if (loading) {
    return <div className="loading-indicator">{t('productDetails.loading')}</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <div>{t('productDetails.notFound')}</div>;
  }

  const productUrl = window.location.href;

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="back-button" aria-label={t('productDetails.backButton')}>
        {t('productDetails.backButton')}
      </button>
      <div className="product-info-container">
        <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="product-price">
            {t('productDetails.price', { price: product.price })}
          </p>
          <RatingComponent productId={product.id} initialRating={product.rating?.rate} />
          <ShareButtons productUrl={productUrl} />
          <div className="actions">
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              {t('productDetails.addToCartButton')}
            </button><br/><br/>
            {/* ✅ زر المفضلة يظهر فقط إذا كان المستخدم مسجلاً */}
            {user && (
              <button onClick={toggleFavorite} className="favorite-btn">
                {isFavorite
                  ? <>
                      <FaHeart /> {t('productDetails.removeFromFavorites')}
                    </>
                  : <>
                      <FaRegHeart /> {t('productDetails.addToFavorites')}
                    </>
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
