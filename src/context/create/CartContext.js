import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next'; // استيراد useTranslation

// إنشاء سياق سلة التسوق
const CartContext = createContext();

// Reducer لإدارة حالة سلة التسوق
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return state.some((item) => item.id === action.product.id)
        ? state.map((item) => item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state, { ...action.product, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map((item) => item.id === action.id ? { ...item, quantity: Math.max(1, action.quantity) } : item);
    default:
      return state;
  }
};

// موفر سياق السلة
export const CartProvider = ({ children }) => {
  const { t } = useTranslation(); // الحصول على دالة الترجمة
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      console.error('❌ خطأ في استرجاع السلة:', error);
      toast.error(t('cart.errorLoading'));
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة محليًا
    } catch (error) {
      console.error('❌ خطأ في حفظ السلة:', error);
      toast.error(t('cart.errorSaving'));
    }
  }, [cart, t]);

  const addToCart = useCallback((product) => {
    if (!product?.id || !product?.title || !product?.price) {
      toast.error(t('cart.invalidProduct'));
      return;
    }
    dispatch({ type: 'ADD_TO_CART', product });
    toast.success(`${t('cart.addedToCart')} ${product.title}`);
  }, [t]);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
    toast.success(t('cart.removedFromCart'));
  }, [t]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success(t('cart.clearedCart'));
  }, [t]);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    toast.success(t('cart.updatedQuantity'));
  }, [t]);

  const checkout = useCallback((items) => {
    if (items.length === 0) {
      toast.error(t('cart.emptyCart'));
      return;
    }

    // هنا يمكنك إضافة منطق معالجة الدفع أو إرسال الطلب
    console.log('إتمام عملية الشراء مع المنتجات:', items);
    toast.success(t('cart.purchaseSuccess'));
    // بعد الدفع أو المعالجة، يمكن إفراغ السلة
    clearCart();
  }, [clearCart, t]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook لاستخدام السلة
export const useCart = () => useContext(CartContext);
