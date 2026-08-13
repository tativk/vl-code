import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpLeft } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: "01",
    title: "خلاقیت",
    text: "راه‌حل‌های تکراری برای ما کافی نیستند. هر پروژه باید زبان بصری و شخصیت خودش را داشته باشد.",
  },
  {
    number: "02",
    title: "دقت",
    text: "جزئیات کوچک، تجربه‌ی بزرگ را می‌سازند. از ساختار تا آخرین حرکت، هیچ چیز اتفاقی نیست.",
  },
  {
    number: "03",
    title: "تجربه",
    text: "ما فقط به چیزی که دیده می‌شود فکر نمی‌کنیم؛ مسیری را طراحی می‌کنیم که کاربر آن را حس می‌کند.",
  },
  {
    number: "04",
    title: "حرکت",
    text: "Motion برای نمایش قدرت تکنولوژی نیست؛ بخشی از داستان محصول و راهی برای هدایت تجربه است.",
  },
];

const AboutValues = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const mm = gsap.matchMedia();

      gsap.set([headingRef.current, introRef.current], {
        autoAlpha: 0,
        y: 40,
      });

      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: 70,
      });

      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      reveal
        .to(
          headingRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.85,
          },
          0
        )
        .to(
          introRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.7,
          },
          0.12
        )
        .to(
          cardsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.8,
            stagger: reduceMotion ? 0 : 0.09,
          },
          0.2
        )
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: reduceMotion ? 0 : 1,
            ease: "expo.out",
          },
          0.35
        );

      if (reduceMotion) return;

      /*
       * Desktop
       *
       * کارت‌ها هنگام ورود به viewport
       * کمی تغییر حالت می‌دهند.
       */
      mm.add("(min-width: 1024px)", () => {
        const cardAnimations = cardsRef.current.map((card, index) => {
          const cardNumber = card.querySelector(
            ".about-values__card-number"
          );

          const cardTitle = card.querySelector(
            ".about-values__card-title"
          );

          const cardArrow = card.querySelector(
            ".about-values__card-arrow"
          );

          const cardGlow = card.querySelector(
            ".about-values__card-glow"
          );

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "bottom 30%",
              scrub: 0.7,
            },
          });

          timeline
            .to(
              card,
              {
                y: index % 2 === 0 ? -12 : 12,
                ease: "none",
              },
              0
            )
            .to(
              cardNumber,
              {
                opacity: 1,
                x: 0,
                ease: "none",
              },
              0
            )
            .to(
              cardTitle,
              {
                x: index % 2 === 0 ? -8 : 8,
                ease: "none",
              },
              0
            )
            .to(
              cardArrow,
              {
                rotation: index % 2 === 0 ? -12 : 12,
                ease: "none",
              },
              0
            )
            .to(
              cardGlow,
              {
                opacity: 0.9,
                scale: 1.08,
                ease: "none",
              },
              0
            );

          return timeline;
        });

        return () => {
          cardAnimations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      });

      /*
       * Tablet
       */
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const animations = cardsRef.current.map((card) =>
          gsap.to(card, {
            y: -8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 35%",
              scrub: 1,
            },
          })
        );

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      });

      /*
       * Mobile
       *
       * بدون حرکت‌های پیچیده.
       */
      mm.add("(max-width: 767px)", () => {
        const animations = cardsRef.current.map((card) =>
          gsap.to(card, {
            y: -4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "bottom 40%",
              scrub: 1.3,
            },
          })
        );

        return () => {
          animations.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-values"
      dir="rtl"
      aria-labelledby="about-values-title"
    >
      <div className="about-values__inner">
        {/* Header */}
        <header className="about-values__header">
          <div
            ref={headingRef}
            className="about-values__heading-wrap"
          >
            <div className="about-values__label">
              <span>02</span>
              <span>آنچه به آن باور داریم</span>
            </div>

            <h2
              ref={headingRef}
              id="about-values-title"
              className="about-values__heading"
            >
              چهار اصل،
              <br />
              یک مسیر.
            </h2>
          </div>

          <div
            ref={introRef}
            className="about-values__intro"
          >
            <p>
              هر تصمیمی که در یک پروژه می‌گیریم باید دلیلی داشته
              باشد. این چهار اصل، پایه‌ی نگاه ما به طراحی و
              توسعه‌اند.
            </p>
          </div>
        </header>

        {/* Progress */}
        <div className="about-values__progress">
          <span>OUR PRINCIPLES</span>

          <div className="about-values__progress-track">
            <span ref={progressRef} />
          </div>

          <span>04</span>
        </div>

        {/* Cards */}
        <div className="about-values__grid">
          {values.map((value, index) => (
            <article
              key={value.number}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className={`about-values__card about-values__card--${index + 1}`}
            >
              <div className="about-values__card-glow" />

              <div className="about-values__card-top">
                <span className="about-values__card-number">
                  {value.number}
                </span>

                <span className="about-values__card-arrow">
                  <FiArrowUpLeft />
                </span>
              </div>

              <div className="about-values__card-content">
                <h3 className="about-values__card-title">
                  {value.title}
                </h3>

                <p className="about-values__card-text">
                  {value.text}
                </p>
              </div>

              <div className="about-values__card-line" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;