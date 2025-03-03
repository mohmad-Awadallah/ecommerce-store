import React, { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';
import { useUser } from '../../context/user/UserContext'; // استخدم السياق لتتبع حالة المستخدم
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

const Cart = ({ cartItems = [], onRemoveItem, onClearCart, onUpdateQuantity, onCheckout }) => {
  const { t } = useTranslation(); // استخدام الترجمة
  const navigate = useNavigate();
  const { user } = useUser(); // الحصول على حالة المستخدم من السياق
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    // حفظ السلة في localStorage عندما تتغير
    setItems(cartItems);
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('❌ خطأ في حفظ السلة:', error);
    }
  }, [cartItems]);

  // استعادة السلة من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = useCallback((id) => {
    toast.warn(
      <div>
        <p>❌ {t('removeItemConfirmation')}</p>
        <div className="toast-buttons">
          <button onClick={() => { 
            onRemoveItem(id); 
            toast.dismiss(); 
            toast.success(t('itemRemoved')); 
          }}>✔ {t('yes')}</button>
          <button onClick={() => toast.dismiss()}>✖ {t('no')}</button>
        </div>
      </div>,
      { autoClose: 5000, closeButton: true }
    );
  }, [onRemoveItem, t]);

  const handleClearCart = useCallback(() => {
    toast.warn(
      <div>
        <p>🛒 {t('clearCartConfirmation')}</p>
        <div className="toast-buttons">
          <button onClick={() => { 
            onClearCart(); 
            toast.dismiss(); 
            toast.success(t('cartCleared')); 
          }}>✔ {t('yes')}</button>
          <button onClick={() => toast.dismiss()}>✖ {t('no')}</button>
        </div>
      </div>,
      { autoClose: 5000, closeButton: true }
    );
  }, [onClearCart, t]);

  const handleUpdateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      toast.error(t('quantityError'));
      return;
    }
    onUpdateQuantity(id, quantity);
    toast.success(t('quantityUpdated'));
  }, [onUpdateQuantity, t]);

  const handleCheckout = useCallback(() => {
    if (!user) {
      toast.error(
        <>
          🚨 {t('loginRequired')}
          <br />
          <button onClick={() => navigate('/register')} className="toast-signup-btn">
            {t('registerNow')}
          </button>
        </>
      );
      return;
    }

    if (items.length === 0) {
      toast.error(t('emptyCart'));
      return;
    }

    toast.success(t('purchaseSuccess'), { autoClose: 2000 });

    setTimeout(() => {
      onCheckout(items);
      onClearCart();
      navigate('/checkout');
    }, 2000);
  }, [onCheckout, items, onClearCart, navigate, user, t]);

  return (
    <div className="cart">
      <h2>🛒 {t('cart.cart')}</h2>
      {items.length === 0 ? (
        <div>
          <p className="empty-cart">{t('emptyCartMessage')}</p>
          <p>{t('browseProducts')} <a href="/">{t('here')}</a> {t('toAddProducts')}</p>
        </div>
      ) : (
        <>
          <ul className="cart-items-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image || '/default-image.png'} alt={item.title} className="item-image" />
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">{item.price} {t('currency')}</span>
                  <div className="quantity-controls">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>❌ {t('remove')}</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>💰 {t('total')}: {totalPrice.toFixed(2)} {t('currency.shekel')}</h3>
            <button className="clear-cart" onClick={handleClearCart}>{t('clearCart')}</button>
            <button className="checkout-btn" onClick={handleCheckout}>{t('checkout.title')}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Cart);
