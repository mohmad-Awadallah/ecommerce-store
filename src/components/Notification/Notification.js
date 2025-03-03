import React, { useEffect, useState, useCallback, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNotifications } from '../../context/Notification/NotificationContext';
import { useTheme } from '../../context/Theme/ThemeContext';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import useSound from '../../hooks/useSound';
import { motion } from 'framer-motion';
import './Notification.css';
import { useTranslation } from 'react-i18next';

const Notification = () => {
  const { notifications, removeNotification } = useNotifications();
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [soundError, setSoundError] = useState(false);
  const displayedNotifications = useRef(new Set());
  const { t } = useTranslation();

  const { playSound } = useSound('/notification-sound.mp3', {
    preload: true,
    volume: 0.3,
    onError: () => setSoundError(true),
  });

  useEffect(() => {
    const savedPreference = localStorage.getItem('notificationSound');
    setIsMuted(savedPreference === 'off');
  }, []);

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('notificationSound', newState ? 'off' : 'on');
      return newState;
    });
  }, []);

  const handleNotification = useCallback(
    (notification) => {
      if (displayedNotifications.current.has(notification.id)) return;
      displayedNotifications.current.add(notification.id);

      const toastOptions = {
        toastId: notification.id,
        autoClose: notification.duration || 5000,
        className: `custom-toast ${theme}-theme`,
        bodyClassName: 'toast-body',
        onClose: () => {
          removeNotification(notification.id);
          displayedNotifications.current.delete(notification.id);
        },
        onOpen: () => {
          if (!isMuted) {
            playSound().catch((error) => {
              console.error('Failed to play sound:', error);
              setSoundError(true);
            });
          }
        },
        closeButton: ({ closeToast }) => (
          <button
            aria-label="Close notification"
            className="toast-close-button"
            onClick={closeToast}
          >
            ×
          </button>
        ),
        onClick: () => {
          notification.onClick?.();
          if (!isMuted) {
            playSound().catch((error) => {
              console.error('Failed to play sound:', error);
              setSoundError(true);
            });
          }
        },
      };

      toast(
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="toast-content"
        >
          <div className="toast-message">
            {notification.title && <h3 className="toast-title">{notification.title}</h3>}
            <p>{notification.message}</p>
          </div>
        </motion.div>,
        toastOptions
      );
    },
    [theme, isMuted, playSound, removeNotification]
  );

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification?.id && notification.message) {
        handleNotification(notification);
      }
    });
  }, [notifications, handleNotification]);

  const retryPlaySound = useCallback(() => {
    setSoundError(false);
    playSound().catch((error) => {
      console.error('Failed to retry playing sound:', error);
      setSoundError(true);
    });
  }, [playSound]);

  return (
    <div className="notification-container">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        limit={5}
        hideProgressBar
        containerClassName={`toast-container ${theme}-theme`}
        enableMultiContainer
      />

      {soundError && (
        <div className="sound-error-message" role="alert" aria-live="assertive">
          <p>{t('soundLoadFailed')}</p>
          <button onClick={retryPlaySound}>{t('retry')}</button>
        </div>
      )}

      <button
        className={`sound-toggle ${theme}-theme`}
        onClick={toggleSound}
        aria-label={isMuted ? t('unmuteNotifications') : t('muteNotifications')}
        aria-pressed={isMuted}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>

      {isMuted && (
        <div className="sound-muted-message" aria-live="polite">
          <p>{t('notificationSoundMuted')}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Notification);