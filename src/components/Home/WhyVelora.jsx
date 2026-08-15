import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    id: "clarity",
    number: "01",
    title: "وضوح",
    english: "CLARITY",
    description:
      "پیچیدگی را حذف می‌کنیم تا تجربه ساده‌تر و قابل فهم‌تر شود.",
  },
  {
    id: "craft",
    number: "02",
    title: "مهارت",
    english: "CRAFT",
    description:
      "به جزئیاتی اهمیت می‌دهیم که شاید دیده نشوند، اما حس می‌شوند.",
  },
  {
    id: "motion",
    number: "03",
    title: "حرکت",
    english: "MOTION",
    description:
      "حرکت را برای نمایش استفاده نمی‌کنیم؛ برای معنا دادن به تعامل استفاده می‌کنیم.",
  },
  {
    id: "impact",
    number: "04",
    title: "اثر",
    english: "IMPACT",
    description:
      "هدف ما ساخت چیزی نیست که فقط زیبا باشد؛ باید واقعاً کاربردی و ماندگار باشد.",
  },
];

const WhyVelora = () => {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const principlesRef = useRef([]);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [headerRef.current, ...principlesRef.current],
          { autoAlpha: 1, y: 0 }
        );
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleY: 1 });
        }
        return;
      }

      // Header
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Principles stagger
      gsap.fromTo(
        principlesRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );

      // Vertical progress line
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: principlesRef.current[0],
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-why" ref={rootRef} dir="rtl">
      <div className="home-why__container">
        <header className="home-why__header" ref={headerRef}>
          <div className="home-why__eyebrow">
            <span>05</span>
            <span className="home-why__eyebrow-line" />
            <span>چرا ولورا</span>
          </div>

          <h2 className="home-why__title">
            کد، وقتی ارزش دارد که
            <br />
            <span className="home-why__title-accent">چیزی را بهتر کند.</span>
          </h2>

          <p className="home-why__description">
            ولورا فقط یک استودیو یا پلتفرم آموزشی نیست؛ یک روش فکر کردن است.
            چهار اصل ساده اما عمیق، همه‌ی کارهای ما را شکل می‌دهند.
          </p>
        </header>

        <div className="home-why__content">
          <div className="home-why__principles">
            {principles.map((principle, index) => (
              <article
                key={principle.id}
                className="home-why__principle"
                ref={(el) => (principlesRef.current[index] = el)}
              >
                <div className="home-why__principle-number">
                  {principle.number}
                </div>
                <div className="home-why__principle-body">
                  <div className="home-why__principle-head">
                    <h3 className="home-why__principle-title">
                      {principle.title}
                    </h3>
                    <span className="home-why__principle-english">
                      {principle.english}
                    </span>
                  </div>
                  <p className="home-why__principle-description">
                    {principle.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="home-why__visual" aria-hidden="true">
            <div className="home-why__progress-track">
              <span ref={progressRef} className="home-why__progress-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVelora;