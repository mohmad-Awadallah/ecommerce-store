import React, { Component } from "react";
import { useTranslation } from "react-i18next";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // دالة لاكتشاف الأخطاء وتحديث الحالة
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // دالة لتسجيل الخطأ عند حدوثه
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>{t('errorBoundary.message')}</h2>
          {this.state.errorInfo && <details><summary>{t('errorBoundary.details')}</summary><pre>{this.state.errorInfo.componentStack}</pre></details>}
          <div className="error-actions">
            <button className="reload-btn" onClick={this.handleReload}>
              {t('errorBoundary.reload')}
            </button>
            <button className="home-btn" onClick={this.handleGoHome}>
              {t('errorBoundary.goHome')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// استخدام `useTranslation` في المكونات الوظيفية (إذا كان تطبيقك يستخدم React hooks)
const ErrorBoundaryWithTranslation = (props) => {
  const { t } = useTranslation();
  return <ErrorBoundary {...props} t={t} />;
};

export default ErrorBoundaryWithTranslation;
