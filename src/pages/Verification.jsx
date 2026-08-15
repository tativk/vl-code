// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Verification = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const mobile = location.state?.mobile || "نامشخص";

//   const [code, setCode] = useState(["", "", "", ""]);
//   const [timer, setTimer] = useState(60);
//   const [error, setError] = useState("");
//   const inputsRef = useRef([]);

//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (index, value) => {
//     const newCode = [...code];
//     newCode[index] = value.replace(/\D/g, "").slice(0, 1);
//     setCode(newCode);
//     setError("");

//     if (value && index < 3) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fullCode = code.join("");
//     if (fullCode.length !== 4) {
//       setError("کد تایید را کامل وارد کنید.");
//       return;
//     }
//     // بعد از تایید موفق
//     alert("ورود موفق! کد وارد شده: " + fullCode);
//     // اینجا می‌تونی کاربر رو به داشبورد یا صفحه اصلی هدایت کنی
//     navigate("/");
//   };

//   const handleResend = () => {
//     setTimer(60);
//     setCode(["", "", "", ""]);
//     inputsRef.current[0].focus();
//     // اینجا می‌توانی درخواست ارسال مجدد کد را صدا بزنی
//   };

//   return (
//     <div className="auth-container">
//       <div className="blob blob-1"></div>
//       <div className="blob blob-2"></div>
//       <div className="blob blob-3"></div>

//       <div className="auth-card">
//         <div className="brand">
//           <div className="logo">V</div>
//           <h1>ولورا کد</h1>
//           <p>تایید هویت</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <h2>کد تایید را وارد کنید</h2>
//           <p className="subtitle">
//             کد ۴ رقمی به شماره <strong>{mobile}</strong> ارسال شد.
//           </p>

//           <div className="code-inputs">
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputsRef.current[index] = el)}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 autoFocus={index === 0}
//               />
//             ))}
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <button type="submit" className="btn-primary">
//             تایید و ورود
//           </button>
//         </form>

//         <div className="auth-footer">
//           <span>کد را دریافت نکردید؟</span>
//           {timer > 0 ? (
//             <span className="timer">ارسال مجدد تا {timer} ثانیه</span>
//           ) : (
//             <a href="#" onClick={handleResend}>
//               ارسال مجدد کد
//             </a>
//           )}
//         </div>
//         <a href="#" className="change-number" onClick={() => navigate("/login")}>
//           تغییر شماره موبایل
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Verification;