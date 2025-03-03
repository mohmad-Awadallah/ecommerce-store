import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1. تعريف السياق
const FavoritesContext = createContext();

// 2. وظيفة الـ reducer لإدارة الحالة
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

// 3. مزود السياق (Provider) لتغليف المكونات التي تحتاج إلى الوصول إلى المفضلات
export const FavoritesProvider = ({ children }) => {
  // استرجاع المفضلات من localStorage (إذا كانت موجودة)
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const [favorites, dispatch] = useReducer(favoritesReducer, storedFavorites);

  // لتخزين المفضلات في localStorage في كل مرة يتم تحديثها
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // دوال مخصصة لإضافة وإزالة المفضلات
  const addFavorite = (product) => {
    dispatch({ type: "ADD_FAVORITE", payload: product });
  };

  const removeFavorite = (productId) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: { id: productId } });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 4. هوك مخصص للوصول إلى بيانات المفضلات
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  // إذا تم استخدام هوك خارج الـ Provider، سيتم إلقاء خطأ
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
