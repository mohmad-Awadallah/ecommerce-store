### E-Commerce Web Application

### 1. Overview
This project is a modern e-commerce web application built with React that provides the following features:
- Interactive user interface for product display, cart management, favorites, and checkout.
- State management using Context API.
- Multi-language support with `react-i18next`.
- Customizable themes (Dark and Light modes).
- Route protection with `ProtectedRoute`.
- Lazy loading for improved performance.
- End-to-End testing with Cypress.

### 2. Folder Structure

#### Main Folders:
- **`.idea/`**: IDE settings.
- **`cypress/`**: Cypress E2E tests.
- **`public/`**: Static files including `index.html` and assets.
- **`src/`**: Application source code.
  - **`assets/`**: Images and icons.
  - **`components/`**: Reusable UI components.
  - **`context/`**: Context API providers.
  - **`hooks/`**: Custom hooks.
  - **`locales/`**: Translation files.
  - **`pages/`**: Main application pages.
  - **`routes/`**: Route management.
  - **`utils/`**: Utility functions.

#### Configuration Files:
- `.gitignore`
- `cypress.config.ts`
- `.prettierrc`
- `package.json`
- `tsconfig.json`
- `README.md`

### 3. Features
- **State Management**: `CartProvider`, `FavoritesProvider`, `NotificationProvider`.
- **Internationalization**: `react-i18next` for multi-language support.
- **Themes**: Dark and Light mode with localStorage persistence.
- **Protected Routes**: Restricts access to certain pages.
- **Lazy Loading**: Improves performance with code splitting.
- **Testing**: End-to-End tests with Cypress.

### 4. Routes
- `/`: HomePage
- `/product/:id`: Product Details
- `/cart`: Cart Page
- `/checkout`: Checkout Page
- `/login`: Login Page
- `/register`: Register Page
- `/favorites`: Favorites Page
- `/special-offers`: Special Offers Page

### 5. Technologies
- React
- React Router
- Context API
- `react-i18next`
- Cypress
- TypeScript
- Prettier & ESLint

### 6. How to Run the Project
1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Run Cypress tests:
   ```bash
   npm run cypress:open
   ```


Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.   

### 7. Credentials
- Username: `mor_2314`
- Password: `83r5^_`

---

my-web-app/
├── .idea/                    # إعدادات IDE (مثل WebStorm أو IntelliJ)
├── cypress/                  # اختبارات Cypress
│   ├── e2e/                  # اختبارات End-to-End
│   ├── fixtures/             # بيانات ثابتة للاختبارات
│   └── support/              # إعدادات ودعم لـ Cypress
├── public/                   # ملفات الـ Static (مثل index.html، الأيقونات)
│   ├── index.html            # ملف HTML الرئيسي
│   └── assets/              # ملفات ثابتة (صور، خطوط، إلخ)
├── src/                      # مصدر الكود الرئيسي
│   ├── assets/               # ملفات الأصول (صور، أيقونات، إلخ)
│   ├── components/           # مكونات الواجهة (React/Vue components)
│   ├── context/              # React Context API لإدارة الحالة
│   ├── cypress/              # اختبارات Cypress (يمكن نقلها إلى مجلد cypress الرئيسي)
│   ├── hooks/                # React Hooks مخصصة
│   ├── locales/              # ملفات الترجمة (i18n)
│   ├── pages/                # صفحات التطبيق
│   ├── routes/               # إدارة المسارات (Routing)
│   ├── utils/                # وظائف مساعدة (utility functions)
│   ├── App.css               # أنماط المكون الرئيسي
│   ├── App.js                # المكون الرئيسي للتطبيق
│   ├── App.test.js           # اختبارات المكون الرئيسي
│   ├── index.js              # نقطة دخول التطبيق
│   ├── reportWebVitals.js    # تقارير أداء التطبيق
│   ├── setupProxy.js         # إعدادات Proxy للاتصال بالخادم
│   └── setupTests.js         # إعدادات اختبارات Jest
├── .gitignore                # ملف لتجاهل الملفات التي لا يجب تتبعها بواسطة Git
├── cypress.config.ts         # إعدادات Cypress (TypeScript)
├── my-ecommerce-store.code-workspace  # إعدادات Workspace لـ VS Code
├── .prettierrc               # إعدادات Prettier لتنسيق الكود
├── package-lock.json         # تثبيت إصدارات التبعيات (يتم إنشاؤه تلقائيًا)
├── package.json              # ملف تعريف المشروع والتبعيات
├── README.md                 # وصف المشروع وكيفية تشغيله
├── tsconfig.json             # إعدادات TypeScript


