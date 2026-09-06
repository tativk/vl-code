import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiGit,
  SiHtml5,
  SiCss,
  SiReact,
  SiDjango,
  SiFastapi,
} from "react-icons/si";
import { FaRegClock, FaLayerGroup, FaArrowLeft } from "react-icons/fa";


gsap.registerPlugin(ScrollTrigger);

/* ---------- داده‌ی تب‌ها و دوره‌ها ---------- */
const TRACKS = [
  {
    id: "git",
    label: "Git",
    icon: SiGit,
    color: "#35f12f",
    glow: "rgba(108, 241, 47, 0.35)",
    courses: [
      {
        title: "مقدمات Git و کنترل نسخه",
        desc: "کامیت، برنچ، مرج و کار با ریپازیتوری محلی از صفر.",
        level: "مقدماتی",
        duration: "۶ ساعت",
        lessons: 24,
      },
      {
        title: "GitHub و همکاری تیمی",
        desc: "Pull Request، Code Review، Fork و گردش‌کار تیمی.",
        level: "متوسط",
        duration: "۵ ساعت",
        lessons: 19,
      },
      {
        title: "Git پیشرفته",
        desc: "Rebase، Cherry-pick، Reflog و حل تعارض‌های پیچیده.",
        level: "پیشرفته",
        duration: "۴ ساعت",
        lessons: 15,
      },
    ],
  },
  {
    id: "html",
    label: "HTML",
    icon: SiHtml5,
    color: "#e34f26",
    glow: "rgba(227, 79, 38, 0.35)",
    courses: [
      {
        title: "HTML5 از پایه",
        desc: "ساختار سند، تگ‌های معنایی و فرم‌های استاندارد.",
        level: "مقدماتی",
        duration: "۷ ساعت",
        lessons: 28,
      },
      {
        title: "HTML معنایی و دسترس‌پذیری",
        desc: "ARIA، ناوبری با کیبورد و ساخت صفحات قابل دسترس.",
        level: "متوسط",
        duration: "۴ ساعت",
        lessons: 16,
      },
    ],
  },
  {
    id: "css",
    label: "CSS",
    icon: SiCss,
    color: "#2965f1",
    glow: "rgba(41, 101, 241, 0.35)",
    courses: [
      {
        title: "CSS مدرن و ریسپانسیو",
        desc: "Flexbox، Grid، واحدهای نسبی و طراحی موبایل‌فرست.",
        level: "مقدماتی",
        duration: "۹ ساعت",
        lessons: 34,
      },
      {
        title: "انیمیشن و ترنزیشن",
        desc: "Keyframes، Transform و انیمیشن‌های بهینه روی GPU.",
        level: "متوسط",
        duration: "۵ ساعت",
        lessons: 20,
      },
      {
        title: "معماری استایل",
        desc: "BEM، متغیرهای CSS و ساخت دیزاین‌سیستم مقیاس‌پذیر.",
        level: "پیشرفته",
        duration: "۶ ساعت",
        lessons: 22,
      },
    ],
  },
  {
    id: "react",
    label: "React",
    icon: SiReact,
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.35)",
    courses: [
      {
        title: "React از صفر",
        desc: "کامپوننت، State، Props و رندر شرطی و لیستی.",
        level: "مقدماتی",
        duration: "۱۲ ساعت",
        lessons: 45,
      },
      {
        title: "هوک‌ها در عمل",
        desc: "useEffect، useMemo، useRef و ساخت هوک سفارشی.",
        level: "متوسط",
        duration: "۸ ساعت",
        lessons: 30,
      },
      {
        title: "مدیریت State و روتینگ",
        desc: "Context، Zustand و React Router در پروژه‌ی واقعی.",
        level: "پیشرفته",
        duration: "۱۰ ساعت",
        lessons: 38,
      },
    ],
  },
  {
    id: "django",
    label: "Django",
    icon: SiDjango,
    color: "#13865a",
    glow: "rgba(28, 158, 110, 0.35)",
    courses: [
      {
        title: "Django مقدماتی",
        desc: "مدل، ویو، تمپلیت و پنل ادمین در یک پروژه‌ی کامل.",
        level: "مقدماتی",
        duration: "۱۱ ساعت",
        lessons: 40,
      },
      {
        title: "Django REST Framework",
        desc: "سریالایزر، ViewSet، احراز هویت توکنی و مجوزها.",
        level: "متوسط",
        duration: "۹ ساعت",
        lessons: 33,
      },
    ],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    icon: SiFastapi,
    color: "#05998b",
    glow: "rgba(5, 153, 139, 0.35)",
    courses: [
      {
        title: "FastAPI و APIهای مدرن",
        desc: "Pydantic، Dependency Injection و مستندات خودکار.",
        level: "مقدماتی",
        duration: "۸ ساعت",
        lessons: 29,
      },
      {
        title: "Async و پایگاه داده",
        desc: "SQLAlchemy async، Alembic و تست با Pytest.",
        level: "متوسط",
        duration: "۷ ساعت",
        lessons: 26,
      },
      {
        title: "استقرار و مقیاس‌پذیری",
        desc: "Docker، Uvicorn/Gunicorn و مانیتورینگ سرویس.",
        level: "پیشرفته",
        duration: "۵ ساعت",
        lessons: 18,
      },
    ],
  },
];

export default function MainCourses() {
  const [activeId, setActiveId] = useState(TRACKS[0].id);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const tabsRef = useRef(null);
  const gridRef = useRef(null);
  const tabRefs = useRef([]);
  const firstRender = useRef(true);

  const activeTrack = TRACKS.find((t) => t.id === activeId) ?? TRACKS[0];

  /* انیمیشن ورودی سکشن با اسکرول */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const headItems = headRef.current
          ? Array.from(headRef.current.children)
          : [];
        const tabItems = tabsRef.current
          ? Array.from(tabsRef.current.querySelectorAll(".main-courses__tab"))
          : [];
        const cardItems = gridRef.current
          ? Array.from(gridRef.current.querySelectorAll(".main-courses__card"))
          : [];

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
            duration: 0.7,
            clearProps: "transform,opacity",
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        if (headItems.length) {
          tl.fromTo(
            headItems,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12 }
          );
        }

        if (tabItems.length) {
          tl.fromTo(
            tabItems,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06 },
            "-=0.35"
          );
        }

        if (cardItems.length) {
          tl.fromTo(
            cardItems,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1 },
            "-=0.3"
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set([...headItems, ...tabItems, ...cardItems], {
            clearProps: "transform,opacity",
          });
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* انیمیشن تعویض تب */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const cards = gridRef.current?.querySelectorAll(".main-courses__card");
    if (!cards?.length) return;

    const tween = gsap.fromTo(
      cards,
      { y: 28, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
      }
    );
    return () => tween.kill();
  }, [activeId]);

  /* ناوبری با کیبورد (RTL: جهت کلیدها معکوس) */
  const onTabKeyDown = (e, index) => {
    const last = TRACKS.length - 1;
    let next = null;

    if (e.key === "ArrowLeft") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowRight") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;

    e.preventDefault();
    setActiveId(TRACKS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      className="main-courses"
      dir="rtl"
      ref={sectionRef}
      aria-labelledby="main-courses-title"
    >
      <div className="main-courses__inner">
        <header className="main-courses__head" ref={headRef}>
          <span className="main-courses__badge">دوره‌های اصلی</span>
          <h2 className="main-courses__title" id="main-courses-title">
            مسیر تخصص خودت را انتخاب کن
          </h2>
          <p className="main-courses__subtitle">
            هر تکنولوژی، دوره‌های اختصاصی خودش را دارد. روی هر تب کلیک کن تا
            دوره‌های مربوط به آن را ببینی.
          </p>
        </header>

        {/* نوار تب‌ها */}
        <div
          className="main-courses__tabs"
          role="tablist"
          aria-label="انتخاب تکنولوژی"
          ref={tabsRef}
        >
          {TRACKS.map((track, i) => {
            const Icon = track.icon;
            const isActive = track.id === activeId;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                id={`tab-${track.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${track.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(el) => (tabRefs.current[i] = el)}
                onClick={() => setActiveId(track.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`main-courses__tab${
                  isActive ? " main-courses__tab--active" : ""
                }`}
                style={{
                  "--track-color": track.color,
                  "--track-glow": track.glow,
                }}
              >
                <Icon className="main-courses__tab-icon" aria-hidden="true" />
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>

        {/* پنل دوره‌ها */}
        <div
          className="main-courses__grid"
          role="tabpanel"
          id={`panel-${activeTrack.id}`}
          aria-labelledby={`tab-${activeTrack.id}`}
          ref={gridRef}
        >
          {activeTrack.courses.map((course) => {
            const Icon = activeTrack.icon;
            return (
              <article
                key={`${activeTrack.id}-${course.title}`}
                className="main-courses__card"
                style={{
                  "--track-color": activeTrack.color,
                  "--track-glow": activeTrack.glow,
                }}
              >
                <div className="main-courses__card-top">
                  <span className="main-courses__card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="main-courses__level">{course.level}</span>
                </div>

                <h3 className="main-courses__card-title">{course.title}</h3>
                <p className="main-courses__card-desc">{course.desc}</p>

                <ul className="main-courses__meta">
                  <li>
                    <FaRegClock aria-hidden="true" />
                    <span>{course.duration}</span>
                  </li>
                  <li>
                    <FaLayerGroup aria-hidden="true" />
                    <span>{course.lessons} درس</span>
                  </li>
                </ul>

                <a className="main-courses__cta" href={`#${activeTrack.id}`}>
                  <span>مشاهده دوره</span>
                  <FaArrowLeft aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
