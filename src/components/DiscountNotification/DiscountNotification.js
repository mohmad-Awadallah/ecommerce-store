import { useEffect, useCallback } from 'react';
import { useNotifications } from '../../context/Notification/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DiscountNotification = ({ discountPercentage = 20, code = 'DISCOUNT20' }) => {
  const { addNotification, removeNotification } = useNotifications();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNotificationClick = useCallback((notificationId) => {
    removeNotification(notificationId);
    navigate('/special-offers');
  }, [navigate, removeNotification]);

  useEffect(() => {
    const notificationId = `discount-<span class="math-inline">\{code\}\-</span>{Date.now()}`;
    const discountNotification = {
      id: notificationId,
      type: 'success',
      title: t('discountOfferTitle', { discountPercentage }),
      message: t('discountOfferMessage', { discountPercentage, code }),
      onClick: () => handleNotificationClick(notificationId),
      duration: 8000,
      persistent: false,
      className: 'clickable-notification',
      style: { cursor: 'pointer' },
    };

    addNotification(discountNotification);

    return () => {
      removeNotification(notificationId);
    };
  }, [addNotification, removeNotification, discountPercentage, code, handleNotificationClick, t]);

  return null;
};

export default DiscountNotification;
