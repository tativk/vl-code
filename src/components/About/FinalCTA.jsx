import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * =========================================
       * REDUCED MOTION
       * =========================================
       */

      if (reduceMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            textRef.current,
            buttonRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );

        return;
      }

      /*
       * =========================================
       * MAIN REVEAL
       * =========================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top 70%",

          once: true,
        },
      });

      timeline
        .fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,

            duration: 0.65,

            ease: "power3.out",
          }
        )

        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 65,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 1,

            ease: "power4.out",
          },
          "-=0.35"
        )

        .fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,

            duration: 0.65,

            ease: "power3.out",
          },
          "-=0.5"
        )

        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 25,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.65,

            ease: "back.out(1.5)",
          },
          "-=0.35"
        );

      /*
       * =========================================
       * GLOW MOVEMENT
       * =========================================
       */

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 80,
          y: -30,

          scale: 1.08,

          duration: 5,

          repeat: -1,

          yoyo: true,

          ease: "sine.inOut",
        });
      }

      /*
       * =========================================
       * PARALLAX
       * =========================================
       */

      gsap.to(glowRef.current, {
        yPercent: -18,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top bottom",

          end: "bottom top",

          scrub: 1.5,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="velora-section velora-cta"
      dir="rtl"
      aria-labelledby="about-cta-title"
    >
      {/* Ambient Glow */}

      <div
        ref={glowRef}
        className="velora-cta-glow"
        aria-hidden="true"
      />

      <div className="velora-cta-inner">

        {/* Eyebrow */}

        <div
          ref={eyebrowRef}
          className="velora-cta-eyebrow"
        >
          <span className="velora-cta-eyebrow-line" />

          <span>
            آماده‌ی شروع هستید؟
          </span>
        </div>


        {/* Title */}

        <h2
          ref={titleRef}
          id="about-cta-title"
          className="velora-cta-title"
        >
          بیایید چیزی
          <br />

          <span className="velora-gradient-text">
            متفاوت بسازیم.
          </span>
        </h2>


        {/* Description */}

        <p
          ref={textRef}
          className="velora-cta-text"
        >
          اگر ایده‌ای دارید که ارزش ساختن دارد،
          از همین‌جا شروع کنیم.
        </p>


        {/* Button */}

        <a
          ref={buttonRef}
          href="#contact"
          className="velora-cta-btn"
        >
          <span>
            شروع یک پروژه
          </span>

          <span
            className="velora-cta-btn-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>

      </div>
    </section>
  );
};

export default FinalCTA;