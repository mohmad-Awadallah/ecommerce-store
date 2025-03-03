import React, { useEffect, useState, useCallback } from 'react';
import ProductList from '../components/ProductList/ProductList';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import { ClipLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import { useNotifications, NOTIFICATION_TYPES } from '../context/Notification/NotificationContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { addNotification } = useNotifications(); // استخدام سياق الإشعارات
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [, setDiscountNotificationVisible] = useState(false);

  // جلب البيانات مع استخدام useCallback للتحسين
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error(t('home.errorLoading'));
      const data = await response.json();
      setProducts(data);
      setVisibleProducts(data.slice(0, 3));
      
      // تحقق من وجود خصم على المنتجات
      const discountAvailable = data.some(product => product.price < 20); // فرضًا أن المنتجات التي تقل عن 20 دولار بها خصم
      if (discountAvailable) {
        setDiscountNotificationVisible(true);
        setTimeout(() => setDiscountNotificationVisible(false), 5000); // إخفاء الإشعار بعد 5 ثوانٍ
      }
      
    } catch (error) {
      setError(error.message || t('home.errorLoading'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // إضافة إشعار ترحيبي عند تحميل الصفحة
  useEffect(() => {
    addNotification({
      id: 'welcome-notification',
      type: NOTIFICATION_TYPES.INFO,
      message: t('home.welcomeMessage'),
      duration: 5000,
    });
  }, [addNotification, t]);

  // دوران المنتجات كل 5 ثوانٍ
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        setVisibleProducts(prev => {
          const currentIndex = products.findIndex(p => p.id === prev[0]?.id);
          const nextIndex = (currentIndex + 3) % products.length;
          return products.slice(nextIndex, nextIndex + 3);
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [products]);

  // تصفية المنتجات
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="center-loader">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      
      {/* خلفية المنتجات الدوارة */}
      <div className="rotating-background">
        <ProductList 
          products={visibleProducts} 
          style={{ opacity: 0.1 }}
        />
      </div>

      {/* المحتوى الرئيسي */}
      <main className="main-content">
        <h1 className="page-title">{t('home.productsTitle')}</h1>
        
        <div>
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
          <CategoryFilter 
            value={selectedCategory} 
            onChange={setSelectedCategory} 
          />
        </div>

        <ProductList 
          products={filteredProducts} 
        />
      </main>
    </div>
  );
};

export default HomePage;