import React, { useLayoutEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

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
  const signinRef = useRef(null);

  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const features = featureItemsRef.current.filter(Boolean);
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
            ...features,
            ...fields,
            buttonRef.current,
            dividerRef.current,
            signinRef.current,
          ],
          { autoAlpha: 1, clearProps: "transform,filter" }
        );
        return;
      }

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
        0
      )
        .fromTo(
          logoMarkRef.current,
          { scale: 0, rotate: -140, autoAlpha: 0 },
          { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.85, ease: "back.out(2.6)" },
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
          [dividerRef.current, signinRef.current],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, stagger: 0.1 },
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
              { xPercent: 160, duration: 1.5, repeat: -1, repeatDelay: 2.4, ease: "power1.inOut" }
            );
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify");
  };

  return (
    <div className="signup" ref={pageRef}>
      <div className="signup__glow signup__glow--a" aria-hidden="true" />
      <div className="signup__glow signup__glow--b" aria-hidden="true" />

      <div className="signup__particles" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="signup__particle"
            style={{ left: `${10 + i * 12}%`, top: `${20 + ((i * 17) % 60)}%` }}
          />
        ))}
      </div>

      <div className="signup__card" ref={cardRef}>
        <span className="signup__card-border" ref={borderRef} aria-hidden="true" />

        <div className="signup__brand-panel" dir="rtl">
          <div className="signup__logo">
            <img
              ref={logoMarkRef}
              className="signup__logo-mark"
              src="/Asets/logo-bk.png"
              alt="Velora Code"
            />
            <span className="signup__logo-text">
              velora <span className="signup__logo-text-accent"><br></br>code</span>
            </span>
          </div>

          <div className="signup__welcome">
            <h1 className="signup__welcome-title">
              <span className="signup__welcome-title-clip">
                <span ref={titleInnerRef} className="signup__welcome-title-inner">
                  <span ref={titleShineRef} className="signup__welcome-title-shine">
                    ایجاد حساب کاربری
                  </span>
                </span>
              </span>
            </h1>

            <p ref={welcomeTextRef} className="signup__welcome-text">
              برای شروع، اطلاعات خود را وارد کنید
            </p>
          </div>

          <ul className="signup__features" aria-label="ویژگی‌ها">
            <li className="signup__feature" ref={(el) => (featureItemsRef.current[0] = el)}>
              <span className="signup__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="signup__feature-label">امن و مطمئن</span>
            </li>
            <li className="signup__feature" ref={(el) => (featureItemsRef.current[1] = el)}>
              <span className="signup__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="signup__feature-label">سرعت بالا</span>
            </li>
            <li className="signup__feature" ref={(el) => (featureItemsRef.current[2] = el)}>
              <span className="signup__feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="signup__feature-label">پشتیبانی ۲۴ ساعته</span>
            </li>
          </ul>
        </div>

        <div className="signup__form-panel" dir="rtl">
          <form className="signup__form" onSubmit={handleSubmit} noValidate>
            <div className="signup__field" ref={(el) => (fieldRefs.current[0] = el)}>
              <label className="signup__label" htmlFor="name">نام و نام خانوادگی</label>
              <div className="signup__input-wrap">
                <svg className="signup__input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input id="name" type="text" className="signup__input" placeholder="نام خود را وارد کنید" ref={nameInputRef} autoComplete="name" required />
              </div>
            </div>

            <div className="signup__field" ref={(el) => (fieldRefs.current[1] = el)}>
              <label className="signup__label" htmlFor="phone">شماره موبایل</label>
              <div className="signup__input-wrap">
                <svg className="signup__input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                <input id="phone" type="tel" inputMode="numeric" className="signup__input" placeholder="شماره موبایل خود را وارد کنید" ref={phoneInputRef} autoComplete="tel" required />
              </div>
            </div>

            <div className="signup__field" ref={(el) => (fieldRefs.current[2] = el)}>
              <label className="signup__label" htmlFor="signup-password">رمز عبور</label>
              <div className="signup__input-wrap">
                <svg className="signup__input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                <input id="signup-password" type="password" className="signup__input" placeholder="رمز عبور را وارد کنید" ref={passwordInputRef} autoComplete="new-password" required />
              </div>
            </div>

            <button type="submit" className="signup__submit" ref={buttonRef}>
              <span ref={buttonSheenRef} className="signup__submit-sheen" aria-hidden="true" />
              <span className="signup__submit-label">ثبت‌نام</span>
            </button>

            <div className="signup__divider" ref={dividerRef}>
              <span />
              <em>یا</em>
              <span />
            </div>

            <p className="signup__signin" ref={signinRef}>
              قبلاً حساب دارید؟{" "}
              <Link to="/login" className="signup__signin-link">ورود به حساب</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;