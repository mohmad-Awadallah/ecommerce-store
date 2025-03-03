// src/pages/NotFoundPage.js
// src/NotFoundPage.js
import React from 'react';
import { useTranslation } from 'react-i18next'; // استيراد hook لترجمة النصوص

const NotFoundPage = () => {
  const { t } = useTranslation(); // استخدام الترجمة

  return (
    <div className="not-found">
      <h2>{t('notFound')}</h2> {/* استخدام الترجمة للنص */}
    </div>
  );
};

export default NotFoundPage;
