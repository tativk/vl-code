// LoginPage.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
// import logoImg from "../../public/Asets/logo.jpg";
import "./Login-verification.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const borderRef = useRef(null);
  const particlesRef = useRef([]);

  const logoMarkRef = useRef(null);

  const titleInnerRef = useRef(null);
  const titleShineRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const featureItemsRef = useRef([]);

  const fieldRefs = useRef([]);
  const buttonRef = useRef(null);
  const buttonSheenRef = useRef(null);
  const dividerRef = useRef(null);
  const signupRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const featureItems = featureItemsRef.current.filter(Boolean);
      const fields = fieldRefs.current.filter(Boolean);
      const particles = particlesRef.current.filter(Boolean);

      gsap.set(cardRef.current, { transformPerspective: 1200 });

      if (reduceMotion) {
        gsap.set(
          [
            cardRef.current,
            logoMarkRef.current,
            titleInnerRef.current,
            welcomeTextRef.current,
            ...featureItems,
            ...fields,
            buttonRef.current,
            dividerRef.current,
            signupRef.current,
          ],
          { autoAlpha: 1, clearProps: "transform,filter" },
        );
        return;
      }

      /*
       * -----------------------------------------
       * Entrance sequence
       * -----------------------------------------
       */

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        cardRef.current,
        { autoAlpha: 0, scale: 0.86, y: 46, rotateX: 10, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
        },
        0,
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
          0.55,
        )

        .fromTo(
          titleInnerRef.current,
          { yPercent: 105 },
          { yPercent: 0, duration: 0.85, ease: "power4.out" },
          1.05,
        )

        .fromTo(
          welcomeTextRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          1.35,
        )

        .fromTo(
          featureItems,
          { autoAlpha: 0, y: 18, scale: 0.6 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "back.out(2.2)",
          },
          1.5,
        )

        .fromTo(
          fields,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.75,
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
          1.35,
        )

        .fromTo(
          [dividerRef.current, signupRef.current],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, stagger: 0.1 },
          1.6,
        );

      /*
       * -----------------------------------------
       * Ambient — rotating energy border
       * -----------------------------------------
       */

      if (borderRef.current) {
        gsap.to(borderRef.current, {
          rotate: 360,
          duration: 9,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      /*
       * -----------------------------------------
       * Ambient — floating particles
       * -----------------------------------------
       */

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

      /*
       * -----------------------------------------
       * Ambient — logo float + title shine
       * -----------------------------------------
       */

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
              },
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
              },
            );
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="login" ref={pageRef}>
      <div className="login__glow login__glow--a" aria-hidden="true" />
      <div className="login__glow login__glow--b" aria-hidden="true" />

      <div className="login__particles" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="login__particle"
            style={{ left: `${10 + i * 12}%`, top: `${20 + ((i * 17) % 60)}%` }}
          />
        ))}
      </div>

      <div className="login__card" ref={cardRef}>
        <span
          className="login__card-border"
          ref={borderRef}
          aria-hidden="true"
        />

        {/* =========================================
            LEFT — Brand / Welcome
        ========================================= */}
        <div className="login__brand-panel" dir="rtl">
          <div className="login__logo">
            <img
              ref={logoMarkRef}
              className="login__logo-mark"
              src="/Asets/logo-bk.png"
              alt="Velora Code"
            />
            <span className="login__logo-text">
              velora{" "}
              <span className="login__logo-text-accent">
                <br></br>code
              </span>
            </span>
          </div>

          <div className="login__welcome">
            <h1 className="login__welcome-title" id="login-title">
              <span className="login__welcome-title-clip">
                <span
                  ref={titleInnerRef}
                  className="login__welcome-title-inner"
                >
                  <span
                    ref={titleShineRef}
                    className="login__welcome-title-shine"
                  >
                    خوش آمدید
                  </span>
                </span>
              </span>
            </h1>

            <p ref={welcomeTextRef} className="login__welcome-text">
              برای دسترسی به حساب کاربری خود وارد شوید
            </p>
          </div>

          <ul className="login__features" aria-label="ویژگی‌ها">
            <li
              className="login__feature"
              ref={(el) => (featureItemsRef.current[0] = el)}
            >
              <span className="login__feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="login__feature-label">امن و مطمئن</span>
            </li>

            <li
              className="login__feature"
              ref={(el) => (featureItemsRef.current[1] = el)}
            >
              <span className="login__feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="login__feature-label">سرعت بالا</span>
            </li>

            <li
              className="login__feature"
              ref={(el) => (featureItemsRef.current[2] = el)}
            >
              <span className="login__feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="login__feature-label">پشتیبانی ۲۴ ساعته</span>
            </li>
          </ul>
        </div>

        {/* =========================================
            RIGHT — Form
        ========================================= */}
        <div className="login__form-panel" dir="rtl">
          <form
            className="login__form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div
              className="login__field"
              ref={(el) => (fieldRefs.current[0] = el)}
            >
              <label className="login__label" htmlFor="mobile">
                شماره موبایل
              </label>

              <div className="login__input-wrap">
                <svg
                  className="login__input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  className="login__input"
                  placeholder="شماره موبایل خود را وارد کنید"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div
              className="login__field"
              ref={(el) => (fieldRefs.current[1] = el)}
            >
              <label className="login__label" htmlFor="password">
                رمز عبور
              </label>

              <div className="login__input-wrap">
                <svg
                  className="login__input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="10.5"
                    width="14"
                    height="9.5"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M8 10.5V7.5a4 4 0 018 0v3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>

                <input
                  id="password"
                  type="password"
                  className="login__input"
                  placeholder="............"
                  autoComplete="current-password"
                />
              </div>

              <a href="#" className="login__forgot">
                رمز عبور را فراموش کرده اید؟
              </a>
            </div>

            <button type="button" className="login__submit" ref={buttonRef}>
              <span
                ref={buttonSheenRef}
                className="login__submit-sheen"
                aria-hidden="true"
              />
              <span className="login__submit-label">ورود به حساب</span>
            </button>

            <div className="login__divider" ref={dividerRef}>
              <span />
              <em>یا</em>
              <span />
            </div>

            <p className="login__signup" ref={signupRef}>
              حساب کاربری ندارید؟{" "}
              <Link to="/signup" className="login__signup-link">
                ثبت‌نام
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
