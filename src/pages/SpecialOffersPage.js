import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  FaGift,
  FaShippingFast,
  FaTags,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaClock,
  FaCopy
} from 'react-icons/fa';
import { toast } from 'react-toastify';

// مكون المؤقت التنازلي المُحسَّن
const CountdownTimer = ({ expirationDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const { t } = useTranslation();


  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(expirationDate) - Date.now();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [expirationDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="countdown-timer" role="timer">
      <FaClock className="timer-icon" aria-hidden="true" />
      <div className="time-segment">
        <span className="time-value">{timeLeft.days}</span>
        <span className="time-label">
          {timeLeft.days === 1 ? t('timeUnits.day') : t('timeUnits.days')}
        </span>
      </div>
      <div className="time-segment">
        <span className="time-value">{timeLeft.hours}</span>
        <span className="time-label">{t('timeUnits.hours')}</span>
      </div>
      <div className="time-segment">
        <span className="time-value">{timeLeft.minutes}</span>
        <span className="time-label">{t('timeUnits.minutes')}</span>
      </div>
      <div className="time-segment">
        <span className="time-value">{timeLeft.seconds}</span>
        <span className="time-label">{t('timeUnits.seconds')}</span>
      </div>
    </div>
  );
};

// مكون المشاركة المُحسَّن مع التحقق من التوفر
const ShareButtons = ({ offer }) => {
  const { t } = useTranslation();
  
  const shareText = `${offer.title} - ${offer.description} ${t(
    'specialOffers.shareMessage'
  )}`;

  const handleShare = (platform) => {
    try {
      const shareData = {
        title: offer.title,
        text: shareText,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        const platforms = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}`,
          whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareText
          )}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`
        };
        window.open(platforms[platform], '_blank');
      }
    } catch (error) {
      toast.error(t('common.shareError'));
    }
  };

  return (
    <div className="share-buttons">
      <button
        onClick={() => handleShare('twitter')}
        aria-label={t('ariaLabels.shareOnTwitter')}
      >
        <FaTwitter />
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        aria-label={t('ariaLabels.shareOnWhatsapp')}
      >
        <FaWhatsapp />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        aria-label={t('ariaLabels.shareOnFacebook')}
      >
        <FaFacebook />
      </button>
    </div>
  );
};

// المكون الرئيسي مع تحسينات الأداء
const SpecialOffersPage = () => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    offers: [],
    loading: true,
    error: null
  });

  const fetchOffers = useCallback(async () => {
    try {
      // محاكاة لجلب البيانات مع إعادة المحاولة
      const mockApiResponse = await fetchWithRetry(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                {
                  id: 1,
                  type: 'discount',
                  title: t('specialOffers.offer1.title'),
                  description: t('specialOffers.offer1.description'),
                  expirationDate: '2025-12-31T23:59:59',
                  ctaText: t('specialOffers.claimOffer'),
                  discountCode: 'DISCOUNT20',
                  icon: <FaTags />
                },
                {
                  id: 2,
                  type: 'gift',
                  title: t('specialOffers.offer2.title'),
                  description: t('specialOffers.offer2.description'),
                  expirationDate: '2025-06-30T23:59:59',
                  ctaText: t('specialOffers.learnMore'),
                  discountCode: 'FIRST50',
                  icon: <FaGift />
                }
              ]
            });
          }, 1000);
        });
      }, 3); // 3 محاولات

      setState({ offers: mockApiResponse.data, loading: false, error: null });
    } catch (error) {
      setState({ offers: [], loading: false, error: error.message });
      toast.error(t('common.fetchError'));
    }
  }, [t]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleClaimOffer = async (discountCode) => {
    try {
      await navigator.clipboard.writeText(discountCode);
      toast.success(t('specialOffers.codeCopied', { code: discountCode }));
    } catch (error) {
      toast.error(t('common.copyError'));
    }
  };

  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorDisplay message={state.error} />;

  return (
    <main className="special-offers-container">
      <header className="offers-header">
        <h1>{t('specialOffers.title')}</h1>
        <p className="header-description">{t('specialOffers.subtitle')}</p>
      </header>

      <div className="offers-grid">
        {state.offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onClaim={handleClaimOffer}
          />
        ))}
        <StaticOffer />
      </div>

      <footer className="offers-footer">
  <div className="terms-notice">
    <FaExclamationTriangle className="terms-icon" />
    <p>{t('specialOffers.termsApply')}</p>
  </div>
  <p className="detailed-terms">{t('specialOffers.termsAndConditions')}</p>
</footer>
    </main>
  );
};

// مكونات مساعدة
const LoadingSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="loading-spinner" aria-live="polite">
      <div className="spinner" />
      <p>{t('loading')}</p>
    </div>
  );
};

const ErrorDisplay = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="error-message" role="alert">
      <p>{t('common.fetchError')}</p>
      <p>{message}</p>
    </div>
  );
};

const OfferCard = ({ offer, onClaim }) => {
  const { t } = useTranslation();

  return (
    <article className="offer-card">
      <div className="offer-badge" aria-hidden="true">
        {t('specialOffers.limitedTime')}
      </div>
      <div className="offer-icon">{offer.icon}</div>
      <h2 className="offer-title">{offer.title}</h2>
      <p className="offer-description">{offer.description}</p>
      
      <div className="offer-details">
        <CountdownTimer expirationDate={offer.expirationDate} />
        
        <button
          className="cta-button"
          onClick={() => onClaim(offer.discountCode)}
          aria-label={`${offer.ctaText} - ${offer.discountCode}`}
        >
          <FaCopy className="button-icon" />
          {offer.ctaText}
        </button>

        <ShareButtons offer={offer} />
      </div>
    </article>
  );
};

const StaticOffer = () => {
  const { t } = useTranslation();

  return (
    <article className="offer-card static-offer">
      <div className="offer-icon"><FaShippingFast /></div>
      <h2 className="offer-title">{t('specialOffers.freeShipping.title')}</h2>
      <p className="offer-description">
        {t('specialOffers.freeShipping.description')}
      </p>
      <div className="offer-details">
        <p className="expiration-date">{t('specialOffers.noCodeRequired')}</p>
        <ShareButtons offer={{
          title: t('specialOffers.freeShipping.title'),
          description: t('specialOffers.freeShipping.description')
        }} />
      </div>
    </article>
  );
};

// دالة مساعدة لإعادة المحاولة
async function fetchWithRetry(fetcher, retries) {
  try {
    return await fetcher();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, 2000));
    return fetchWithRetry(fetcher, retries - 1);
  }
}

// التحقق من الأنواع
SpecialOffersPage.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      expirationDate: PropTypes.string.isRequired,
      ctaText: PropTypes.string.isRequired,
      discountCode: PropTypes.string,
      type: PropTypes.oneOf(['discount', 'gift', 'shipping'])
    })
  )
};

export default SpecialOffersPage;