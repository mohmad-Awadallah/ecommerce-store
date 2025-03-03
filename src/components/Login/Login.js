import React, { useState } from "react";
import { useUser } from "../../context/user/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [username, setUsername] = useState(""); // تغيير من email إلى username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // إعادة تعيين رسالة الخطأ

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // استخدام اسم المستخدم
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("API Response:", data);

      // تسجيل الدخول تلقائيًا بعد النجاح
      login({ username });

      // توجيه المستخدم إلى الصفحة التي كان يحاول الوصول إليها أو `/account`
      const from = location.state?.from?.pathname || "/account";
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Error:", error);
      setError(t("login.error")); // عرض رسالة الخطأ
    } finally {
      setIsLoading(false); // إيقاف حالة التحميل
    }
  };

  // إخفاء رسالة الخطأ بعد فترة معينة
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (error) setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="login-container">
      <h2>{t("login.title")}</h2>
      <form onSubmit={handleLogin}>
        <label>{t("login.usernameLabel")}</label> {/* تغيير التسمية إلى "اسم المستخدم" */}
        <input
  type="text" /* تغيير من email إلى text */
  value={username} /* استخدام اسم المستخدم هنا */
  onChange={(e) => setUsername(e.target.value)}
  required
/>


        <label>{t("login.passwordLabel")}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isLoading} className="submit">
          {isLoading ? t("login.loadingButton") : t("login.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default Login;
