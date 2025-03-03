// CartPage.js
import React from 'react';
import { useCart } from '../context/create/CartContext';
import Cart from '../components/Cart/Cart'; // تأكد من المسار الصحيح

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    checkout // إضافة checkout هنا
  } = useCart();

  return (
    <Cart 
      cartItems={cart} 
      onRemoveItem={removeFromCart} 
      onClearCart={clearCart} 
      onUpdateQuantity={updateQuantity} 
      onCheckout={checkout} // تمرير دالة checkout هنا
    />
  );
};

export default CartPage;
