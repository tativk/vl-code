import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpLeft } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const visualRef = useRef(null);
  const orbRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            descriptionRef.current,
            actionsRef.current,
            visualRef.current,
          ],
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
        eyebrowRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0 }
      )
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          actionsRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          visualRef.current,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 1.2 },
          "-=0.8"
        )
        .fromTo(
          gridRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          orbRef.current,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 0.6, scale: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          glowRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.8, duration: 1.4 },
          "-=0.8"
        );

      // Subtle ambient motion
      gsap.to(orbRef.current, {
        y: -18,
        scale: 1.05,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.05,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-final" ref={rootRef} dir="rtl">
      <div className="home-final__container">
        <div className="home-final__glow" ref={glowRef} aria-hidden="true" />

        <div className="home-final__visual" ref={visualRef} aria-hidden="true">
          <div className="home-final__grid" ref={gridRef} />
          <div className="home-final__orb" ref={orbRef} />
          <div className="home-final__nodes">
            <span className="home-final__node home-final__node--1" />
            <span className="home-final__node home-final__node--2" />
            <span className="home-final__node home-final__node--3" />
            <span className="home-final__node home-final__node--4" />
            <div className="home-final__connection" />
          </div>
        </div>

        <div className="home-final__content">
          <div className="home-final__eyebrow" ref={eyebrowRef}>
            <span>08</span>
            <span className="home-final__eyebrow-line" />
            <span>شروع کنیم</span>
          </div>

          <h2 className="home-final__title" ref={titleRef}>
            از ایده تا چیزی که
            <br />
            <span className="home-final__title-accent">
              واقعاً ساخته می‌شود.
            </span>
          </h2>

          <p className="home-final__description" ref={descriptionRef}>
            برای یادگیری، برای ساختن، برای حرکت. مسیر خودت را انتخاب کن.
          </p>

          <div className="home-final__actions" ref={actionsRef}>
            <a
              href="/learn"
              className="home-final__action home-final__action--learn"
            >
              <span className="home-final__action-number">01</span>
              <span className="home-final__action-text">
                شروع یادگیری
                <span className="home-final__action-label">LEARN</span>
              </span>
              <FiArrowUpLeft className="home-final__action-icon" />
            </a>

            <a
              href="/build"
              className="home-final__action home-final__action--build"
            >
              <span className="home-final__action-number">02</span>
              <span className="home-final__action-text">
                شروع یک پروژه
                <span className="home-final__action-label">BUILD</span>
              </span>
              <FiArrowUpLeft className="home-final__action-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;