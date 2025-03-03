import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNotifications } from '../../context/Notification/NotificationContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // استيراد useTranslation
import './Offers.css';

const Offers = () => {
  const { t } = useTranslation(); // استخدام الترجمة
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoNavigate, setAutoNavigate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch offers');
        const data = await response.json();
        
        const formattedOffers = data.slice(0, 5).map(({ id, title, description, image }) => ({
          id,
          title,
          description,
          image,
        }));
        
        setOffers(formattedOffers);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchOffers();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (offers.length === 0) return;

    const notificationId = `offer-${offers[currentIndex].id}`;
    addNotification({
      id: notificationId,
      message: `${t('newOffer')}: ${offers[currentIndex].title}`,
    });

    return () => {
      addNotification(notificationId, { remove: true });
    };
  }, [currentIndex, offers, addNotification, t]);

  useEffect(() => {
    if (autoNavigate && offers.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoNavigate, offers]);

  const handleNavigation = useCallback((direction) => {
    setCurrentIndex(prev => Math.max(0, Math.min(prev + direction, offers.length - 1)));
  }, [offers.length]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const handleViewDetails = useCallback((id) => {
    navigate(`/product/${id}`);
  }, [navigate]);

  const currentOffer = useMemo(() => offers[currentIndex] || null, [offers, currentIndex]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section aria-label={t('currentPromotions')} className="offers-container">
      <h2>{t('currentPromotions')}</h2>

      {currentOffer && (
        <article className="offer-item" aria-live="polite">
          <header>
            <h3>{currentOffer.title}</h3>
          </header>
          <img
            src={currentOffer.image}
            alt={`صورة ${currentOffer.title} المنتج`}
            loading="lazy"
            className="offer-image"
          />
          <p>{currentOffer.description}</p>
          <button
            className="view-details-button"
            onClick={() => handleViewDetails(currentOffer.id)}
            aria-label={t('viewDetails')}
          >
            {t('viewDetails')}
          </button>
        </article>
      )}

      <div className="navigation-controls">
        <button
          onClick={() => handleNavigation(-1)}
          disabled={currentIndex === 0}
          aria-label={t('previous')}
        >
          {t('previous')}
        </button>
        
        <span className="offer-counter" aria-live="assertive">
          {currentIndex + 1} / {offers.length}
        </span>

        <button
          onClick={() => handleNavigation(1)}
          disabled={currentIndex === offers.length - 1}
          aria-label={t('next')}
        >
          {t('next')}
        </button>

        <button
          onClick={handleRestart}
          aria-label={t('restart')}
        >
          {t('restart')}
        </button>
      </div>

      <div className="auto-navigation-toggle">
        <label>
          <input
            type="checkbox"
            checked={autoNavigate}
            onChange={() => setAutoNavigate(prev => !prev)}
            aria-label={t('autoNavigate')}
          />
          {t('autoNavigate')}
        </label>
      </div>
    </section>
  );
};

export default Offers;
