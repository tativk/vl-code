import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpLeft } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const AboutTeaser = () => {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const visualRef = useRef(null);
  const statementRef = useRef(null);
  const orbRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [headingRef.current, paragraphRef.current, visualRef.current],
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0 }
      )
        .fromTo(
          paragraphRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          visualRef.current,
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          statementRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          orbRef.current,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 0.5, scale: 1, duration: 1.2 },
          "-=0.8"
        )
        .fromTo(
          gridRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "-=0.6"
        );

      // Subtle infinite motion
      gsap.to(orbRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-about" ref={rootRef} dir="rtl">
      <div className="home-about__container">
        <div className="home-about__content">
          <div className="home-about__eyebrow">
            <span>06</span>
            <span className="home-about__eyebrow-line" />
            <span>درباره ولورا</span>
          </div>

          <h2 className="home-about__title" ref={headingRef}>
            ما فقط دیجیتال نمی‌سازیم.
            <br />
            <span className="home-about__title-accent">تجربه می‌سازیم.</span>
          </h2>

          <p className="home-about__description" ref={paragraphRef}>
            ولورا جایی میان طراحی، تکنولوژی و یادگیری شکل گرفته؛ جایی که هر
            پروژه فرصتی برای ساختن چیزی دقیق‌تر، ساده‌تر و ماندگارتر است.
          </p>

          <a href="/about" className="home-about__cta">
            بیشتر درباره ولورا
            <FiArrowUpLeft className="home-about__cta-icon" />
          </a>
        </div>

        <div className="home-about__visual" ref={visualRef} aria-hidden="true">
          <div className="home-about__visual-grid" ref={gridRef} />
          <div className="home-about__visual-orb" ref={orbRef} />
          <div className="home-about__statement" ref={statementRef}>
            <span>DESIGN</span>
            <span className="home-about__statement-dot">.</span>
            <span>CODE</span>
            <span className="home-about__statement-dot">.</span>
            <span>MOTION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;