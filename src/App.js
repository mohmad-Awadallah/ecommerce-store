import DiscountNotification from "./components/DiscountNotification/DiscountNotification";
import React, { useEffect, lazy, Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/create/CartContext";
import { FavoritesProvider } from "./context/Favorites/FavoritesContext";
import { NotificationProvider } from "./context/Notification/NotificationContext";
import { useTheme } from "./context/Theme/ThemeContext";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import StoreInfo from "./components/StoreInfo/StoreInfo";
import ProtectedRoute from "./routes/ProtectedRoute";
import Notification from "./components/Notification/Notification";
import Offers from "./components/Offers/Offers";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./i18n";


// تحميل الصفحات بشكل كسول (Lazy Loading)
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetails = lazy(() => import("./components/ProductDetails/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./components/Login/Login"));
const RegisterPage = lazy(() => import("./components/Register/Register"));
const UserSettingsPage = lazy(() => import("./pages/UserSettingsPage"));
const OrdersHistoryPage = lazy(() => import("./pages/OrdersHistoryPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const OrderTrackingPage = lazy(() => import("./pages/OrderTrackingPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const SpecialOffersPage = lazy(() => import("./pages/SpecialOffersPage")); // استيراد الصفحة الجديدة


const App = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();


  // تحديث الثيم وتخزينه في localStorage عند تغييره
  useEffect(() => {
    document.body.className = theme.mode === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // تحديث إعدادات اللغة (lang و dir) عند تغيير اللغة
  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);



  // تحسين المسارات باستخدام useMemo لتجنب إعادة التصيير غير الضروري
  const routes = useMemo(() => (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/user-settings" element={
          <ProtectedRoute>
            <UserSettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
        <Route path="/store-info" element={<StoreInfo />} />
        <Route path="/track-order" element={
          <ProtectedRoute>
            <OrderTrackingPage />
          </ProtectedRoute>
        } />
        <Route path="/orders-history" element={
          <ProtectedRoute>
            <OrdersHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
                <Route path="/special-offers" element={<SpecialOffersPage />} /> {/* إضافة المسار الجديد */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  ), []); // تم إزالة i18n.language و theme من التبعيات

  return (
    <CartProvider>
      <FavoritesProvider>
        <NotificationProvider>
          <div className="App">
            <ErrorBoundary>
              <Header />
              <div className="global-controls">
                <LanguageSwitcher
                  changeLanguage={i18n.changeLanguage}
                  currentLanguage={i18n.language}
                />
                <ThemeToggle theme={theme.mode} toggleTheme={toggleTheme} aria-label={t("toggleTheme")} />
              </div>
              <Offers />
              <DiscountNotification discountPercentage={20} code="DISCOUNT20" /> {/* عرض إشعار الخصم */}
              {routes}
              <Notification />
            </ErrorBoundary>
          </div>
        </NotificationProvider>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default React.memo(App);
