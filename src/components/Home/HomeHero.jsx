import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeHero = () => {
  const heroRef = useRef(null);
  const titleLinesRef = useRef([]);
  const brandRef = useRef(null);
  const metaRef = useRef(null);
  const statementRef = useRef(null);
  const keywordsRef = useRef(null);
  const scrollRef = useRef(null);
  const backgroundTypeRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const titleLines = titleLinesRef.current.filter(Boolean);

      /*
       * -----------------------------------------
       * Initial state
       * -----------------------------------------
       */

      gsap.set(hero, {
        autoAlpha: 1,
      });

      if (reduceMotion) {
        gsap.set(titleLines, {
          yPercent: 0,
          autoAlpha: 1,
        });

        gsap.set(
          [
            brandRef.current,
            metaRef.current,
            statementRef.current,
            keywordsRef.current,
            scrollRef.current,
          ],
          {
            autoAlpha: 1,
            clearProps: "transform",
          }
        );

        return;
      }

      /*
       * -----------------------------------------
       * Intro animation
       * -----------------------------------------
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          brandRef.current,
          {
            y: -12,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
          },
          0.15
        )

        .fromTo(
          metaRef.current,
          {
            y: -8,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
          },
          0.25
        )

        .fromTo(
          titleLines,
          {
            yPercent: 105,
          },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.1,
          },
          0.35
        )

        .fromTo(
          statementRef.current,
          {
            y: 18,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
          },
          0.95
        )

        .fromTo(
          keywordsRef.current,
          {
            y: 12,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
          },
          1.1
        )

        .fromTo(
          scrollRef.current,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.5,
          },
          1.35
        )

        .fromTo(
          backgroundTypeRef.current,
          {
            xPercent: 4,
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 1.4,
          },
          0.3
        );

      /*
       * -----------------------------------------
       * Background typography parallax
       *
       * روی xPercent/autoAlpha تداخلی نداره،
       * پس همون اول قابل ساختنه.
       * -----------------------------------------
       */

      if (backgroundTypeRef.current) {
        gsap.to(backgroundTypeRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      /*
       * -----------------------------------------
       * انیمیشن‌های مداوم / اسکرولی که روی
       * property مشترک با intro کار می‌کنن
       * (yPercent تیتر، opacity نشانگر اسکرول)
       *
       * این‌ها رو عمداً تا تمومِ شدنِ intro
       * به تعویق می‌ندازیم تا با تویین‌های
       * ورودی overwrite/تداخل نکنن.
       * -----------------------------------------
       */

      intro.eventCallback("onComplete", () => {
        ctx.add(() => {
          /*
           * حرکت بسیار کمِ تیتر هنگام اسکرول.
           * چون فقط بعد از پایان intro ساخته می‌شه،
           * مقدار شروعش دقیقاً yPercent:0 (حالت نهاییِ
           * انیمیشن ورود) capture می‌شه، نه یه مقدار
           * وسط‌راهِ تصادفی.
           */
          if (titleLines.length) {
            gsap.to(titleLines, {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          }

          /*
           * پالسِ آرومِ نشانگر اسکرول.
           * چون بعد از پایانِ fade-in (autoAlpha->1)
           * ساخته می‌شه، دیگه با اون تویین روی
           * opacity رقابت نمی‌کنه.
           */
          if (scrollRef.current) {
            gsap.to(scrollRef.current, {
              y: 8,
              opacity: 0.55,
              duration: 1.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        });
      });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="home-hero"
      dir="rtl"
      aria-labelledby="home-hero-title"
    >
      {/* =========================================
          Editorial Background Typography
      ========================================= */}

      <div
        ref={backgroundTypeRef}
        className="home-hero__background-type"
        aria-hidden="true"
      >
        <span className="home-hero__background-word home-hero__background-word--one">
          DESIGN
        </span>

        <span className="home-hero__background-word home-hero__background-word--two">
          DIGITAL
        </span>

        <span className="home-hero__background-word home-hero__background-word--three">
          MOTION
        </span>
      </div>

      {/* =========================================
          Brand
      ========================================= */}

      <div className="home-hero__brand">
        <span ref={brandRef} className="home-hero__brand-name">
          VELORA
        </span>

        <span ref={metaRef} className="home-hero__brand-meta">
          DIGITAL STUDIO
        </span>
      </div>

      {/* =========================================
          Main Content
      ========================================= */}

      <div className="home-hero__content">
        <div className="home-hero__eyebrow">
          <span className="home-hero__eyebrow-line" />
          <span>CREATIVE TECHNOLOGY</span>
        </div>

        <h1 id="home-hero-title" className="home-hero__title">
          <span className="home-hero__title-line">
            <span
              ref={(element) => {
                titleLinesRef.current[0] = element;
              }}
            >
              تجربه‌های
            </span>
          </span>

          <span className="home-hero__title-line">
            <span
              ref={(element) => {
                titleLinesRef.current[1] = element;
              }}
              className="home-hero__title-line-accent"
            >
              دیجیتال
            </span>
          </span>

          <span className="home-hero__title-line home-hero__title-line--small">
            <span
              ref={(element) => {
                titleLinesRef.current[2] = element;
              }}
            >
              ماندگار.
            </span>
          </span>
        </h1>

        <p ref={statementRef} className="home-hero__statement">
          برای چیزهایی که قرار نیست فقط دیده شوند.
        </p>

        <div
          ref={keywordsRef}
          className="home-hero__keywords"
          aria-label="Velora disciplines"
        >
          <span>DESIGN</span>
          <span>/</span>
          <span>CODE</span>
          <span>/</span>
          <span>MOTION</span>
        </div>
      </div>

      {/* =========================================
          Scroll
      ========================================= */}

      <div ref={scrollRef} className="home-hero__scroll" aria-hidden="true">
        <span>SCROLL</span>

        <span className="home-hero__scroll-line">
          <span />
        </span>
      </div>

      {/* =========================================
          Side Index
      ========================================= */}

      <div className="home-hero__index" aria-hidden="true">
        <span>01</span>
        <span className="home-hero__index-line" />
        <span>08</span>
      </div>
    </section>
  );
};

export default HomeHero;