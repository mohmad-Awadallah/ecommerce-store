import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "../../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

const Checkout = ({ onCheckout, totalPrice }) => {
  const { user } = useUser() || {};
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    coupon: "",
    saveCard: false,
  });
  const [discount, setDiscount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user && !isRedirecting) {
      setIsRedirecting(true);
      setTimeout(() => navigate("/register"), 1000);
    }
  }, [user, navigate, isRedirecting]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateCardDetails = useCallback(() => {
    const errors = [];
    const cardNumberPattern = /^[0-9]{16}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^[0-9]{3,4}$/;
    
    if (!formData.name.trim()) errors.push(t("validation.cardNameRequired"));
    if (!cardNumberPattern.test(formData.cardNumber.replace(/\s/g, ""))) errors.push(t("validation.cardNumberInvalid"));
    if (!expiryPattern.test(formData.expiry)) errors.push(t("validation.expiryInvalid"));
    if (!cvvPattern.test(formData.cvv)) errors.push(t("validation.cvvInvalid"));

    return errors;
  }, [formData, t]);

  const applyCoupon = () => {
    if (formData.coupon === "DISCOUNT10") {
      setDiscount(10);
      toast.success(t("validation.discountApplied"));
    } else {
      setDiscount(0);
      toast.error(t("validation.invalidCoupon"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === "card") {
      const validationErrors = validateCardDetails();
      if (validationErrors.length > 0) {
        validationErrors.forEach(toast.error);
        return;
      }
    }
    
    const finalPrice = totalPrice - (totalPrice * discount) / 100;
    onCheckout({ ...formData, finalPrice, paymentMethod });
    toast.success(t("checkout.successMessage"));
  };

  return (
    <div className="checkout-container">
      <h3>{t("checkout.title")}</h3>
      <form onSubmit={handleSubmit}>
        <label>{t("checkout.paymentMethod")}:</label>
        <select name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="apple">Apple Pay</option>
          <option value="google">Google Pay</option>
        </select>

        {paymentMethod === "card" && (
          <>
            <label>{t("checkout.cardName")}:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            <label>{t("checkout.cardNumber")}:</label>
            <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required maxLength="19" placeholder="1234 5678 9876 5432" />
            <label>{t("checkout.expiryDate")}:</label>
            <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} required placeholder="MM/YY" />
            <label>{t("checkout.cvv")}:</label>
            <input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} required maxLength="4" />
            <label>
              <input type="checkbox" name="saveCard" checked={formData.saveCard} onChange={handleInputChange} />
              {t("checkout.saveCard")}
            </label>
          </>
        )}

        <label>{t("checkout.couponCode")}:</label>
        <input type="text" name="coupon" value={formData.coupon} onChange={handleInputChange} />
        <button type="button" onClick={applyCoupon}>{t("checkout.applyCoupon")}</button>

        <div>
          <p>{t("checkout.totalPrice")} ${(totalPrice - (totalPrice * discount) / 100).toFixed(2)}</p>
        </div>

        <button type="submit" disabled={isRedirecting}>{t("checkout.submitButton")}</button>
      </form>

      {isRedirecting && (
        <div className="loading-spinner">
          <span>{t("checkout.redirecting")}</span>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;