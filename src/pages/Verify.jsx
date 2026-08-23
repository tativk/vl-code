import React, { useLayoutEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import gsap from "gsap";
import "./Verify.css";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

const Verify = () => {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const inputsRef = useRef([]);

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const borderRef = useRef(null);
  const particlesRef = useRef([]);

  const logoMarkRef = useRef(null);
  const titleInnerRef = useRef(null);
  const titleShineRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const featureItemsRef = useRef([]);

  const formHeadingRef = useRef(null);
  const otpWrapRef = useRef(null);
  const resendRef = useRef(null);

  const buttonRef = useRef(null);
  const buttonSheenRef = useRef(null);
  const changeNumberRef = useRef(null);

  const successRef = useRef(null);
  const successIconRef = useRef(null);

  const phoneNumber = "09••• ••• ۱۲۳۴";

  useLayoutEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useLayoutEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const features = featureItemsRef.current.filter(Boolean);
      const fields = [
        formHeadingRef.current,
        otpWrapRef.current,
        resendRef.current,
      ].filter(Boolean);
      const particles = particlesRef.current.filter(Boolean);

      gsap.set(cardRef.current, { transformPerspective: 1200 });

      if (reduceMotion) {
        gsap.set(
          [
            cardRef.current,
            logoMarkRef.current,
            titleInnerRef.current,
            welcomeTextRef.current,
            ...features,
            ...fields,
            buttonRef.current,
            changeNumberRef.current,
          ],
          { autoAlpha: 1, clearProps: "transform,filter" }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        cardRef.current,
        {
          autoAlpha: 0,
          scale: 0.86,
          y: 46,
          rotateX: 10,
          filter: "blur(14px)",
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
        },
        0
      )
        .fromTo(
          logoMarkRef.current,
          { scale: 0, rotate: -140, autoAlpha: 0 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "back.out(2.6)",
          },
          0.55
        )
        .fromTo(
          titleInnerRef.current,
          { yPercent: 105 },
          { yPercent: 0, duration: 0.85, ease: "power4.out" },
          1.05
        )
        .fromTo(
          welcomeTextRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          1.35
        )
        .fromTo(
          features,
          { autoAlpha: 0, y: 18, scale: 0.6 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "back.out(2.2)",
          },
          1.5
        )
        .fromTo(
          fields,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.75
        )
        .fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 16, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2.4)",
          },
          1.35
        )
        .fromTo(
          changeNumberRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          1.6
        );

      if (borderRef.current) {
        gsap.to(borderRef.current, {
          rotate: 360,
          duration: 9,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      particles.forEach((el, i) => {
        gsap.to(el, {
          y: -22 - i * 4,
          x: i % 2 === 0 ? 10 : -10,
          autoAlpha: 0,
          duration: 3.4 + i * 0.4,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      tl.eventCallback("onComplete", () => {
        ctx.add(() => {
          gsap.to(logoMarkRef.current, {
            y: -5,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          if (titleShineRef.current) {
            gsap.fromTo(
              titleShineRef.current,
              { backgroundPositionX: "180%" },
              {
                backgroundPositionX: "-80%",
                duration: 2.6,
                repeat: -1,
                repeatDelay: 1.8,
                ease: "power1.inOut",
              }
            );
          }

          if (buttonSheenRef.current) {
            gsap.fromTo(
              buttonSheenRef.current,
              { xPercent: -160 },
              {
                xPercent: 160,
                duration: 1.5,
                repeat: -1,
                repeatDelay: 2.4,
                ease: "power1.inOut",
              }
            );
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isVerified) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      gsap.set([successIconRef.current, successRef.current], {
        autoAlpha: 1,
        clearProps: "transform",
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          successIconRef.current,
          { scale: 0, rotate: -140, autoAlpha: 0 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "back.out(2.6)",
          }
        )
        .fromTo(
          successRef.current.querySelectorAll("h2, p, .verify__continue"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.2
        );
    }, successRef);
    return () => ctx.revert();
  }, [isVerified]);

  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) {
      const next = [...code];
      next[index] = "";
      setCode(next);
      return;
    }
    if (cleanValue.length > 1) {
      const pasted = cleanValue.slice(0, CODE_LENGTH).split("");
      const next = Array(CODE_LENGTH).fill("");
      pasted.forEach((digit, i) => {
        next[i] = digit;
      });
      setCode(next);
      inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
      return;
    }
    const next = [...code];
    next[index] = cleanValue;
    setCode(next);
    if (index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0)
      inputsRef.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1)
      inputsRef.current[index + 1]?.focus();
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
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalCode = code.join("");
    if (finalCode.length !== CODE_LENGTH) {
      inputsRef.current[code.findIndex((item) => !item)]?.focus();
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setIsVerified(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  };

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <main className="verify" dir="rtl" ref={pageRef}>
      <div className="verify__glow verify__glow--a" />
      <div className="verify__glow verify__glow--b" />

      <div className="verify__particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            ref={(el) => (particlesRef.current[index] = el)}
            className="verify__particle"
            style={{
              left: `${8 + ((index * 17) % 84)}%`,
              top: `${6 + ((index * 29) % 88)}%`,
            }}
          />
        ))}
      </div>

      <section className="verify__card" ref={cardRef}>
        <div className="verify__card-border" ref={borderRef} />

        {/* Brand Panel — حالا سمت چپ قرار می‌گیرد */}
        <div className="verify__brand-panel" dir="rtl">
          <div className="verify__logo">
            <img
              ref={logoMarkRef}
              className="verify__logo-mark"
              src="/Asets/logo-bk.png"
              alt="Velora Code"
            />
            <div className="verify__logo-text">
              VELORA <span className="verify__logo-text-accent"><br></br>CODE</span>
            </div>
          </div>

          <div className="verify__welcome">
            <h1 className="verify__welcome-title">
              <span className="verify__welcome-title-clip">
                <span
                  ref={titleInnerRef}
                  className="verify__welcome-title-inner"
                >
                  <span
                    ref={titleShineRef}
                    className="verify__welcome-title-shine"
                  >
                    تأیید شماره
                  </span>
                </span>
              </span>
            </h1>

            <p ref={welcomeTextRef} className="verify__welcome-text">
              برای ادامه‌ی ساخت حساب، کدی که به شماره
              موبایل شما ارسال شده را وارد کنید.
            </p>
          </div>

          <ul className="verify__features" aria-label="ویژگی‌ها">
            <li
              className="verify__feature"
              ref={(el) => (featureItemsRef.current[0] = el)}
            >
              <span className="verify__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="verify__feature-label">امن و مطمئن</span>
            </li>
            <li
              className="verify__feature"
              ref={(el) => (featureItemsRef.current[1] = el)}
            >
              <span className="verify__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="verify__feature-label">سرعت بالا</span>
            </li>
            <li
              className="verify__feature"
              ref={(el) => (featureItemsRef.current[2] = el)}
            >
              <span className="verify__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="verify__feature-label">پشتیبانی ۲۴ ساعته</span>
            </li>
          </ul>
        </div>

        {/* Form Panel — سمت راست */}
        <div className="verify__form-panel" dir="rtl">
          {isVerified ? (
            <div className="verify__success" ref={successRef}>
              <div className="verify__success-icon" ref={successIconRef}>
                <FiCheck />
              </div>
              <h2>شماره تأیید شد</h2>
              <p>حساب شما با موفقیت تأیید شد.</p>
              <button type="button" className="verify__continue" onClick={() => {}}>
                <span>ادامه</span>
                <FiArrowRight />
              </button>
            </div>
          ) : (
            <form className="verify__form" onSubmit={handleSubmit}>
              <div className="verify__form-heading" ref={formHeadingRef}>
                <span className="verify__form-label">VERIFICATION CODE</span>
                <h2>کد تأیید را وارد کنید</h2>
                <p>
                  کد ارسال‌شده به <strong>{phoneNumber}</strong> را وارد کنید.
                </p>
              </div>

              <div
                className="verify__otp"
                dir="ltr"
                ref={otpWrapRef}
                onPaste={handlePaste}
              >
                {code.map((value, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputsRef.current[index] = element;
                    }}
                    className={`verify__otp-input${
                      value ? " verify__otp-input--filled" : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={value}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    aria-label={`رقم ${index + 1} کد`}
                  />
                ))}
              </div>

              <div className="verify__resend" ref={resendRef}>
                {seconds > 0 ? (
                  <span>
                    ارسال مجدد کد تا{" "}
                    <strong>۰۰:{formatTime(seconds)}</strong>
                  </span>
                ) : (
                  <button type="button" onClick={handleResend}>
                    ارسال مجدد کد
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="verify__submit"
                ref={buttonRef}
                disabled={isSubmitting}
              >
                <span className="verify__submit-label">
                  {isSubmitting ? "در حال بررسی..." : "تأیید و ادامه"}
                </span>
                {!isSubmitting && <FiArrowRight />}
                <span ref={buttonSheenRef} className="verify__submit-sheen" />
              </button>

              <button
                type="button"
                className="verify__change-number"
                ref={changeNumberRef}
                onClick={() => {}}
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