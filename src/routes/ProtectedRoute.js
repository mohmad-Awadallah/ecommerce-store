import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/user/UserContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  const { t } = useTranslation();

  // حالة تحميل: عرض مؤشر التحميل أثناء التحقق من حالة المستخدم
  if (loading) return <LoadingSpinner fullScreen />;

  // إذا لم يكن المستخدم مسجل دخول، اعادة توجيه للصفحة المطلوبة
  if (!user) {
    toast.info(t("loginRequired"), {
      autoClose: 3000,
      theme: localStorage.getItem("theme") || "light" // استخدم الثيم من localStorage أو الثيم الافتراضي
    });
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // إذا كان المستخدم مسجل دخول، عرض المحتوى المحمي
  return children;
};

export default React.memo(ProtectedRoute);
