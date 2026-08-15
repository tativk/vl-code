import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiCode,
  FiTerminal,
  FiLayers,
  FiActivity,
  FiArrowLeft,
  FiClock,
  FiBarChart,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: "course-01",
    number: "01",
    category: "FRONTEND",
    title: "HTML & CSS",
    description:
      "ساخت پایه‌ای که هر تجربه دیجیتال روی آن شکل می‌گیرد؛ از ساختار صفحه تا طراحی رابط.",
    level: "مقدماتی",
    duration: "۱۲ ساعت",
    icon: FiCode,
    visual: "html-css",
    accent: "cyan",
    featured: true,
  },
  {
    id: "course-02",
    number: "02",
    category: "FRONTEND",
    title: "JavaScript",
    description:
      "منطق، تعامل و ساخت تجربه‌های واقعی با جاوااسکریپت و مفاهیم مدرن.",
    level: "متوسط",
    duration: "۱۸ ساعت",
    icon: FiTerminal,
    visual: "js",
    accent: "cyan",
    featured: false,
  },
  {
    id: "course-03",
    number: "03",
    category: "FRONTEND",
    title: "React",
    description:
      "ساخت رابط‌های مدرن و قابل توسعه با React و تفکر Component‌محور.",
    level: "پیشرفته",
    duration: "۲۰ ساعت",
    icon: FiLayers,
    visual: "react",
    accent: "cyan",
    featured: false,
  },
  {
    id: "course-04",
    number: "04",
    category: "ADVANCED",
    title: "Frontend Advanced",
    description:
      "انیمیشن، Performance و Architecture برای ساخت محصولات حرفه‌ای.",
    level: "پیشرفته",
    duration: "۲۴ ساعت",
    icon: FiActivity,
    visual: "advanced",
    accent: "coral",
    featured: false,
  },
];

const FeaturedCourses = () => {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const secondaryRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [headerRef.current, featuredRef.current, ...secondaryRefs.current],
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
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0 }
      )
        .fromTo(
          featuredRef.current,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0 },
          "-=0.4"
        )
        .fromTo(
          secondaryRefs.current,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, stagger: 0.1 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-courses" ref={rootRef} dir="rtl">
      <div className="home-courses__container">
        <header className="home-courses__header" ref={headerRef}>
          <div className="home-courses__eyebrow">
            <span>02</span>
            <span className="home-courses__eyebrow-line" />
            <span>آموزش</span>
          </div>

          <div className="home-courses__header-row">
            <h2 className="home-courses__heading">
              یادگیری،
              <br />
              از اولین خط شروع می‌شود.
            </h2>

            <a href="/courses" className="home-courses__all">
              مشاهده همه دوره‌ها
              <FiArrowLeft className="home-courses__all-icon" />
            </a>
          </div>

          <p className="home-courses__description">
            مسیر یادگیری ولورا با دوره‌های پروژه‌محور و کاربردی طراحی شده تا
            شما را قدم به قدم به یک توسعه‌دهنده واقعی تبدیل کند.
          </p>
        </header>

        <div className="home-courses__grid">
          {/* Featured course */}
          {courses
            .filter((course) => course.featured)
            .map((course) => (
              <article
                key={course.id}
                className={`home-course home-course--featured home-course--${course.accent}`}
                ref={featuredRef}
              >
                <div className="home-course__inner">
                  <div className="home-course__top">
                    <span className="home-course__number">{course.number}</span>
                    <span className="home-course__category">
                      {course.category}
                    </span>
                  </div>

                  <div className="home-course__icon">
                    <course.icon />
                  </div>

                  <h3 className="home-course__title">{course.title}</h3>
                  <p className="home-course__description">
                    {course.description}
                  </p>

                  <div className="home-course__meta">
                    <span>
                      <FiBarChart />
                      {course.level}
                    </span>
                    <span>
                      <FiClock />
                      {course.duration}
                    </span>
                  </div>

                  <a
                    href={`/courses/${course.id}`}
                    className="home-course__cta"
                    aria-label={`مشاهده دوره ${course.title}`}
                  >
                    مشاهده دوره
                    <FiArrowLeft className="home-course__cta-icon" />
                  </a>

                  <div className="home-course__visual">
                    <CourseVisual type={course.visual} />
                  </div>
                </div>
              </article>
            ))}

          {/* Secondary courses */}
          <div className="home-courses__secondary">
            {courses
              .filter((course) => !course.featured)
              .map((course, index) => (
                <article
                  key={course.id}
                  className={`home-course home-course--secondary home-course--${course.accent}`}
                  ref={(el) => (secondaryRefs.current[index] = el)}
                >
                  <div className="home-course__inner">
                    <div className="home-course__top">
                      <span className="home-course__number">{course.number}</span>
                      <span className="home-course__category">
                        {course.category}
                      </span>
                    </div>

                    <div className="home-course__icon">
                      <course.icon />
                    </div>

                    <h3 className="home-course__title">{course.title}</h3>
                    <p className="home-course__description">
                      {course.description}
                    </p>

                    <div className="home-course__meta">
                      <span>
                        <FiBarChart />
                        {course.level}
                      </span>
                      <span>
                        <FiClock />
                        {course.duration}
                      </span>
                    </div>

                    <a
                      href={`/courses/${course.id}`}
                      className="home-course__cta"
                      aria-label={`مشاهده دوره ${course.title}`}
                    >
                      مشاهده دوره
                      <FiArrowLeft className="home-course__cta-icon" />
                    </a>

                    <div className="home-course__visual">
                      <CourseVisual type={course.visual} />
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CourseVisual = ({ type }) => {
  switch (type) {
    case "html-css":
      return (
        <div className="course-visual course-visual--html">
          <div className="course-visual__grid-lines" />
          <span className="course-visual__tag">{"<h1>"}</span>
          <span className="course-visual__tag">{"</h1>"}</span>
          <span className="course-visual__tag course-visual__tag--css">
            {"{ display: grid; }"}
          </span>
        </div>
      );
    case "js":
      return (
        <div className="course-visual course-visual--js">
          <div className="course-visual__terminal">
            <span className="course-visual__prompt">&gt;</span>
            <span className="course-visual__code">{"let x = 42;"}</span>
            <span className="course-visual__cursor">|</span>
          </div>
        </div>
      );
    case "react":
      return (
        <div className="course-visual course-visual--react">
          <div className="course-visual__component">
            <span className="course-visual__node course-visual__node--root" />
            <span className="course-visual__node course-visual__node--child" />
            <span className="course-visual__node course-visual__node--child" />
            <div className="course-visual__links" />
          </div>
        </div>
      );
    case "advanced":
      return (
        <div className="course-visual course-visual--advanced">
          <div className="course-visual__timeline">
            <span className="course-visual__line" />
            <span className="course-visual__point course-visual__point--1" />
            <span className="course-visual__point course-visual__point--2" />
            <span className="course-visual__point course-visual__point--3" />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default FeaturedCourses;