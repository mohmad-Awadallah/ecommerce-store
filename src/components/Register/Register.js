import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user/UserContext";
import { useTranslation } from "react-i18next";
import './Register.css';

const RegisterPage = () => {
  const { login } = useUser() || {};
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    city: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password, phone, city } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!username || !email || !password || !phone || !city) return false;
    if (!emailRegex.test(email)) return false;
    if (!phoneRegex.test(phone)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login) {
      setErrorMessage(t("register.loginFunctionNotFound"));
      return;
    }

    if (!validateForm()) {
      setErrorMessage(t("register.invalidForm"));
      return;
    }

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          address: {
            city: formData.city,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);

      login(formData);
      setSuccessMessage(t("register.successMessage"));
      setErrorMessage("");

      // إعادة تعيين البيانات
      setFormData({
        username: "",
        password: "",
        email: "",
        phone: "",
        city: "",
      });

      navigate("/checkout");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(t("register.errorMessage"));
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const timerSuccess = setTimeout(() => {
      if (successMessage) setSuccessMessage("");
    }, 5000);

    const timerError = setTimeout(() => {
      if (errorMessage) setErrorMessage("");
    }, 5000);

    return () => {
      clearTimeout(timerSuccess);
      clearTimeout(timerError);
    };
  }, [successMessage, errorMessage]);

  return (
    <div className="register-container">
      <h3>📋 {t("register.title")}</h3>
      <form onSubmit={handleSubmit}>
        <label>{t("register.usernameLabel")}:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>{t("register.emailLabel")}:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>{t("register.phoneLabel")}:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>{t("register.cityLabel")}:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>{t("register.passwordLabel")}:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="alert-success">{successMessage}</div>}

        <button type="submit" className="submit" disabled={!validateForm()}>
          {t("register.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
