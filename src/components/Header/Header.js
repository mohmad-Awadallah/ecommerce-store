import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaStore, FaTruck, FaHeart, FaGift } from "react-icons/fa"; // إضافة أيقونة العروض الخاصة
import { useCart } from "../../context/create/CartContext";
import { useUser } from "../../context/user/UserContext";
import { useFavorites } from "../../context/Favorites/FavoritesContext";
import { useTranslation } from "react-i18next";
import "./Header.css";

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  // حساب عدد العناصر في السلة والمفضلات
  const cartCount = useMemo(() => cart.length, [cart]);
  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          {/* اسم المتجر */}
          <li className="store-name">
            <span className="moving-store-name">E-COMMERCE STORE</span>
          </li>

          {/* روابط قائمة التنقل */}
          <li>
            <Link to="/" className="nav-link" aria-label={t("home.title")}>
              {t("home.title")}
            </Link>
          </li>
          <li>
            <Link to="/store-info" className="nav-link" aria-label={t("storeInfo.title")}>
              <FaStore className="store-icon" /> {t("storeInfo.title")}
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/track-order" className="nav-link track-link" aria-label={t("trackOrder.title")}>
                <FaTruck className="track-icon" /> {t("trackOrder.title")}
              </Link>
            </li>
          )}
          <li>
            <Link to="/special-offers" className="nav-link" aria-label={t("specialOffers.title")}>
              <FaGift className="gift-icon" /> {t("specialOffers.title")}
            </Link>
          </li>

          {/* رابط السلة */}
          <li>
            <Link to="/cart" className="cart-link" aria-label={t("cart.cart")}>
              <FaShoppingCart className="cart-icon" />
              <span>{t("cart.cart")}</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>

          {/* قسم المستخدم: حساب، مفضلات، وتسجيل خروج */}
          {user ? (
            <>
              <li>
                <Link to="/favorites" className="nav-link favorites-link" aria-label={t("favorites.title")}>
                  <FaHeart className="favorites-icon" />
                  <span>{t("favorites.title")}</span>
                  {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
                </Link>
              </li>
              <li>
                <Link to="/account" className="nav-link" aria-label={t("account.title")}>
                  <FaUser className="user-icon" /> {t("account.title")}
                </Link>
              </li>
              <li>
                <button onClick={logout} className="logout-btn">
                  {t("logout")}
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-link" aria-label={t("login.title")}>
                {t("login.title")}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;