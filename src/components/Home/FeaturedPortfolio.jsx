import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowUpLeft,
  FiExternalLink,
  FiMonitor,
  FiSmartphone,
  FiLayers,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "project-01",
    number: "01",
    title: "سایت شرکتی نوا",
    category: "Web Design / Development",
    description:
      "طراحی و توسعه یک وب‌سایت شرکتی مدرن با تمرکز بر هویت بصری، موشن و تجربه کاربری.",
    technologies: ["React", "GSAP", "CSS Architecture"],
    icon: FiMonitor,
    featured: true,
    visualType: "browser",
    accent: "cyan",
  },
  {
    id: "project-02",
    number: "02",
    title: "داشبورد تحلیل داده",
    category: "Product UI / Dashboard",
    description:
      "یک داشبورد تحلیلی با رابط کاربری پیچیده، نمودارهای تعاملی و معماری component‌محور.",
    technologies: ["React", "Chart.js", "Tailwind"],
    icon: FiLayers,
    featured: false,
    visualType: "dashboard",
    accent: "coral",
  },
  {
    id: "project-03",
    number: "03",
    title: "اپلیکیشن موبایل",
    category: "Mobile App / UX",
    description:
      "طراحی و توسعه یک اپلیکیشن موبایل با تعاملات لمسی روان و رابط کاربری مینیمال.",
    technologies: ["React Native", "Expo", "Lottie"],
    icon: FiSmartphone,
    featured: false,
    visualType: "mobile",
    accent: "cyan",
  },
];

const FeaturedPortfolio = () => {
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
          { autoAlpha: 0, y: 60, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          secondaryRefs.current,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8 },
          "-=0.6"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const featuredProject = projects.find((p) => p.featured);
  const secondaryProjects = projects.filter((p) => !p.featured);

  return (
    <section className="home-portfolio" ref={rootRef} dir="rtl">
      <div className="home-portfolio__container">
        <header className="home-portfolio__header" ref={headerRef}>
          <div className="home-portfolio__eyebrow">
            <span>03</span>
            <span className="home-portfolio__eyebrow-line" />
            <span>پروژه‌ها</span>
          </div>

          <div className="home-portfolio__header-row">
            <h2 className="home-portfolio__heading">
              چیزهایی که
              <br />
              ساخته‌ایم.
            </h2>

            <a href="/portfolio" className="home-portfolio__all">
              مشاهده همه پروژه‌ها
              <FiArrowUpLeft className="home-portfolio__all-icon" />
            </a>
          </div>

          <p className="home-portfolio__description">
            از وب‌سایت‌های شرکتی تا محصولات دیجیتال پیچیده؛ هر پروژه یک داستان
            از ایده تا اجرا دارد.
          </p>
        </header>

        <div className="home-portfolio__showcase">
          {/* Featured */}
          <article
            className={`home-portfolio__project home-portfolio__project--featured home-portfolio__accent-${featuredProject.accent}`}
            ref={featuredRef}
          >
            <div className="home-portfolio__project-inner">
              <div className="home-portfolio__project-visual">
                <ProjectVisual type={featuredProject.visualType} />
              </div>

              <div className="home-portfolio__project-info">
                <div className="home-portfolio__project-top">
                  <span className="home-portfolio__project-number">
                    {featuredProject.number}
                  </span>
                  <span className="home-portfolio__project-category">
                    {featuredProject.category}
                  </span>
                </div>

                <h3 className="home-portfolio__project-title">
                  {featuredProject.title}
                </h3>
                <p className="home-portfolio__project-description">
                  {featuredProject.description}
                </p>

                <div className="home-portfolio__tech-list">
                  {featuredProject.technologies.map((tech) => (
                    <span key={tech} className="home-portfolio__tech">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={`/portfolio/${featuredProject.id}`}
                  className="home-portfolio__project-link"
                  aria-label={`مشاهده پروژه ${featuredProject.title}`}
                >
                  مشاهده پروژه
                  <FiExternalLink className="home-portfolio__project-link-icon" />
                </a>
              </div>
            </div>
          </article>

          {/* Secondary */}
          <div className="home-portfolio__secondary">
            {secondaryProjects.map((project, index) => (
              <article
                key={project.id}
                className={`home-portfolio__project home-portfolio__project--secondary home-portfolio__accent-${project.accent}`}
                ref={(el) => (secondaryRefs.current[index] = el)}
              >
                <div className="home-portfolio__project-inner">
                  <div className="home-portfolio__project-visual">
                    <ProjectVisual type={project.visualType} />
                  </div>

                  <div className="home-portfolio__project-info">
                    <div className="home-portfolio__project-top">
                      <span className="home-portfolio__project-number">
                        {project.number}
                      </span>
                      <span className="home-portfolio__project-category">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="home-portfolio__project-title">
                      {project.title}
                    </h3>
                    <p className="home-portfolio__project-description">
                      {project.description}
                    </p>

                    <div className="home-portfolio__tech-list">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="home-portfolio__tech">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/portfolio/${project.id}`}
                      className="home-portfolio__project-link"
                      aria-label={`مشاهده پروژه ${project.title}`}
                    >
                      مشاهده پروژه
                      <FiExternalLink className="home-portfolio__project-link-icon" />
                    </a>
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

const ProjectVisual = ({ type }) => {
  switch (type) {
    case "browser":
      return (
        <div className="portfolio-visual portfolio-visual--browser">
          <div className="portfolio-visual__browser-top">
            <span className="portfolio-visual__browser-dot" />
            <span className="portfolio-visual__browser-dot" />
            <span className="portfolio-visual__browser-dot" />
            <div className="portfolio-visual__browser-url">
              <span>nova-studio.ir</span>
            </div>
          </div>
          <div className="portfolio-visual__browser-content">
            <div className="portfolio-visual__browser-nav">
              <span className="portfolio-visual__logo" />
              <span className="portfolio-visual__menu" />
              <span className="portfolio-visual__menu" />
              <span className="portfolio-visual__menu" />
            </div>
            <div className="portfolio-visual__browser-hero">
              <div className="portfolio-visual__hero-title">
                <span className="portfolio-visual__line" />
                <span className="portfolio-visual__line" />
                <span className="portfolio-visual__line portfolio-visual__line--short" />
              </div>
              <div className="portfolio-visual__hero-btn" />
            </div>
          </div>
        </div>
      );
    case "dashboard":
      return (
        <div className="portfolio-visual portfolio-visual--dashboard">
          <div className="portfolio-visual__sidebar" />
          <div className="portfolio-visual__dashboard-main">
            <div className="portfolio-visual__dashboard-top">
              <span className="portfolio-visual__dashboard-title" />
              <span className="portfolio-visual__dashboard-search" />
            </div>
            <div className="portfolio-visual__charts">
              <div className="portfolio-visual__chart portfolio-visual__chart--bar" />
              <div className="portfolio-visual__chart portfolio-visual__chart--line" />
            </div>
            <div className="portfolio-visual__stats">
              <span className="portfolio-visual__stat" />
              <span className="portfolio-visual__stat" />
              <span className="portfolio-visual__stat" />
            </div>
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className="portfolio-visual portfolio-visual--mobile">
          <div className="portfolio-visual__phone">
            <div className="portfolio-visual__phone-notch" />
            <div className="portfolio-visual__phone-content">
              <div className="portfolio-visual__phone-avatar" />
              <div className="portfolio-visual__phone-text">
                <span className="portfolio-visual__phone-line" />
                <span className="portfolio-visual__phone-line portfolio-visual__phone-line--short" />
              </div>
              <div className="portfolio-visual__phone-card" />
              <div className="portfolio-visual__phone-card portfolio-visual__phone-card--small" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default FeaturedPortfolio;