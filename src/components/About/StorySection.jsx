import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutStory = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const visualRef = useRef(null);
  const visualLineRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * Initial state
       */
      gsap.set(
        [
          labelRef.current,
          headingRef.current,
          bodyRef.current,
        ],
        {
          autoAlpha: 0,
          y: 45,
        }
      );

      gsap.set(visualRef.current, {
        autoAlpha: 0,
        scale: 0.9,
        rotate: -5,
      });

      gsap.set(visualLineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      /*
       * Reveal
       */
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
          labelRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.65,
          },
          0
        )
        .to(
          headingRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.95,
          },
          0.08
        )
        .to(
          bodyRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.75,
          },
          0.25
        )
        .to(
          visualRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: reduceMotion ? 0 : 1.15,
          },
          0.12
        )
        .to(
          visualLineRef.current,
          {
            scaleX: 1,
            duration: reduceMotion ? 0 : 1,
            ease: "expo.out",
          },
          0.35
        );

      if (reduceMotion) return;

      /*
       * Desktop / tablet parallax
       */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const visualParallax = gsap.to(visualRef.current, {
          yPercent: -12,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        const contentParallax = gsap.to(contentRef.current, {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        return () => {
          visualParallax.kill();
          contentParallax.kill();
        };
      });

      /*
       * Mobile
       * فقط حرکت بسیار کم.
       */
      mm.add("(max-width: 767px)", () => {
        const mobileVisual = gsap.to(visualRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        return () => mobileVisual.kill();
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-story"
      dir="rtl"
      aria-labelledby="about-story-title"
    >
      <div className="about-story__inner">
        {/* Content */}
        <div ref={contentRef} className="about-story__content">
          <div ref={labelRef} className="about-story__label">
            <span className="about-story__number">01</span>
            <span>داستان ما</span>
          </div>

          <h2
            ref={headingRef}
            id="about-story-title"
            className="about-story__heading"
          >
            ما فقط وب‌سایت
            <br />
            نمی‌سازیم.
            <span> تجربه می‌سازیم.</span>
          </h2>

          <div ref={bodyRef} className="about-story__body">
            <p>
              در ولورا کد، طراحی و توسعه دو مسیر جدا از هم نیستند.
              ما این دو را کنار هم قرار می‌دهیم تا محصولاتی بسازیم
              که هم دقیق‌اند، هم شخصیت دارند.
            </p>

            <p>
              از اولین ایده تا آخرین حرکت، هر جزئیات بخشی از یک
              تجربه‌ی واحد است.
            </p>
          </div>
        </div>

        {/* Visual */}
        <div
          ref={visualRef}
          className="about-story__visual"
          aria-hidden="true"
        >
          <div className="about-story__visual-grid" />

          <div className="about-story__visual-orbit about-story__visual-orbit--one" />
          <div className="about-story__visual-orbit about-story__visual-orbit--two" />

          <div className="about-story__visual-core">
            <span />
          </div>

          <div className="about-story__visual-label">
            <span>DESIGN</span>
            <span>×</span>
            <span>CODE</span>
          </div>

          <div
            ref={visualLineRef}
            className="about-story__visual-line"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;