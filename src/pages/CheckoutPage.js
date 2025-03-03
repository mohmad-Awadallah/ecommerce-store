import React, { useState } from "react";
import Checkout from "../components/Checkout/Checkout";
import { useTranslation } from "react-i18next";

const CheckoutPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { t } = useTranslation();

  const handleCheckout = (paymentDetails) => {
    console.log("تمت معالجة الدفع بنجاح!", paymentDetails);
    setPaymentSuccess(true);
  };

  return (
    <div className="checkout-page">
      <h2>{t('checkoutPage.title')}</h2>
      {paymentSuccess ? (
        <p className="success-message">{t('checkoutPage.successMessage')}</p>
      ) : (
        <Checkout onCheckout={handleCheckout} />
      )}
    </div>
  );
};

export default CheckoutPage;
