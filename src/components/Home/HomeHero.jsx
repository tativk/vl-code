import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imageWrapper = heroRef.current?.querySelector(".hero__image-wrapper");
      const image = heroRef.current?.querySelector(".hero__image");
      if (!imageWrapper || !image) return;

      // === حالت اولیه ===
      gsap.set(imageWrapper, { clipPath: "inset(0 0 0 100%)" });
      gsap.set(image, { scale: 1.25 });
      gsap.set(".hero__title-first", { opacity: 0, y: 28 });
      gsap.set(".hero__title-second", { opacity: 0, y: 28 });
      gsap.set(".hero__description", { opacity: 0, y: 22 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // ۱. باز شدن پرده‌ای عکس
      tl.to(imageWrapper, {
        clipPath: "inset(0 0 0 0%)",
        duration: 1.3,
        ease: "power4.inOut",
      }).to(image, { scale: 1, duration: 1.6, ease: "power3.out" }, "-=1.1");

      // ۲و۳. عنوان و توضیحات
      tl.to(".hero__title-first", { opacity: 1, y: 0, duration: 0.75 }, "-=0.9")
        .to(".hero__title-second", { opacity: 1, y: 0, duration: 0.85 }, "-=0.55")
        .to(".hero__description", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45");

      // idle zoom خیلی آروم و مداوم
      gsap.to(image, {
        scale: 1.06,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // نور متحرک
      gsap.to(".hero__image-light", {
        xPercent: 220,
        duration: 5.5,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 4.5,
      });

      // پارالاکس با موس — فقط translate (بدون rotation تا تداخل با scale idle نداشته باشه)
      const quickX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3.out" });
      const quickY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3.out" });
      const quickLightX = gsap.quickTo(imageWrapper, "rotationY", { duration: 0.6, ease: "power3.out" });

      const handleMouseMove = (e) => {
        const rect = imageWrapper.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        quickX(px * 20);
        quickY(py * 20);
        quickLightX(px * 5); // چرخش سبک روی wrapper، perspective از CSS پدر میاد
      };

      const resetTilt = () => {
        quickX(0);
        quickY(0);
        quickLightX(0);
      };

      imageWrapper.addEventListener("mousemove", handleMouseMove);
      imageWrapper.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.12, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      });
      imageWrapper.addEventListener("mouseleave", () => {
        resetTilt();
        gsap.to(image, { scale: 1.06, duration: 0.9, ease: "power3.out", overwrite: "auto" });
      });

      return () => {
        imageWrapper.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__container">
        {/* ستون ۱ — همیشه فیزیکاً چپ (چون .hero مستقل از dir سایت ltr هست) */}
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-first">ایده شما،</span>
            <span className="hero__title-second">وب‌سایتی ماندگار</span>
          </h1>
          <p className="hero__description">
            ما یک تیم خلاق و حرفه‌ای هستیم که با طراحی و توسعه وب‌سایت‌های
            مدرن کار می‌کنیم. کسب‌وکار شما را در دنیای دیجیتال متمایز می‌کنیم.
          </p>
        </div>

        {/* ستون ۲ — همیشه فیزیکاً راست */}
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
      </div>
    </section>
  );
};

export default Hero;
