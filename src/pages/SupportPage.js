import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !email) {
      setError(t("supportPage.error"));
      return;
    }
    setLoading(true);
    setError(""); // إعادة تعيين الأخطاء القديمة عند إرسال الرسالة

    // محاكاة إرسال رسالة الدعم
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(t("supportPage.successMessage"));
      setMessage("");
      setEmail("");
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t("supportPage.title")}</h1>
      <p>{t("supportPage.contactDescription")}</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>
          {t("supportPage.emailLabel")}
        </label>
        <input
          type="email"
          id="email"
          placeholder={t("supportPage.emailPlaceholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // إعادة تعيين الأخطاء عند التغيير
          }}
          style={styles.input}
        />
        <label htmlFor="message" style={styles.label}>
          {t("supportPage.messageLabel")}
        </label>
        <textarea
          id="message"
          placeholder={t("supportPage.messagePlaceholder")}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError(""); // إعادة تعيين الأخطاء عند التغيير
          }}
          style={styles.textarea}
        />
        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? t("supportPage.loading") : t("supportPage.submitButton")}
        </button>
      </form>
      <button onClick={() => navigate("/")} style={styles.backButton}>
        {t("supportPage.backToHome")}
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: { color: "#007bff" },
  form: { marginTop: "20px" },
  label: {
    fontSize: "16px",
    margin: "10px 0",
    display: "block",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "2px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "150px",
    marginBottom: "10px",
    border: "2px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  success: {
    color: "green",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default SupportPage;
