import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login-verification.css";
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setMobile(value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(mobile)) {
      setError("شماره موبایل معتبر نیست. مثال: 09123456789");
      return;
    }
    // ارسال شماره به صفحه تایید از طریق state
    navigate("/verification", { state: { mobile } });
  };

  return (
    <div className="auth-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="auth-card">
        <div className="brand">
          <div className="logo">V</div>
          <h1>ولورا کد</h1>
          <p>پلتفرم تیم برنامه‌نویسی</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>ورود به حساب</h2>
          <p className="subtitle">شماره موبایل خود را وارد کنید</p>

          <div className={`input-group ${error ? "error" : ""}`}>
            <span className="input-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <input
              type="tel"
              placeholder="09123456789"
              value={mobile}
              onChange={handleChange}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            دریافت کد تایید
          </button>
        </form>

        <div className="auth-footer">
          <span>حساب ندارید؟</span>
          <a href="#">ثبت‌نام کنید</a>
        </div>
      </div>
    </div>
  );
};

export default Login;