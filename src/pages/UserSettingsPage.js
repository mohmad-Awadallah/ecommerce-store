import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const InputField = ({ label, type, value, onChange, placeholder, error }) => (
  <div className="input-field">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

const UserSettingsPage = () => {
  const { t } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleSave = () => {
    // التحقق من صحة المدخلات
    const newErrors = validateInputs();
    if (newPassword && !validatePassword(newPassword)) {
      newErrors.newPassword = t('userSettings.passwordStrength');
    }
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      setMessage(t('userSettings.changesSaved'));
      scrollToTop();
    } else {
      setMessage(t('userSettings.fixErrors'));
    }
  };

  // دالة للتحقق من صحة المدخلات
  const validateInputs = () => {
    return {
      fullName: fullName ? '' : t('userSettings.fillFullName'),
      email: validateEmail(email) ? '' : t('userSettings.invalidEmail'),
      currentPassword: currentPassword ? '' : t('userSettings.fillCurrentPassword'),
      newPassword: newPassword ? '' : t('userSettings.fillNewPassword'),
    };
  };

  // دالة للتحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // دالة للتحقق من قوة كلمة المرور
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setMessage(t('userSettings.changesCancelled'));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // تحديث الرسالة عند وجود خطأ
  useEffect(() => {
    if (Object.values(errors).some((error) => error !== '')) {
      setMessage(t('userSettings.fixErrors'));
    }
  }, [errors, t]); // إضافة التبعية 't'

  return (
    <div className="user-settings">
      <h2>{t('userSettings.accountInfo')}</h2>

      <div className="settings-section">
        <h3>{t('userSettings.accountInfo')}</h3>
        <InputField
          label={t('userSettings.fullName')}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t('userSettings.enterFullName')}
          error={errors.fullName}
        />
        <InputField
          label={t('userSettings.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('userSettings.enterEmail')}
          error={errors.email}
        />
      </div>

      <div className="settings-section">
        <h3>{t('userSettings.privacySettings')}</h3>
        <InputField
          label={t('userSettings.currentPassword')}
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder={t('userSettings.enterCurrentPassword')}
          error={errors.currentPassword}
        />
        <InputField
          label={t('userSettings.newPassword')}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t('userSettings.enterNewPassword')}
          error={errors.newPassword}
        />
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSave}>
          {t('userSettings.saveChanges')}
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          {t('userSettings.cancel')}
        </button>
      </div>

      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default UserSettingsPage;
