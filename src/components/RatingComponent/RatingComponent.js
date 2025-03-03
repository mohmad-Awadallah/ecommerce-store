// components/RatingComponent.js
import React, { useState } from 'react';
import './RatingComponent.css'; // استيراد ملف CSS خارجي

const RatingComponent = ({ productId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null); // لتخزين التقييم المؤقت عند مرور الفأرة

  const handleRating = (newRating) => {
    setRating(newRating);
    // هنا يمكنك إرسال التقييم إلى الخادم
  };

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
