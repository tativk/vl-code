import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";


const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // === حالت اولیه ===
      gsap.set(".hero__image-wrapper", {
        opacity: 0,
        x: -45,          // از چپ وارد شود (چون عکس حالا چپ است)
        scale: 0.96,
      });

      gsap.set(".hero__title-first", {
        opacity: 0,
        y: 28,
      });

      gsap.set(".hero__title-second", {
        opacity: 0,
        y: 28,
      });

      gsap.set(".hero__description", {
        opacity: 0,
        y: 22,
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // ۱. عکس (حالا از چپ می‌آید)
      tl.to(".hero__image-wrapper", {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
      });

      // ۲. خط اول عنوان
      tl.to(
        ".hero__title-first",
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.7"
      );

      // ۳. خط دوم
      tl.to(
        ".hero__title-second",
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.5"
      );

      // ۴. توضیحات
      tl.to(
        ".hero__description",
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.45"
      );

      // حرکت نرم idle
      gsap.to(".hero__image", {
        scale: 1.035,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // نور متحرک (Light Sweep)
      gsap.to(".hero__image-light", {
        xPercent: 220,
        duration: 5.5,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 4.5,
      });

      // Hover
      const imageWrapper = heroRef.current?.querySelector(
        ".hero__image-wrapper"
      );
      if (imageWrapper) {
        const image = imageWrapper.querySelector(".hero__image");
        imageWrapper.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.07,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
        imageWrapper.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1.035,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__container">
        {/* ===== LEFT — IMAGE (تغییر کرد) ===== */}
        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <img
              src="/Asets/3.jpg"
              alt="طراحی و توسعه وب‌سایت"
              className="hero__image"
              loading="lazy"
            />
            <div className="hero__image-light" aria-hidden="true" />
          </div>
        </div>

        {/* ===== RIGHT — TEXT (تغییر کرد) ===== */}
        <div className="hero__content" dir="rtl">
          <h1 className="hero__title">
            <span className="hero__title-first">ایده شما،</span>
            <span className="hero__title-second">وب‌سایتی ماندگار</span>
          </h1>
          <p className="hero__description">
            ما یک تیم خلاق و حرفه‌ای هستیم که با طراحی و توسعه وب‌سایت‌های
            مدرن کار می‌کنیم. کسب‌وکار شما را در دنیای دیجیتال متمایز می‌کنیم.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;