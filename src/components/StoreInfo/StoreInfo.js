import React from 'react';
import { useTranslation } from 'react-i18next';
import storeImage from '../../assets/store-image.jpg'; // صورة المتجر
import teamMember1 from '../../assets/teamMember1.jpeg'; // صور فريق العمل
import teamMember2 from '../../assets/teamMember2.png';
import teamMember3 from '../../assets/teamMember3.jpg';
import paymentIcon from '../../assets/paymentIcon.png'; // أيقونة طرق الدفع
import './StoreInfo.css'; // استيراد ملف CSS

const StoreInfo = () => {
  const { t } = useTranslation();

  const storeDetails = [
    { key: 'storeName', value: t('storeInfoPage.storeNamee') }, // اسم المتجر
    { key: 'location', value: t('storeInfoPage.locationn') }, // الموقع
    { key: 'storeHours', value: t('storeInfoPage.storeHourss') }, // ساعات العمل
    { key: 'policy', value: t('storeInfoPage.policyy') }, // سياسة المتجر
    { key: 'contactUs', value: t('storeInfoPage.contactUss') }, // اتصل بنا
    { key: 'aboutUs', value: t('storeInfoPage.aboutUss') }, // من نحن
    { key: 'promotions', value: t('storeInfoPage.promotionss') }, // العروض الحالية
    { key: 'branches', value: t('storeInfoPage.branchess') }, // فروع المتجر
    { key: 'reviews', value: t('storeInfoPage.customerReviewss') }, // التقييمات
    { key: 'paymentMethods', value: t('storeInfoPage.paymentMethodsList') }, // طرق الدفع
    { key: 'shippingPolicy', value: t('storeInfoPage.shippingDetails') }, // سياسة الشحن
    { key: 'ourTeam', value: t('storeInfoPage.ourTeam') }, // فريقنا
  ];

  // فريق العمل
  const teamMembers = [
    { name: "محمد", role: "مدير المتجر", image: teamMember1 },
    { name: "أحمد", role: "مطور الويب", image: teamMember2 },
    { name: "علي", role: "دعم العملاء", image: teamMember3 },
  ];

  // تقييمات العملاء
  const customerReviews = [
    { name: "سارة", review: "تجربة رائعة، شكرًا لكم!", rating: 5 },
    { name: "خالد", review: "منتجات ممتازة وتوصيل سريع.", rating: 4 },
    { name: "ليلى", review: "أفضل متجر للتسوق عبر الإنترنت.", rating: 5 },
  ];

  return (
    <div className="store-info-page">
      <h1 className="store-title">{t('storeInfoPage.storeInfo')}</h1>

      {/* عرض الصورة في الصفحة */}
      <div className="store-image">
        <img src={storeImage} alt="Store" className="store-img" />
      </div>

      {/* عرض تفاصيل المتجر */}
      <div className="store-details">
        <h2 className="section-title">{t('storeInfoPage.storeDetails')}</h2>
        {storeDetails.map((detail, index) => (
          <div key={index} className="detail-item">
            <strong>{t(`storeInfoPage.${detail.key}`)}:</strong> {detail.value}
          </div>
        ))}
      </div>

      {/* عرض فريق العمل */}
      <div className="team-section">
        <h2 className="section-title">{t('storeInfoPage.ourTeam')}</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} className="team-member-img" />
              <p className="team-member-name"><strong>{member.name}</strong></p>
              <p className="team-member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* عرض تقييمات العملاء */}
      <div className="reviews-section">
        <h2 className="section-title">{t('storeInfoPage.reviews')}</h2>
        <div className="customer-reviews">
          {customerReviews.map((review, index) => (
            <div key={index} className="review">
              <p className="review-text"><strong>{review.name}:</strong> {review.review}</p>
              <p className="review-rating">التقييم: {"⭐".repeat(review.rating)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* عرض طرق الدفع */}
      <div className="payment-section">
        <h2 className="section-title">{t('storeInfoPage.paymentMethods')}</h2>
        <img src={paymentIcon} alt="Payment Methods" className="payment-icon" />
        <p className="payment-details">{t('storeInfoPage.paymentMethodsList')}</p>
      </div>

      {/* عرض سياسة الشحن */}
      <div className="shipping-section">
        <h2 className="section-title">{t('storeInfoPage.shippingPolicy')}</h2>
        <p className="shipping-details">{t('storeInfoPage.shippingDetails')}</p>
      </div>

      {/* عرض العروض الترويجية */}
      <div className="promotions-section">
        <h2 className="section-title">{t('storeInfoPage.promotions')}</h2>
        <p className="promotions-details">{t('storeInfoPage.currentPromotions')}</p>
      </div>
    </div>
  );
};

export default StoreInfo;