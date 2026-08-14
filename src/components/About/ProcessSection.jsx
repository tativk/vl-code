import React, {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiCompass,
  FiLayers,
  FiCode,
  FiActivity,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "کشف",
    english: "DISCOVER",
    description:
      "قبل از طراحی، مسئله را می‌شناسیم؛ هدف، مخاطب و مسیر درست پروژه را مشخص می‌کنیم.",
    icon: FiCompass,
  },
  {
    number: "02",
    title: "طراحی",
    english: "DESIGN",
    description:
      "ساختار و زبان بصری محصول شکل می‌گیرد؛ از ایده‌ی اولیه تا جزئیاتی که تجربه را کامل می‌کنند.",
    icon: FiLayers,
  },
  {
    number: "03",
    title: "توسعه",
    english: "BUILD",
    description:
      "طرح به یک محصول واقعی تبدیل می‌شود؛ سریع، دقیق و با توجه به جزئیات فنی.",
    icon: FiCode,
  },
  {
    number: "04",
    title: "حرکت",
    english: "MOTION",
    description:
      "تعامل و انیمیشن به تجربه اضافه می‌شوند تا محصول فقط دیده نشود، بلکه زنده به نظر برسد.",
    icon: FiActivity,
  },
];

const AboutProcess = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const headingRef = useRef(null);
  const introRef = useRef(null);
  const stepsRef = useRef([]);

  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const refresh = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const mm = gsap.matchMedia();

      /*
       * =====================================================
       * DESKTOP / TABLET (چیدمان افقی)
       * چون CSS دقیقاً همین‌جا breakpoint می‌ذاره (767px)،
       * جاوااسکریپت هم باید همون مرز رو استفاده کنه، وگرنه
       * بین ۷۶۸ تا ۸۶۰ چیدمان با رفتار اسکرول ناهماهنگ میشه.
       * =====================================================
       */

      mm.add("(min-width: 768px)", () => {
        if (reduceMotion) {
          gsap.set(track, { clearProps: "transform" });

          if (progressRef.current) {
            gsap.set(progressRef.current, { width: "100%" });
          }

          return;
        }

        // نکته‌ی کلیدی: باید جهت خودِ track رو چک کنیم،
        // نه جهت section را — چون CSS مسیر حرکت افقی
        // (.about-process__track و __steps) رو عمداً
        // direction: ltr نگه داشته، حتی وقتی کل صفحه rtl هست.
        const isTrackRTL =
          getComputedStyle(track).direction === "rtl";
        const dirSign = isTrackRTL ? -1 : 1;

        const getDistance = () => {
          const totalWidth = track.scrollWidth;
          const viewportWidth = section.clientWidth;

          return Math.max(0, totalWidth - viewportWidth);
        };

        gsap.set(track, { x: 0 });

        const horizontalTween = gsap.to(track, {
          x: () => dirSign * getDistance(),

          ease: "none",
          overwrite: true,

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getDistance(), 1)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,

            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  width: `${self.progress * 100}%`,
                });
              }

              const idx = Math.min(
                processSteps.length - 1,
                Math.floor(
                  self.progress * processSteps.length
                )
              );

              setActiveStep((prev) =>
                prev === idx ? prev : idx
              );
            },
          },
        });

        const cards = stepsRef.current.filter(Boolean);

        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0.35, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            }
          );
        }

        return () => {
          horizontalTween.kill();

          if (horizontalTween.scrollTrigger) {
            horizontalTween.scrollTrigger.kill();
          }
        };
      });

      /*
       * =====================================================
       * MOBILE (چیدمان عمودی — دقیقاً هم‌راستا با CSS در max-width:767px)
       * =====================================================
       */

      mm.add("(max-width: 767px)", () => {
        gsap.set(track, { clearProps: "transform" });

        if (progressRef.current) {
          gsap.set(progressRef.current, { clearProps: "all" });
        }

        const cards = stepsRef.current.filter(Boolean);

        if (!cards.length || reduceMotion) {
          gsap.set(cards, {
            clearProps: "all",
            opacity: 1,
            y: 0,
          });

          return;
        }

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 55%",
                toggleActions: "play none none reverse",
                onEnter: () => setActiveStep(index),
              },
            }
          );
        });
      });
    }, section);

    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    const rafId = requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-process"
      dir="rtl"
      aria-labelledby="about-process-title"
    >
      <div className="about-process__inner">

        {/* HEADER */}
        <header className="about-process__header">
          <div
            ref={headingRef}
            className="about-process__heading-wrap"
          >
            <div className="about-process__label">
              <span>03</span>
              <span>چطور کار می‌کنیم</span>
            </div>

            <h2
              id="about-process-title"
              className="about-process__heading"
            >
              از ایده
              تا تجربه.
            </h2>
          </div>

          <div ref={introRef} className="about-process__intro">
            <p>
              هر پروژه مسیر خودش را دارد، اما یک اصل
              همیشه ثابت می‌ماند: قبل از حرکت، باید
              بدانیم به کجا می‌رویم.
            </p>
          </div>
        </header>

        {/* HORIZONTAL TRACK */}
        <div ref={trackRef} className="about-process__track">
          <div className="about-process__line">
            <span
              ref={progressRef}
              className="about-process__line-progress"
            />
          </div>

          <div className="about-process__steps">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  ref={(element) => {
                    stepsRef.current[index] = element;
                  }}
                  className={`about-process__step ${
                    activeStep === index ? "is-active" : ""
                  }`}
                >
                  <div className="about-process__step-marker">
                    <span className="about-process__step-number">
                      {step.number}
                    </span>
                  </div>

                  <div className="about-process__step-content">
                    <div className="about-process__step-top">
                      <span className="about-process__step-english">
                        {step.english}
                      </span>

                      <span
                        className="about-process__step-icon"
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                    </div>

                    <h3 className="about-process__step-title">
                      {step.title}
                    </h3>

                    <p className="about-process__step-description">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="about-process__step-glow"
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/* MOBILE PROGRESS DOTS (CSS الان همیشه مخفیش می‌کنه) */}
        <div
          className="about-process__mobile-progress"
          aria-hidden="true"
        >
          {processSteps.map((step, index) => (
            <span
              key={step.number}
              className={activeStep === index ? "is-active" : ""}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutProcess;
