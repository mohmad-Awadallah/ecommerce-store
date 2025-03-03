import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user/UserContext";
import { useTranslation } from "react-i18next";

const OrderTrackingPage = () => {
  const { user } = useUser(); // التحقق من تسجيل الدخول
  const navigate = useNavigate();
  const { t } = useTranslation(); // استخدام الترجمة

  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  // إعادة توجيه المستخدم غير المسجل بعد ثانيتين
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // دالة تتبع الطلب
  const trackOrder = useCallback(async () => {
    if (!orderId.trim()) {
      setError(t("orderTracking.error"));
      setOrderStatus("");
      setOrderDetails("");
      return;
    }

    setError("");
    setLoading(true);
    setOrderStatus("");
    setOrderDetails("");
    setProgress(10);

    try {
      // محاكاة استدعاء API لتحديد حالة الطلب
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const statuses = [
            { status: "gathering" },
            { status: "shipped" },
            { status: "delivered" },
            { status: "delayed" },
          ];
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];
          setProgress(50);
          resolve(randomStatus);
        }, 2000);
      });

      const status = response.status;
      // جلب الترجمة لحالة الطلب والتفاصيل من ملف الترجمة
      const statusLabel = t(`orderTracking.statusLabels.${status}`, {
        defaultValue: status,
      });
      const detailsLabel = t(`orderTracking.details.${status}`, {
        defaultValue: "حالة الطلب غير معروفة",
      });

      setOrderStatus(statusLabel);
      setOrderDetails(detailsLabel);
      setProgress(100);
    } catch (err) {
      setError(t("orderTracking.error"));
    } finally {
      setLoading(false);
    }
  }, [orderId, t]);

  if (!user) {
    return (
      <p style={styles.centeredText}>
        {t("orderTracking.loginRequired")}
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t("orderTracking.title")}</h1>
      <input
        type="text"
        placeholder={t("orderTracking.enterOrderId")}
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={styles.input}
      />
      <button onClick={trackOrder} style={styles.button} disabled={loading}>
        {loading ? t("orderTracking.loading") : t("orderTracking.trackButton")}
      </button>
      {error && <p style={styles.error}>{error}</p>}

      {loading && (
        <progress value={progress} max="100" style={styles.progress} />
      )}

      {orderStatus && (
        <p style={styles.status}>
          {t("orderTracking.status")}: {orderStatus}
        </p>
      )}
      {orderDetails && (
        <p style={styles.details}>
          {t("orderTracking.details.title")}  {orderDetails}
        </p>
      )}

      <div style={styles.space}></div>

      <button onClick={() => navigate("/support")} style={styles.supportButton}>
        {t("orderTracking.contactSupport")}
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: { color: "#007bff" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
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
  progress: {
    width: "100%",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
  status: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "15px",
  },
  details: {
    fontSize: "16px",
    color: "#555",
    marginTop: "10px",
  },
  supportButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "30px",
  },
  space: {
    marginTop: "20px",
  },
  centeredText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default OrderTrackingPage;
