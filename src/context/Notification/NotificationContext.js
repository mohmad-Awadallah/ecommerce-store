import React, { createContext, useReducer, useContext, useCallback, useEffect, useRef } from 'react';

// أنواع الإشعارات المدعومة
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// الإعدادات الافتراضية
const DEFAULT_DURATION = 5000; // 5 ثوانٍ
const DEFAULT_TYPE = NOTIFICATION_TYPES.INFO;

const initialState = {
  notifications: [], // قائمة الإشعارات الحالية
};

// معالج الإشعارات
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const existing = state.notifications.find(n => n.id === action.payload.id);
      return existing ? state : {
        ...state,
        notifications: [...state.notifications, {
          ...action.payload,
          type: Object.values(NOTIFICATION_TYPES).includes(action.payload.type) 
            ? action.payload.type 
            : DEFAULT_TYPE,
          // إضافة خاصية onClick مباشرة في الريدوسر
          onClick: action.payload.onClick || null,
        }]
      };
    }
    case 'REMOVE_NOTIFICATION':
      // إزالة الإشعار من القائمة
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
};

// إنشاء سياق الإشعارات
export const NotificationContext = createContext();

// مكون Provider لإدارة الإشعارات
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const { notifications } = state;
  const timersRef = useRef(new Map()); // استخدام useRef لإدارة المؤقتات

  // إضافة إشعار
  const addNotification = useCallback((notification) => {
    const id = notification.id || `${Date.now()}-${Math.random()}`; // إنشاء ID فريد إذا لم يتم توفيره
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification,
        id,
        duration: Math.max(1000, notification.duration || DEFAULT_DURATION), // ضمان مدة لا تقل عن ثانية واحدة
        onClick: notification.onClick ? () => notification.onClick(id) : null,
      }
    });
  }, []);

  // إزالة إشعار
  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer); // إلغاء المؤقت
      timersRef.current.delete(id); // إزالة المؤقت من الخريطة
    }
  }, []);

  // إدارة المؤقتات
  useEffect(() => {
    const currentTimers = timersRef.current; // نسخ timersRef.current إلى متغير محلي

    // إنشاء مؤقت جديد لكل إشعار
    notifications.forEach((notification) => {
      if (!currentTimers.has(notification.id)) {
        const timer = setTimeout(() => {
          removeNotification(notification.id); // إزالة الإشعار بعد انتهاء المدة
        }, notification.duration);
        currentTimers.set(notification.id, timer); // إضافة المؤقت إلى الخريطة
      }
    });

    // تنظيف المؤقتات للإشعارات التي تمت إزالتها
    return () => {
      currentTimers.forEach((timer, id) => {
        if (!notifications.some(n => n.id === id)) {
          clearTimeout(timer); // إلغاء المؤقت
          currentTimers.delete(id); // إزالة المؤقت من الخريطة
        }
      });
    };
  }, [notifications, removeNotification]);

  // توفير السياق للأطفال
  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      removeNotification, 
      NOTIFICATION_TYPES 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook لاستخدام سياق الإشعارات
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("يجب استخدام useNotifications داخل NotificationProvider");
  }
  return context;
};