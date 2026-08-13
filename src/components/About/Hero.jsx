import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDownLeft } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const scrollRef = useRef(null);
  const visualRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * Initial state
       */

      gsap.set(
        [
          eyebrowRef.current,
          titleRef.current,
          descriptionRef.current,
          scrollRef.current,
        ],
        {
          opacity: 0,
          y: 35,
        }
      );

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      /*
       * Entrance
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.7,
        })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.9,
          },
          "-=0.4"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.7,
          },
          "-=0.45"
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.6,
          },
          "-=0.35"
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: reduceMotion ? 0 : 1,
            ease: "expo.out",
          },
          "-=0.3"
        );

      if (reduceMotion) {
        return;
      }

      /*
       * Desktop
       */

      mm.add("(min-width: 1024px)", () => {
        const titleParallax = gsap.to(titleRef.current, {
          y: -55,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        const visualParallax = gsap.to(visualRef.current, {
          y: 70,
          rotate: 3,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        return () => {
          titleParallax.scrollTrigger?.kill();
          titleParallax.kill();

          visualParallax.scrollTrigger?.kill();
          visualParallax.kill();
        };
      });

      /*
       * Tablet
       */

      mm.add(
        "(min-width: 768px) and (max-width: 1023px)",
        () => {
          const titleParallax = gsap.to(titleRef.current, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });

          return () => {
            titleParallax.scrollTrigger?.kill();
            titleParallax.kill();
          };
        }
      );

      /*
       * Mobile
       */

      mm.add("(max-width: 767px)", () => {
        /*
         * روی موبایل پارالاکس عنوان حذف می‌شود.
         * چون حرکت زیاد روی صفحه کوچک باعث بهم‌ریختگی می‌شود.
         */

        const visualAnimation = gsap.to(visualRef.current, {
          y: 30,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        return () => {
          visualAnimation.scrollTrigger?.kill();
          visualAnimation.kill();
        };
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-hero"
      aria-labelledby="about-hero-title"
    >
      <div className="about-hero__inner">

        <div
          ref={eyebrowRef}
          className="about-hero__eyebrow"
        >
          <span className="about-hero__eyebrow-number">
            01
          </span>

          <span>
            درباره‌ی ولورا کد
          </span>
        </div>

        <div
          ref={visualRef}
          className="about-hero__visual"
          aria-hidden="true"
        >
          <div className="about-hero__visual-ring about-hero__visual-ring--one" />
          <div className="about-hero__visual-ring about-hero__visual-ring--two" />
          <div className="about-hero__visual-glow" />
          <div className="about-hero__visual-core" />
        </div>

        <div className="about-hero__content">

          <h1
            ref={titleRef}
            id="about-hero-title"
            className="about-hero__title"
          >
            <span>تجربه‌های</span>

            <span className="about-hero__title-accent">
              دیجیتال
            </span>

            <span>
              فقط دیده نمی‌شوند.
            </span>

            <span className="about-hero__title-small">
              تجربه می‌شوند.
            </span>
          </h1>

          <div
            ref={descriptionRef}
            className="about-hero__description"
          >
            <span className="about-hero__description-line" />

            <p>
              ما طراحی، توسعه و حرکت را کنار هم قرار می‌دهیم
              تا هر محصول دیجیتال، فراتر از یک صفحه‌ی زیبا،
              یک تجربه‌ی ماندگار باشد.
            </p>
          </div>

        </div>

        <div
          ref={scrollRef}
          className="about-hero__scroll"
        >
          <span>اسکرول کنید</span>

          <FiArrowDownLeft />
        </div>

        <div
          ref={lineRef}
          className="about-hero__bottom-line"
        />

      </div>
    </section>
  );
};

export default Hero;