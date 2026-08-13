import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "محسن مرادی",
    role: "مدیر پروژه",
    desc: "هماهنگی مسیر اجرا، زمان‌بندی و ارتباط شفاف با کارفرما.",
    initial: "م",
    photo: "/team/4.png",
  },
  {
    name: "آرمین گماسایی",
    role: "توسعه‌دهنده فرانت‌اند",
    desc: "پیاده‌سازی صفحات واکنش‌گرا با تمرکز روی کیفیت و سرعت.",
    initial: "آ",
    photo: "/team/1.png",
  },
  {
    name: "مبین محمدنژاد",
    role: "توسعه‌دهنده فرانت‌اند",
    desc: "پیاده‌سازی صفحات واکنش‌گرا با تمرکز روی کیفیت و سرعت.",
    initial: "م",
    photo: "/team/2.png",
  },
  {
    name: "محمدمهدی کمالی",
    role: "توسعه‌دهنده فرانت‌اند",
    desc: "پیاده‌سازی صفحات واکنش‌گرا با تمرکز روی کیفیت و سرعت.",
    initial: "م",
    photo: "/team/3.png",
  },
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = cardsRef.current.filter(Boolean);

      if (!cards.length) return;

      /*
       * اگر کاربر انیمیشن را غیرفعال کرده،
       * کارت‌ها از ابتدا کاملاً قابل مشاهده باشند.
       */
      if (reduceMotion) {
        gsap.set(cards, {
          clearProps: "all",
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });

        return;
      }

      /*
       * Initial state
       */

      gsap.set(cards, {
        autoAlpha: 0,
        y: 55,
        scale: 0.96,
      });

      /*
       * Cards reveal
       */

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,

        duration: 0.85,

        stagger: {
          each: 0.12,
          from: "start",
        },

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 72%",

          once: true,
        },
      });

      /*
       * Portrait subtle reveal
       */

      cards.forEach((card) => {
        const portrait = card.querySelector(
          ".velora-team-portrait"
        );

        const image = card.querySelector(
          ".velora-team-portrait img"
        );

        if (!portrait) return;

        gsap.fromTo(
          portrait,
          {
            clipPath:
              "inset(12% 12% 12% 12% round 24px)",
          },
          {
            clipPath:
              "inset(0% 0% 0% 0% round 17px)",

            duration: 1.1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: card,

              start: "top 82%",

              once: true,
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.08,
            },
            {
              scale: 1,

              duration: 1.3,

              ease: "power3.out",

              scrollTrigger: {
                trigger: card,

                start: "top 82%",

                once: true,
              },
            }
          );
        }
      });

      /*
       * Refresh بعد از کامل شدن layout
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="velora-section velora-team"
      id="team"
      dir="rtl"
      aria-labelledby="team-title"
    >
      <div className="velora-container">

        {/* Header */}

        <header className="velora-team-header">
          <div className="velora-eyebrow">
            اعضای تیم
          </div>

          <h2
            id="team-title"
            className="velora-values-title"
          >
            افرادی که
            <br />
            پشت ولورا کد هستند.
          </h2>

          <p className="velora-team-intro">
            ترکیبی از طراحی، توسعه و نگاه محصول؛
            آدم‌هایی که کنار هم ایده را به یک
            تجربه‌ی واقعی تبدیل می‌کنند.
          </p>
        </header>


        {/* Team Grid */}

        <div className="velora-team-grid">
          {TEAM.map((member, index) => (
            <article
              key={member.name}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="velora-team-card"
            >

              {/* Portrait */}

              <div className="velora-team-portrait">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="velora-team-initial"
                    aria-hidden="true"
                  >
                    {member.initial}
                  </span>
                )}
              </div>


              {/* Content */}

              <div className="velora-team-content">

                <div className="velora-team-meta">
                  <span className="velora-team-index">
                    0{index + 1}
                  </span>

                  <span className="velora-team-role">
                    {member.role}
                  </span>
                </div>

                <h3 className="velora-team-name">
                  {member.name}
                </h3>

                <p className="velora-team-desc">
                  {member.desc}
                </p>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;