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

### 8. Screenshots
Below are some screenshots showcasing the application's interface:

#### Home Page
![Home Page]([./screenshots/Screenshot from 2025-03-03 19-52-30.png]

#### Product Details Page
![Product Details](./screenshots/product-details.png)

#### Cart Page
![Cart Page](./screenshots/cart.png)

#### Checkout Page
![Checkout Page](./screenshots/checkout.png)

#### Login Page
![Login Page](./screenshots/login.png)

#### Dark Theme Example
![Dark Theme](./screenshots/dark-theme.png)


