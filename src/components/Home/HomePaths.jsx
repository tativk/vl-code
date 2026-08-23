import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiBookOpen,
  FiMonitor,
  FiArrowUpLeft,
  FiCode,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const LEARN_CODE_LINES = [
  'const skill = "React";',
  "await learn(skill);",
  "ship(project);",
];

const HomePaths = () => {
  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const headerRef = useRef(null);
  const learnRef = useRef(null);
  const buildRef = useRef(null);
  const learnVisualRef = useRef(null);
  const buildVisualRef = useRef(null);
  const buildBlocksWrapRef = useRef(null);
  const connectorPathRef = useRef(null);
  const learnNumberRef = useRef(null);
  const buildNumberRef = useRef(null);
  const learnSpotRef = useRef(null);
  const buildSpotRef = useRef(null);

  const [typedLines, setTypedLines] = useState([]);
  const [activeLine, setActiveLine] = useState("");
  const typingStarted = useRef(false);

  // ---- Typewriter runner ----
  const runTypewriter = () => {
    if (typingStarted.current) return;
    typingStarted.current = true;

    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (lineIndex >= LEARN_CODE_LINES.length) return;

      const currentLine = LEARN_CODE_LINES[lineIndex];

      if (charIndex <= currentLine.length) {
        setActiveLine(currentLine.slice(0, charIndex));
        charIndex += 1;
        setTimeout(typeNextChar, 28);
      } else {
        setTypedLines((prev) => [...prev, currentLine]);
        setActiveLine("");
        lineIndex += 1;
        charIndex = 0;
        setTimeout(typeNextChar, 260);
      }
    };

    typeNextChar();
  };

  const tiltCleanupRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
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
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        if (learnNumberRef.current) learnNumberRef.current.textContent = "01";
        if (buildNumberRef.current) buildNumberRef.current.textContent = "02";
        runTypewriter();
        return;
      }

      // ---- Entrance timeline ----
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
        )
        .add(() => {
          runTypewriter();

          // staggered build blocks
          if (buildBlocksWrapRef.current) {
            const targets = buildBlocksWrapRef.current.querySelectorAll(
              ".home-paths__visual-line, .home-paths__visual-block, .home-paths__visual-sidebar"
            );
            gsap.fromTo(
              targets,
              { autoAlpha: 0, scaleX: 0.4 },
              {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              }
            );
          }

          // number counters
          [
            { ref: learnNumberRef, to: 1 },
            { ref: buildNumberRef, to: 2 },
          ].forEach(({ ref, to }) => {
            if (!ref.current) return;
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: to,
              duration: 0.6,
              ease: "power1.out",
              onUpdate: () => {
                ref.current.textContent = String(
                  Math.round(proxy.val)
                ).padStart(2, "0");
              },
            });
          });
        }, "-=0.2");

      // ---- Connector line: draw on scroll (scrubbed) ----
      if (connectorPathRef.current) {
        const path = connectorPathRef.current;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }

      // ---- Tilt + spotlight (desktop / fine pointer only) ----
      if (canHover) {
        const setupTilt = (cardRef, spotRef, color) => {
          const card = cardRef.current;
          const spot = spotRef.current;
          if (!card || !spot) return;

          const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const rotateX =
              (0.5 - (e.clientY - rect.top) / rect.height) * 10;

            spot.style.setProperty("--spot-x", `${px}%`);
            spot.style.setProperty("--spot-y", `${py}%`);
            spot.style.setProperty("--spot-color", color);

            // GSAP sets transform via inline style, which always wins over
            // the CSS `:hover { transform: translateY(-6px) }` rule — so we
            // fold that lift into the same tween instead of relying on CSS.
            gsap.to(card, {
              rotateX,
              rotateY,
              y: -6,
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 900,
            });
          };

          const handleEnter = () => {
            spot.classList.add("home-paths__spotlight--active");
          };

          const handleLeave = () => {
            spot.classList.remove("home-paths__spotlight--active");
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
              duration: 0.5,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMove);
          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);

          return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseenter", handleEnter);
            card.removeEventListener("mouseleave", handleLeave);
          };
        };

        const cleanupLearn = setupTilt(
          learnRef,
          learnSpotRef,
          "rgba(0, 217, 255, 0.16)"
        );
        const cleanupBuild = setupTilt(
          buildRef,
          buildSpotRef,
          "rgba(255, 107, 107, 0.16)"
        );

        // gsap.context() does NOT treat this callback's return value as a
        // cleanup function (that's a useEffect convention, not a GSAP one),
        // so a `return () => {...}` here was silently discarded — the
        // mousemove/enter/leave listeners were never removed on unmount,
        // and in dev (React StrictMode / fast refresh) they'd double up,
        // making the tilt feel jumpy/duplicated. Store it instead.
        tiltCleanupRef.current = () => {
          cleanupLearn && cleanupLearn();
          cleanupBuild && cleanupBuild();
        };
      }
    }, rootRef);

    return () => {
      tiltCleanupRef.current && tiltCleanupRef.current();
      tiltCleanupRef.current = null;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <div className="home-paths__scene" ref={sceneRef}>
          {/* Connector: lives in the actual gap between the two cards,
              not stretched across their full width (their background is
              translucent, so anything drawn under them shows through). */}
          <div className="home-paths__connector-wrap" aria-hidden="true">
            <svg
              className="home-paths__connector"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="homePathsGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="var(--home-cyan)" />
                  <stop offset="50%" stopColor="var(--home-blue)" />
                  <stop offset="100%" stopColor="var(--home-violet)" />
                </linearGradient>
              </defs>
              <path
                ref={connectorPathRef}
                className="home-paths__connector-path"
                d="M 46 6 C 40 32, 52 58, 45 94"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Plain DOM circles instead of SVG <circle> — SVG's
                preserveAspectRatio="none" stretches non-uniformly to
                match the non-square container, which turns circles
                into ellipses. A regular element with fixed px size
                never has that problem. */}
            <span
              className="home-paths__connector-node"
              style={{ left: "46%", top: "6%" }}
            />
            <span
              className="home-paths__connector-node home-paths__connector-node--end"
              style={{ left: "45%", top: "94%" }}
            />
          </div>

          <div className="home-paths__grid">
            {/* LEARN */}
            <article
              className="home-paths__card home-paths__card--learn home-paths__card--tilt"
              ref={learnRef}
            >
              <div className="home-paths__card-bg" aria-hidden="true" />
              <div className="home-paths__spotlight" ref={learnSpotRef} />

              <div className="home-paths__card-content">
                <div className="home-paths__card-top">
                  <span
                    className="home-paths__card-number"
                    ref={learnNumberRef}
                  >
                    00
                  </span>
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
                      <span className="home-paths__visual-typing-flag">
                        <FiCode size={11} />
                      </span>
                    </div>
                    <div className="home-paths__visual-code">
                      {typedLines.map((line, i) => (
                        <code key={i} className="home-paths__code-line">
                          {line}
                        </code>
                      ))}
                      {activeLine !== "" && (
                        <code className="home-paths__code-line">
                          {activeLine}
                          <span className="home-paths__code-cursor" />
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* BUILD */}
            <article
              className="home-paths__card home-paths__card--build home-paths__card--tilt"
              ref={buildRef}
            >
              <div className="home-paths__card-bg" aria-hidden="true" />
              <div className="home-paths__spotlight" ref={buildSpotRef} />

              <div className="home-paths__card-content">
                <div className="home-paths__card-top">
                  <span
                    className="home-paths__card-number"
                    ref={buildNumberRef}
                  >
                    00
                  </span>
                  <span className="home-paths__card-english">BUILD</span>
                </div>

                <div className="home-paths__icon">
                  <FiMonitor />
                </div>

                <h3 className="home-paths__card-title">مسیر ساخت</h3>
                <p className="home-paths__card-text">
                  ایده‌ات را به محصول واقعی تبدیل کن؛ طراحی رابط، توسعه فرانت‌اند
                  و اجرای پروژه‌های دیجیتال با استانداردهای بالا.
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
                    <div
                      className="home-paths__visual-layout"
                      ref={buildBlocksWrapRef}
                    >
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
      </div>
    </section>
  );
};

export default HomePaths;
