import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// آیکون‌های ساده و سبک برای هر دوره (بدون وابستگی به فایل خارجی)
const ReactIcon = () => (
  <svg viewBox="0 0 40 40" width="46" height="46">
    <circle cx="20" cy="20" r="3.2" fill="#22D3EE" />
    <g fill="none" stroke="#22D3EE" strokeWidth="1.6">
      <ellipse cx="20" cy="20" rx="16" ry="6.2" />
      <ellipse cx="20" cy="20" rx="16" ry="6.2" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="16" ry="6.2" transform="rotate(120 20 20)" />
    </g>
  </svg>
);

const DjangoIcon = () => (
  <span className="course-icon-text django-text">django</span>
);

const Html5Icon = () => (
  <svg viewBox="0 0 40 46" width="40" height="46">
    <path d="M4 2 L36 2 L33 34 L20 40 L7 34 Z" fill="#F16529" />
    <path d="M20 5 L20 37.2 L30.5 34 L33 8.4 Z" fill="#EA4C1F" />
    <text
      x="20"
      y="24"
      textAnchor="middle"
      fill="#fff"
      fontSize="9"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
    >
      HTML5
    </text>
  </svg>
);

const Css3Icon = () => (
  <svg viewBox="0 0 40 46" width="40" height="46">
    <path d="M4 2 L36 2 L33 34 L20 40 L7 34 Z" fill="#2965F1" />
    <path d="M20 5 L20 37.2 L30.5 34 L33 8.4 Z" fill="#1E56D6" />
    <text
      x="20"
      y="24"
      textAnchor="middle"
      fill="#fff"
      fontSize="10"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
    >
      CSS3
    </text>
  </svg>
);

const COURSES = [
  {
    id: "react",
    color: "#22D3EE",
    glow: "rgba(34, 211, 238, 0.45)",
    icon: <ReactIcon />,
    title: "React.js",
    subtitle: "دوره جامع React.js",
    level: "از مقدماتی تا پیشرفته",
    progress: 0,
    sessions: 52,
    hours: 15,
  },
  {
    id: "django",
    color: "#22C55E",
    glow: "rgba(34, 197, 94, 0.45)",
    icon: <DjangoIcon />,
    title: null,
    subtitle: "دوره کامل جنگو (Django)",
    level: "از مقدماتی تا پیشرفته",
    progress: 0,
    sessions: 52,
    hours: 15,
  },
  {
    id: "html",
    color: "#F1512A",
    glow: "rgba(239, 68, 68, 0.5)",
    icon: <Html5Icon />,
    title: "HTML5",
    subtitle: "آموزش HTML5",
    level: "مبتدی",
    progress: 0,
    sessions: 52,
    hours: 15,
  },
  {
    id: "css",
    color: "#2965F1",
    glow: "rgba(41, 101, 241, 0.45)",
    icon: <Css3Icon />,
    title: "CSS3",
    subtitle: "آموزش CSS",
    level: "مبتدی",
    progress: 0,
    sessions: 52,
    hours: 15,
  },
];

export default function PopularCourses() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isMobile: "(max-width: 639px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          gsap.set(cardsRef.current, { opacity: 0, y: isMobile ? 24 : 48 });

          ScrollTrigger.batch(cardsRef.current, {
            start: "top 85%",
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.12,
              }),
            once: true,
          });
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (e, color) => {
    gsap.to(e.currentTarget, {
      y: -6,
      duration: 0.35,
      ease: "power2.out",
      boxShadow: `0 0 0 1px ${color}, 0 18px 40px -12px ${color}80`,
    });
  };

  const handleLeave = (e, glow) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: `0 0 0 1px ${glow}, 0 0 24px -4px ${glow}`,
    });
  };

  return (
    <section className="popular-courses" ref={sectionRef} dir="rtl">
      <h2 className="popular-courses__title">دوره‌های پرطرفدار</h2>

      <div className="popular-courses__grid">
        {COURSES.map((course, i) => (
          <article
            key={course.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="course-card"
            style={{
              "--card-color": course.color,
              "--card-glow": course.glow,
            }}
            onMouseEnter={(e) => handleEnter(e, course.color)}
            onMouseLeave={(e) => handleLeave(e, course.glow)}
          >
            <div className="course-card__icon">{course.icon}</div>

            {course.title && (
              <h3 className="course-card__title">{course.title}</h3>
            )}
            <p className="course-card__subtitle">{course.subtitle}</p>
            <p className="course-card__level">{course.level}</p>

            <div className="course-card__progress-row">
              <span className="course-card__progress-value">
                {course.progress}%
              </span>
              <div className="course-card__progress-bar">
                <div
                  className="course-card__progress-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="course-card__meta">
              <span>{course.sessions} جلسه</span>
              <span>({course.hours}ساعت)</span>
            </div>

            <button className="course-card__cta" type="button">
              مشاهده دوره
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
