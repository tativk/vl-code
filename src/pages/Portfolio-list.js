import React, { useMemo, useState } from "react";
import "./Portfolio-list.css";

import {
  FiArrowLeft,
  FiSearch,
  FiGlobe,
  FiClock,
  FiZap,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";

const portfolioData = [
  {
    id: 1,
    image: "/Asets/Portfolio_List1.png",
    title: "وب سایت شرکتی هیدا دکور",
    category: "وب سایت شرکتی",
    featured: true,
    status: "فعال",
    year: "۱۴۰۵",
    duration: "۱۸ روز",
    customer: "هیدا دکور",
    website: "www.hidadecor.ir",
    description:
      "طراحی و توسعه وب سایت شرکتی مدرن با رابط کاربری اختصاصی، سرعت بالا، ساختار سئو شده و پنل مدیریت حرفه‌ای.",
    technologies: ["React", "Laravel", "MySQL", "Cloudflare"],
    url: "/portfolio/1",
  },
  {
    id: 2,
    image: "/Asets/Portfolio_List2.png",
    title: "فروشگاه اینترنتی لوکس",
    category: "فروشگاهی",
    featured: false,
    status: "فعال",
    year: "۱۴۰۵",
    duration: "۲۵ روز",
    customer: "Luxury Shop",
    website: "www.luxshop.ir",
    description:
      "فروشگاه آنلاین حرفه‌ای با سیستم پرداخت، مدیریت محصولات، سبد خرید هوشمند و تجربه خرید سریع.",
    technologies: ["React", "NodeJS", "MongoDB", "Stripe"],
    url: "/portfolio/2",
  },
  {
    id: 3,
    image: "/Asets/Portfolio_List3.png",
    title: "داشبورد مدیریتی سازمانی",
    category: "پنل مدیریت",
    featured: true,
    status: "فعال",
    year: "۱۴۰۴",
    duration: "۲۲ روز",
    customer: "سازمان خصوصی",
    website: "www.dashboard.com",
    description:
      "داشبورد مدیریتی حرفه‌ای با نمودارهای لحظه‌ای، مدیریت کاربران و گزارش‌های پیشرفته.",
    technologies: ["React", "Express", "JWT", "ChartJS"],
    url: "/portfolio/3",
  },
  {
    id: 4,
    image: "/Asets/Portfolio_List4.png",
    title: "سامانه آموزش آنلاین",
    category: "آموزشی",
    featured: false,
    status: "فعال",
    year: "۱۴۰۵",
    duration: "۳۰ روز",
    customer: "آکادمی آموزشی",
    website: "www.learnplus.ir",
    description:
      "سامانه آموزش آنلاین شامل فروش دوره، آزمون، پنل مدرس و مدیریت دانشجویان.",
    technologies: ["React", "Laravel", "MySQL", "FFmpeg"],
    url: "/portfolio/4",
  },
  {
    id: 5,
    image: "/Asets/Portfolio_List5.png",
    title: "وب سایت اختصاصی برند",
    category: "وب سایت شرکتی",
    featured: true,
    status: "فعال",
    year: "۱۴۰۵",
    duration: "۲۰ روز",
    customer: "Brand Studio",
    website: "www.brandstudio.com",
    description:
      "طراحی وب سایت لوکس با انیمیشن‌های مدرن، تجربه کاربری اختصاصی و استانداردهای جهانی.",
    technologies: ["NextJS", "Tailwind", "SEO", "Cloudflare"],
    url: "/portfolio/5",
  },
];

const filters = [
  "همه",
  "وب سایت شرکتی",
  "فروشگاهی",
  "پنل مدیریت",
  "آموزشی",
];

export default function PortfolioList() {
  const [activeFilter, setActiveFilter] = useState("همه");
  const [search, setSearch] = useState("");

  const handleProjectClick = (url) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    window.location.href = url;
  };

  const projects = useMemo(() => {
    return portfolioData.filter((item) => {
      const categoryMatch =
        activeFilter === "همه" ? true : item.category === activeFilter;

      const searchMatch =
        item.title.includes(search) || item.description.includes(search);

      return categoryMatch && searchMatch;
    });
  }, [activeFilter, search]);

  return (
    <div className="vpl-page">
      <div className="vpl-overlay"></div>
      <div className="vpl-glow vpl-glow--one"></div>
      <div className="vpl-glow vpl-glow--two"></div>

      <section className="vpl-filter">
        <div className="vpl-container">
          <div className="vpl-filter-box">
            <div className="vpl-search-box">
              <FiSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو بین نمونه کارهای Velora Code..."
              />
            </div>

            <div className="vpl-filter-buttons">
              {filters.map((item) => (
                <button
                  key={item}
                  className={
                    activeFilter === item
                      ? "vpl-filter-btn vpl-filter-btn--active"
                      : "vpl-filter-btn"
                  }
                  onClick={() => setActiveFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="vpl-projects">
        <div className="vpl-container">
          <div className="vpl-projects-wrapper">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article className="vpl-card" key={project.id}>
                  <div
                    className="vpl-card-image-box"
                    onClick={() => handleProjectClick(project.url)}
                    style={{ cursor: "pointer" }}
                    role="link"
                    tabIndex={0}
                    aria-label={`مشاهده پروژه ${project.title}`}
                  >
                    <img src={project.image} alt={project.title} />

                    {project.featured && (
                      <div className="vpl-featured-label">
                        <FiAward />
                        پروژه ویژه
                      </div>
                    )}
                  </div>

                  <div className="vpl-card-content">
                    <div className="vpl-card-header">
                      <span className="vpl-project-category">
                        {project.category}
                      </span>
                      <h2>{project.title}</h2>
                    </div>

                    <p className="vpl-project-text">
                      {project.description}
                    </p>

                    <div className="vpl-technology-list">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="vpl-project-information">
                      <div className="vpl-info-box">
                        <FiCheckCircle />
                        <div>
                          <small>وضعیت</small>
                          <strong>{project.status}</strong>
                        </div>
                      </div>

                      <div className="vpl-info-box">
                        <FiClock />
                        <div>
                          <small>زمان اجرا</small>
                          <strong>{project.duration}</strong>
                        </div>
                      </div>

                      <div className="vpl-info-box">
                        <FiGlobe />
                        <div>
                          <small>کارفرما</small>
                          <strong>{project.customer}</strong>
                        </div>
                      </div>

                      <div className="vpl-info-box">
                        <FiZap />
                        <div>
                          <small>سال</small>
                          <strong>{project.year}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="vpl-card-actions">
                      <a
                        href={`https://${project.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vpl-website-link"
                      >
                        {project.website}
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>

                      <a
                        href={project.url}
                        className="vpl-view-project"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProjectClick(project.url);
                        }}
                      >
                        مشاهده پروژه
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="vpl-empty-project">
                موردی برای نمایش پیدا نشد
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="vpl-cta">
        <div className="vpl-container">
          <div className="vpl-cta-wrapper">
            <div className="vpl-cta-content">
              <h2>
                آماده‌اید برندتان را وارد{" "}
                <span className="vpl-gradient-text">کلاس جهانی</span>{" "}
                کنید؟
              </h2>

              <p>
                وب‌سایت شما فقط یک صفحه اینترنتی نیست؛ ویترین اعتبار، اعتماد و رشد
                برندتان است. در Velora Code، طراحی اختصاصی، توسعه اصولی، سئو حرفه‌ای،
                امنیت بالا و سرعت واقعی کنار هم قرار می‌گیرند تا خروجی پروژه در سطح
                برندهای جدی و آینده‌دار باشد.
              </p>

              <div className="vpl-cta-buttons">
                <a
                  href="/order-project"
                  className="vpl-primary-btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                >
                  سفارش پروژه
                  <FiArrowLeft />
                </a>

                <a
                  href="/about"
                  className="vpl-secondary-btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                >
                  آشنایی بیشتر با Velora Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}