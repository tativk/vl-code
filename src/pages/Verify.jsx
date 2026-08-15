import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck, FiMessageSquare } from "react-icons/fi";
import "./Verify.css";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

const Verify = () => {
  const [code, setCode] = useState(
    Array(CODE_LENGTH).fill("")
  );

  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const inputsRef = useRef([]);

  // شماره بعداً از signup / backend می‌آید
  const phoneNumber = "09••• ••• ۱۲۳۴";

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) {
      const next = [...code];
      next[index] = "";
      setCode(next);
      return;
    }

    // اگر کاربر چند رقم را paste کرد
    if (cleanValue.length > 1) {
      const pasted = cleanValue
        .slice(0, CODE_LENGTH)
        .split("");

      const next = Array(CODE_LENGTH).fill("");

      pasted.forEach((digit, i) => {
        next[i] = digit;
      });

      setCode(next);

      const focusIndex = Math.min(
        pasted.length,
        CODE_LENGTH - 1
      );

      inputsRef.current[focusIndex]?.focus();

      return;
    }

    const next = [...code];
    next[index] = cleanValue;
    setCode(next);

    if (index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < CODE_LENGTH - 1
    ) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);

    if (!pasted) return;

    const next = Array(CODE_LENGTH).fill("");

    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });

    setCode(next);

    inputsRef.current[
      Math.min(pasted.length, CODE_LENGTH - 1)
    ]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalCode = code.join("");

    if (finalCode.length !== CODE_LENGTH) {
      inputsRef.current[
        code.findIndex((item) => !item)
      ]?.focus();

      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * بعداً این قسمت به بک‌اند وصل می‌شود:
       *
       * const response = await fetch("/api/auth/verify", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     phone: phoneNumber,
       *     code: finalCode,
       *   }),
       * });
       *
       * if (!response.ok) throw new Error();
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      setIsVerified(true);

      // بعداً:
      // navigate("/dashboard");

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;

    /*
     * بعداً:
     *
     * await fetch("/api/auth/resend-code", {
     *   method: "POST",
     *   body: JSON.stringify({
     *     phone: phoneNumber,
     *   }),
     * });
     */

    setSeconds(RESEND_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <main className="verify" dir="rtl">
      {/* Ambient Glow */}

      <div className="verify__glow verify__glow--a" />
      <div className="verify__glow verify__glow--b" />

      {/* Particles */}

      <div
        className="verify__particles"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="verify__particle"
            style={{
              left: `${8 + ((index * 17) % 84)}%`,
              top: `${6 + ((index * 29) % 88)}%`,
              animationDelay: `${index * 0.18}s`,
            }}
          />
        ))}
      </div>

      {/* Card */}

      <section className="verify__card">
        <div className="verify__card-border" />

        {/* Brand */}

        <div className="verify__brand-panel">
          <div className="verify__logo">
            <img
              className="verify__logo-mark"
              src="/Asets/logo.png"
              alt="Velora"
            />

            <div className="verify__logo-text">
              VELORA{" "}
              <span className="verify__logo-text-accent">
                CODE
              </span>
            </div>
          </div>

          <div className="verify__welcome">
            <div className="verify__icon-wrap">
              <FiMessageSquare />
            </div>

            <h1 className="verify__welcome-title">
              تأیید شماره
            </h1>

            <p className="verify__welcome-text">
              برای ادامه‌ی ساخت حساب، کدی که به شماره
              موبایل شما ارسال شده را وارد کنید.
            </p>
          </div>
        </div>

        {/* Form */}

        <div className="verify__form-panel">
          {isVerified ? (
            <div className="verify__success">
              <div className="verify__success-icon">
                <FiCheck />
              </div>

              <h2>شماره تأیید شد</h2>

              <p>
                حساب شما با موفقیت تأیید شد.
              </p>

              <button
                type="button"
                className="verify__continue"
                onClick={() => {
                  // بعداً:
                  // navigate("/dashboard");
                }}
              >
                <span>ادامه</span>
                <FiArrowRight />
              </button>
            </div>
          ) : (
            <form
              className="verify__form"
              onSubmit={handleSubmit}
            >
              <div className="verify__form-heading">
                <span className="verify__form-label">
                  VERIFICATION CODE
                </span>

                <h2>
                  کد تأیید را وارد کنید
                </h2>

                <p>
                  کد ارسال‌شده به
                  <strong>{phoneNumber}</strong>
                  را وارد کنید.
                </p>
              </div>

              {/* OTP */}

              <div
                className="verify__otp"
                dir="ltr"
                onPaste={handlePaste}
              >
                {code.map((value, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputsRef.current[index] =
                        element;
                    }}
                    className={`verify__otp-input${
                      value
                        ? " verify__otp-input--filled"
                        : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    maxLength={1}
                    value={value}
                    onChange={(event) =>
                      handleChange(
                        index,
                        event.target.value
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        index,
                        event
                      )
                    }
                    aria-label={`رقم ${index + 1} کد`}
                  />
                ))}
              </div>

              {/* Timer */}

              <div className="verify__resend">
                {seconds > 0 ? (
                  <span>
                    ارسال مجدد کد تا{" "}
                    <strong>
                      ۰۰:{formatTime(seconds)}
                    </strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="verify__submit"
                disabled={isSubmitting}
              >
                <span className="verify__submit-label">
                  {isSubmitting
                    ? "در حال بررسی..."
                    : "تأیید و ادامه"}
                </span>

                {!isSubmitting && (
                  <FiArrowRight />
                )}

                <span className="verify__submit-sheen" />
              </button>

              <button
                type="button"
                className="verify__change-number"
                onClick={() => {
                  // بعداً:
                  // navigate("/signup");
                }}
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Verify;