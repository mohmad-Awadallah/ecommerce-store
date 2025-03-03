import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/user/UserContext';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const AccountPage = React.memo(() => {
  const { t } = useTranslation();
  const { user, isLoading, error, getUserFavorites, getUserOrders, login } = useUser();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users/1');
        if (!response.ok) {
          throw new Error(t('accountPage.errorFetchingUserData'));
        }
        const userData = await response.json();
        login(userData); // تحديث حالة المستخدم
        const favoritesData = await getUserFavorites(userData.id);
        const ordersData = await getUserOrders(userData.id);
        setFavorites(favoritesData);
        setOrders(ordersData);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
        setIsDataLoaded(true); // وضع البيانات على أنها محملة حتى لا تظل الواجهة في حالة انتظار
      }
    };

    fetchUserData();
  }, [login, getUserFavorites, getUserOrders, t]);

  const handleFavoritesPageChange = useCallback((pageNumber) => {
    setFavoritesPage(pageNumber);
  }, []);

  const handleOrdersPageChange = useCallback((pageNumber) => {
    setOrdersPage(pageNumber);
  }, []);

  const handleGoToSettings = () => {
    navigate('/user-settings');
  };

  const paginate = (array, pageNumber) => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return array.slice(start, end);
  };

  const currentFavorites = paginate(favorites, favoritesPage);
  const currentOrders = paginate(orders, ordersPage);

  if (isLoading) {
    return <div className="loading">{t('accountPage.loading')}</div>;
  }

  if (error) {
    return <div className="error">{t('accountPage.errorLoadingData')}</div>;
  }

  return (
    <div className="account-page">
      <h2>{t('accountPage.accountInfo')}</h2>

      {isDataLoaded ? (
        <div className="account-details">
          <p><strong>{t('accountPage.fullName')}:</strong> {user?.name?.firstname} {user?.name?.lastname}</p>
          <p><strong>{t('accountPage.email')}:</strong> {user?.email}</p>
          <p><strong>{t('accountPage.phone')}:</strong> {user?.phone}</p>
          <p><strong>{t('accountPage.address')}:</strong> {user?.address?.street}, {user?.address?.city}, {user?.address?.zipcode}</p>
        </div>
      ) : (
        <p>{t('accountPage.noUser')}</p>
      )}

      <button onClick={handleGoToSettings} className="settings-button">
        {t('accountPage.goToSettings')}
      </button>

      <div className="favorites-section">
        <h3>{t('accountPage.favorites')}</h3>
        {currentFavorites.length > 0 ? (
          <ul>
            {currentFavorites.map((product) => (
              <li key={product.id} className="favorite-item">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  width={50} 
                  height={50} 
                  style={{ objectFit: 'cover' }} 
                />
                <p>{product.title}</p>
                <p>{t('accountPage.price')}: ${product.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('accountPage.noFavorites')}</p>
        )}

        {favorites.length > itemsPerPage && (
          <Pagination
            currentPage={favoritesPage}
            totalItems={favorites.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handleFavoritesPageChange}
            t={t}
          />
        )}
      </div>

      <div className="orders-section">
        <h3>{t('accountPage.orders')}</h3>
        {currentOrders.length > 0 ? (
          <ul>
            {currentOrders.map((order) => (
              <li key={order.id} className="order-item">
                <p>{t('accountPage.orderDate')}: {new Date(order.date).toLocaleDateString()}</p>
                <p>{t('accountPage.totalAmount')}: ${order.totalAmount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('accountPage.noOrders')}</p>
        )}

        {orders.length > itemsPerPage && (
          <Pagination
            currentPage={ordersPage}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handleOrdersPageChange}
            t={t}
          />
        )}
      </div>
    </div>
  );
});

export default AccountPage;