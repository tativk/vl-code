import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const AboutHero = () => {
  const rootRef = useRef(null);
  const visualRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(rootRef.current, { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        rootRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 }
      )
        .from(
          visualRef.current,
          { autoAlpha: 0, scale: 0.6, duration: 1.4 },
          0.1
        )
        .from(
          titleRef.current.querySelectorAll(".about-hero__title-line"),
          { yPercent: 110, duration: 1, stagger: 0.08 },
          0.3
        )
        .from(
          descRef.current,
          { autoAlpha: 0, y: 24, duration: 0.7 },
          "-=0.4"
        )
        .from(
          scrollRef.current,
          { autoAlpha: 0, duration: 0.6 },
          "-=0.2"
        );

      gsap.to(visualRef.current, {
        backgroundPosition: "100% 0%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".about-hero__visual-orbit", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".about-hero__visual-core", {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-hero" ref={rootRef} style={{ visibility: "hidden" }}>
      <div className="about-hero__inner">
        <div className="about-hero__visual" ref={visualRef} aria-hidden="true">
          <div className="about-hero__visual-orbit" />
          <div className="about-hero__visual-core" />
          <div className="about-hero__visual-dot" />
        </div>

        <div className="about-hero__eyebrow">
          <span className="about-hero__eyebrow-line" />
          استودیوی توسعه‌ی خلاق
        </div>

        <h1 className="about-hero__title" ref={titleRef}>
          <span className="about-hero__title-line">ما تجربه‌های</span>
          <span className="about-hero__title-line about-hero__title-line--accent">
            دیجیتال را
          </span>
          <span className="about-hero__title-line about-hero__title-line--small">
            می‌سازیم
          </span>
        </h1>

        <div className="about-hero__description" ref={descRef}>
          <p>
            ولورا کد رابط‌هایی طراحی و می‌سازد که در آن‌ها حرکت، تایپوگرافی و
            مهندسی مثل یک سیستم واحد کار می‌کنند — برای برندهایی که می‌خواهند
            حضور دیجیتالشان حس شده باشد، نه فقط ساخته‌شده.
          </p>
        </div>

        <div className="about-hero__scroll" ref={scrollRef}>
          <span className="about-hero__scroll-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          اسکرول کنید
        </div>
      </div>
    </section>
  );
};

export default AboutHero;