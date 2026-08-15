import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiBookOpen,
  FiMonitor,
  FiArrowUpLeft,
  FiCode,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const HomePaths = () => {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const learnRef = useRef(null);
  const buildRef = useRef(null);
  const learnVisualRef = useRef(null);
  const buildVisualRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            headerRef.current,
            learnRef.current,
            buildRef.current,
            learnVisualRef.current,
            buildVisualRef.current,
          ],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          }
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
        headerRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0 }
      )
        .fromTo(
          learnRef.current,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0 },
          "-=0.5"
        )
        .fromTo(
          buildRef.current,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0 },
          "-=0.6"
        )
        .fromTo(
          learnVisualRef.current,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          buildVisualRef.current,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 0.7 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-paths" ref={rootRef} dir="rtl">
      <div className="home-paths__container">
        <header className="home-paths__header" ref={headerRef}>
          <div className="home-paths__eyebrow">
            <span>01</span>
            <span className="home-paths__eyebrow-line" />
            <span>مسیرهای ولورا</span>
          </div>

          <h2 className="home-paths__heading">
            یاد بگیر.
            <br />
            بساز.
            <br />
            <span className="home-paths__heading-accent">حرکت کن.</span>
          </h2>

          <p className="home-paths__description">
            ولورا کد دو مسیر مکمل را کنار هم قرار می‌دهد تا از یادگیری تا اجرای
            پروژه‌های واقعی، یک جریان پیوسته بسازد.
          </p>
        </header>

        <div className="home-paths__grid">
          {/* LEARN */}
          <article
            className="home-paths__card home-paths__card--learn"
            ref={learnRef}
          >
            <div className="home-paths__card-bg" aria-hidden="true" />

            <div className="home-paths__card-content">
              <div className="home-paths__card-top">
                <span className="home-paths__card-number">01</span>
                <span className="home-paths__card-english">LEARN</span>
              </div>

              <div className="home-paths__icon">
                <FiBookOpen />
              </div>

              <h3 className="home-paths__card-title">مسیر یادگیری</h3>
              <p className="home-paths__card-text">
                از صفر شروع کن؛ با دوره‌های پروژه‌محور، تمرین‌های واقعی و
                پشتیبانی منتورها، مهارت‌های کدنویسی‌ات را هدفمند رشد بده.
              </p>

              <a href="#learn" className="home-paths__cta">
                مشاهده مسیر یادگیری
                <FiArrowUpLeft className="home-paths__cta-icon" />
              </a>

              <div className="home-paths__visual" ref={learnVisualRef}>
                <div className="home-paths__visual-window">
                  <div className="home-paths__visual-top">
                    <span className="home-paths__visual-dot home-paths__visual-dot--red" />
                    <span className="home-paths__visual-dot home-paths__visual-dot--yellow" />
                    <span className="home-paths__visual-dot home-paths__visual-dot--green" />
                  </div>
                  <div className="home-paths__visual-code">
                    <code>
                      <span className="home-paths__code-keyword">const</span>{" "}
                      <span className="home-paths__code-var">skill</span> ={" "}
                      <span className="home-paths__code-string">"React"</span>;
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* BUILD */}
          <article
            className="home-paths__card home-paths__card--build"
            ref={buildRef}
          >
            <div className="home-paths__card-bg" aria-hidden="true" />

            <div className="home-paths__card-content">
              <div className="home-paths__card-top">
                <span className="home-paths__card-number">02</span>
                <span className="home-paths__card-english">BUILD</span>
              </div>

              <div className="home-paths__icon">
                <FiMonitor />
              </div>

              <h3 className="home-paths__card-title">مسیر ساخت</h3>
              <p className="home-paths__card-text">
                ایده‌ات را به محصول واقعی تبدیل کن؛ طراحی رابط، توسعه فرانت‌اند و
                اجرای پروژه‌های دیجیتال با استانداردهای بالا.
              </p>

              <a href="#build" className="home-paths__cta">
                شروع ساخت پروژه
                <FiArrowUpLeft className="home-paths__cta-icon" />
              </a>

              <div className="home-paths__visual" ref={buildVisualRef}>
                <div className="home-paths__visual-browser">
                  <div className="home-paths__visual-browser-top">
                    <span className="home-paths__visual-dot" />
                    <span className="home-paths__visual-dot" />
                    <span className="home-paths__visual-dot" />
                  </div>
                  <div className="home-paths__visual-layout">
                    <div className="home-paths__visual-sidebar" />
                    <div className="home-paths__visual-main">
                      <div className="home-paths__visual-line home-paths__visual-line--long" />
                      <div className="home-paths__visual-line home-paths__visual-line--short" />
                      <div className="home-paths__visual-blocks">
                        <div className="home-paths__visual-block" />
                        <div className="home-paths__visual-block" />
                        <div className="home-paths__visual-block" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HomePaths;