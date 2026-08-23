import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";


// آدرس تصویر بک‌گراند لپ‌تاپ - داخل پوشه public پروژه
const LAPTOP_IMAGE = "/Asets/2.png";

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const laptopImgRef = useRef(null);
  const floatTweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- ورود صفحه (Timeline) ---
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.set(
        [
          badgeRef.current,
          headingRef.current,
          paraRef.current,
          ctaRef.current,
          statsRef.current,
        ],
        { opacity: 0, y: 24 }
      )
        .set(laptopWrapRef.current, { opacity: 0, scale: 0.9, y: 30 })
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(
          laptopWrapRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power4.out" },
          "-=0.9"
        );

      // --- انیمیشن‌های ریسپانسیو ---
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTabletDown: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions;

          // شناور شدن ملایم و پیوسته‌ی تصویر لپ‌تاپ
          floatTweenRef.current = gsap.to(laptopImgRef.current, {
            y: isDesktop ? -16 : -8,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // پارالاکس با موس فقط روی دسکتاپ
          if (isDesktop) {
            const wrap = laptopWrapRef.current;

            const handleMove = (e) => {
              const rect = wrap.getBoundingClientRect();
              const relX = (e.clientX - rect.left) / rect.width - 0.5;
              const relY = (e.clientY - rect.top) / rect.height - 0.5;

              gsap.to(laptopImgRef.current, {
                rotateY: relX * 8,
                rotateX: -relY * 8,
                transformPerspective: 900,
                duration: 0.6,
                ease: "power2.out",
              });
            };

            const handleLeave = () => {
              gsap.to(laptopImgRef.current, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            };

            heroRef.current.addEventListener("mousemove", handleMove);
            heroRef.current.addEventListener("mouseleave", handleLeave);

            return () => {
              heroRef.current?.removeEventListener("mousemove", handleMove);
              heroRef.current?.removeEventListener("mouseleave", handleLeave);
            };
          }
        }
      );

      return () => mm.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} dir="rtl">
      <div className="hero__content">
        <span className="hero__badge" ref={badgeRef}>
          <span className="hero__badge-dot" />
          یادگیری، مسیر پیشرفت شماست
        </span>

        <h1 className="hero__heading" ref={headingRef}>
          از یادگیری امروز،
          <br />
          <span className="hero__heading-accent">مهارت</span> فردا را بساز.
        </h1>

        <p className="hero__paragraph" ref={paraRef}>
          بهترین دوره‌های برنامه‌نویسی و طراحی وب را باکیفیت بالا و به زبان
          ساده یاد بگیر.
        </p>

        <button className="hero__cta" ref={ctaRef} type="button">
          مسیر یادگیری من
        </button>

        <div className="hero__stats" ref={statsRef}>
          <div className="hero__stat">
            <strong>+12k</strong>
            <span>دانشجو فعال</span>
          </div>
          <div className="hero__stat">
            <strong>+85</strong>
            <span>دوره‌ی آموزشی</span>
          </div>
          <div className="hero__stat">
            <strong>98%</strong>
            <span>رضایت دانشجویان</span>
          </div>
        </div>
      </div>

      <div className="hero__laptop-wrap" ref={laptopWrapRef}>
        <img
          ref={laptopImgRef}
          className="hero__laptop-img"
          src={LAPTOP_IMAGE}
          alt="مسیر یادگیری برنامه‌نویسی"
          draggable="false"
        />
      </div>
    </section>
  );
}
