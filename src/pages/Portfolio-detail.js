import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiZap,
  FiChevronRight,
  FiLayers,
  FiTrendingUp,
  FiShield,
  FiImage,
  FiPlayCircle,
} from "react-icons/fi";
import { LuArrowUpRight } from "react-icons/lu";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./Portfolio-detail.css";

const portfolioData = [
  {
    id: 1,
    image: "/Asets/Portfolio_List1.png",
    title: "وب سایت شرکتی آرتا",
    category: "وب سایت شرکتی",
    status: "آنلاین",
    year: "۱۴۰۵",
    duration: "۱۸ روز",
    customer: "آرتا",
    website: "www.arta.ir",
    description:
      "طراحی یک وب سایت شرکتی مدرن با رابط کاربری اختصاصی، سئو تکنیکال، سرعت بسیار بالا و پنل مدیریت حرفه‌ای. تمام مراحل از تحقیق تا deployment با بالاترین استانداردها انجام شد.",
    technologies: ["React", "Laravel", "MySQL", "Cloudflare", "Framer Motion"],
    gallery: [
      { image: "/Asets/Portfolio_List1.png", alt: "صفحه اصلی" },
      { image: "/Asets/Portfolio_List1.png", alt: "درباره ما" },
      { image: "/Asets/Portfolio_List1.png", alt: "خدمات" },
      { image: "/Asets/Portfolio_List1.png", alt: "تماس" },
    ],
    video: "/Asets/Portfolio_List1.mp4",
    features: [
      { icon: "FiLayers", title: "طراحی اختصاصی", description: "رابط کاربری منحصربه‌فرد با جزئیات دقیق." },
      { icon: "FiTrendingUp", title: "سئو تکنیکال", description: "بهینه‌سازی کامل برای موتورهای جستجو." },
      { icon: "FiZap", title: "سرعت فوق‌العاده", description: "بارگذاری زیر ۲ ثانیه در تمام صفحات." },
      { icon: "FiShield", title: "امنیت بالا", description: "استفاده از پروتکل‌های امنیتی پیشرفته." },
    ],
    timeline: [
      { title: "تحقیق و برنامه‌ریزی", description: "تحلیل نیازها، رقبا و استراتژی محتوا." },
      { title: "طراحی UI/UX", description: "خلق وایرفریم و پروتوتایپ تعاملی." },
      { title: "توسعه Front-end", description: "پیاده‌سازی با React و Framer Motion." },
      { title: "توسعه Back-end", description: "راه‌اندازی Laravel و پایگاه داده." },
      { title: "تست و بهینه‌سازی", description: "تست عملکرد، امنیت و سئو." },
    ],
    lighthouse: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100 },
    review: {
      name: "مهندس رضایی",
      role: "مدیرعامل آرتا",
      quote: "تیم Velora Code فراتر از انتظار ما ظاهر شد. طراحی مدرن و سرعت بی‌نظیر سایت باعث افزایش چشمگیر بازدید و فروش ما شد.",
    },
    relatedProjects: [2, 3],
  },
  {
    id: 2,
    image: "/Asets/Portfolio_List2.png",
    title: "فروشگاه اینترنتی لوکس",
    category: "فروشگاهی",
    status: "آنلاین",
    year: "۱۴۰۵",
    duration: "۲۵ روز",
    customer: "Luxury Shop",
    website: "www.luxshop.ir",
    description:
      "فروشگاه آنلاین حرفه‌ای با سیستم پرداخت، مدیریت محصولات، سبد خرید هوشمند و تجربه خرید سریع.",
    technologies: ["React", "NodeJS", "MongoDB", "Stripe", "Redis"],
    gallery: [
      { image: "/Asets/Portfolio_List2.png", alt: "صفحه اصلی فروشگاه" },
      { image: "/Asets/Portfolio_List2.png", alt: "دسته‌بندی محصولات" },
      { image: "/Asets/Portfolio_List2.png", alt: "صفحه محصول" },
      { image: "/Asets/Portfolio_List2.png", alt: "سبد خرید" },
    ],
    video: "/Asets/Portfolio_List2.mp4",
    features: [
      { icon: "FiLayers", title: "مدیریت محصولات", description: "پنل قدرتمند برای مدیریت نامحدود محصولات." },
      { icon: "FiTrendingUp", title: "سیستم تخفیف هوشمند", description: "تخفیف‌های خودکار بر اساس رفتار کاربر." },
      { icon: "FiZap", title: "پرداخت امن", description: "درگاه پرداخت با رمزنگاری SSL." },
      { icon: "FiShield", title: "گزارش‌گیری پیشرفته", description: "نمودارهای فروش و رفتار مشتری." },
    ],
    timeline: [
      { title: "تحلیل بازار", description: "بررسی رقبا و نیازهای فروشگاه." },
      { title: "طراحی UI", description: "طراحی رابط کاربری با فوکوس بر خرید آسان." },
      { title: "توسعه Front-end", description: "React و مدیریت state با Redux." },
      { title: "توسعه Back-end", description: "Node.js و MongoDB." },
      { title: "یکپارچه‌سازی پرداخت", description: "اتصال به Stripe." },
    ],
    lighthouse: { performance: 95, accessibility: 98, bestPractices: 100, seo: 97 },
    review: {
      name: "سارا احمدی",
      role: "مدیر فروشگاه",
      quote: "افزایش ۴۰٪ فروش فقط در ماه اول بعد از راه‌اندازی فروشگاه جدید با تیم Velora Code.",
    },
    relatedProjects: [1, 5],
  },
  {
    id: 3,
    image: "/Asets/Portfolio_List3.png",
    title: "داشبورد مدیریتی سازمانی",
    category: "پنل مدیریت",
    status: "آنلاین",
    year: "۱۴۰۴",
    duration: "۲۲ روز",
    customer: "سازمان خصوصی",
    website: "www.orgdashboard.com",
    description:
      "پنل مدیریتی با نمودارهای لحظه‌ای، مدیریت کاربران و گزارش‌های پیشرفته برای تصمیم‌گیری سریع‌تر.",
    technologies: ["React", "Express", "JWT", "ChartJS", "Socket.io"],
    gallery: [
      { image: "/Asets/Portfolio_List3.png", alt: "داشبورد اصلی" },
      { image: "/Asets/Portfolio_List3.png", alt: "گزارش‌ها" },
      { image: "/Asets/Portfolio_List3.png", alt: "مدیریت کاربران" },
    ],
    video: "/Asets/Portfolio_List3.mp4",
    features: [
      { icon: "FiLayers", title: "مدیریت کاربران", description: "نقش‌های چندگانه با دسترسی‌های دقیق." },
      { icon: "FiTrendingUp", title: "گزارش‌های زنده", description: "نمودارهای Real-time با Socket.io." },
      { icon: "FiZap", title: "احراز هویت قوی", description: "JWT و تایید دومرحله‌ای." },
      { icon: "FiShield", title: "امنیت سازمانی", description: "محافظت در برابر حملات رایج." },
    ],
    timeline: [
      { title: "تحلیل نیازها", description: "جلسات با سهامداران." },
      { title: "طراحی معماری", description: "ساختار پایگاه داده و API." },
      { title: "توسعه Front-end", description: "React با Chart.js." },
      { title: "توسعه Back-end", description: "Express و WebSocket." },
      { title: "استقرار", description: "راه‌اندازی روی سرور اختصاصی." },
    ],
    lighthouse: { performance: 92, accessibility: 96, bestPractices: 100, seo: 100 },
    review: {
      name: "دکتر نوروزی",
      role: "مدیر IT سازمان",
      quote: "داشبوردی دقیقاً مطابق نیازمان تحویل گرفتیم و فرایندهای داخلی به‌طور محسوسی سریع‌تر شد.",
    },
    relatedProjects: [4, 5],
  },
  {
    id: 4,
    image: "/Asets/Portfolio_List4.png",
    title: "سامانه آموزش آنلاین",
    category: "آموزشی",
    status: "آنلاین",
    year: "۱۴۰۵",
    duration: "۳۰ روز",
    customer: "آکادمی آموزشی",
    website: "www.learnplus.academy",
    description:
      "سامانه فروش دوره، آزمون آنلاین، پنل مدرس و مدیریت دانشجویان با تمرکز بر تجربه کاربری روان.",
    technologies: ["React", "Laravel", "MySQL", "FFmpeg", "Storage"],
    gallery: [
      { image: "/Asets/Portfolio_List4.png", alt: "صفحه اصلی" },
      { image: "/Asets/Portfolio_List4.png", alt: "پنل دانشجو" },
      { image: "/Asets/Portfolio_List4.png", alt: "آزمون آنلاین" },
    ],
    video: "/Asets/Portfolio_List4.mp4",
    features: [
      { icon: "FiLayers", title: "پنل مدرس", description: "مدیریت دوره‌ها و دانشجویان." },
      { icon: "FiTrendingUp", title: "آزمون آنلاین", description: "طراحی آزمون با زمان‌بندی." },
      { icon: "FiZap", title: "پخش ویدئو امن", description: "محافظت از محتوای آموزشی." },
      { icon: "FiShield", title: "فروش دوره", description: "درگاه پرداخت و تخفیف." },
    ],
    timeline: [
      { title: "طراحی آموزشی", description: "ساختار دوره‌ها و نیازمندی‌ها." },
      { title: "توسعه Front-end", description: "React و پخش‌کننده ویدئو." },
      { title: "توسعه Back-end", description: "Laravel و مدیریت فایل." },
      { title: "یکپارچه‌سازی", description: "اتصال FFmpeg." },
      { title: "تست بارگذاری", description: "شبیه‌سازی ۱۰۰۰ کاربر همزمان." },
    ],
    lighthouse: { performance: 96, accessibility: 99, bestPractices: 100, seo: 98 },
    review: {
      name: "استاد کریمی",
      role: "مدیر آکادمی",
      quote: "فروش دوره‌ها ۶۰٪ افزایش یافت و دانشجویان تجربه بسیار بهتری از آزمون‌های آنلاین داشتند.",
    },
    relatedProjects: [1, 2],
  },
  {
    id: 5,
    image: "/Asets/Portfolio_List5.png",
    title: "وب سایت اختصاصی برند",
    category: "وب سایت شرکتی",
    status: "آنلاین",
    year: "۱۴۰۵",
    duration: "۲۰ روز",
    customer: "Brand Studio",
    website: "www.brandstudio.com",
    description:
      "وب سایتی لوکس با طراحی اختصاصی، انیمیشن‌های مدرن و استانداردهای جهانی برای ارتقای هویت برند.",
    technologies: ["React", "Next", "Tailwind", "Cloudflare", "SEO"],
    gallery: [
      { image: "/Asets/Portfolio_List5.png", alt: "صفحه اصلی" },
      { image: "/Asets/Portfolio_List5.png", alt: "خدمات" },
      { image: "/Asets/Portfolio_List5.png", alt: "نمونه کارها" },
      { image: "/Asets/Portfolio_List5.png", alt: "تماس" },
    ],
    video: "/Asets/Portfolio_List5.mp4",
    features: [
      { icon: "FiLayers", title: "طراحی لوکس", description: "جزئیات بصری خیره‌کننده." },
      { icon: "FiTrendingUp", title: "انیمیشن‌های مدرن", description: "Framer Motion برای تعامل." },
      { icon: "FiZap", title: "عملکرد بالا", description: "Next.js با SSG." },
      { icon: "FiShield", title: "سئو پیشرفته", description: "متحرک و بهینه برای گوگل." },
    ],
    timeline: [
      { title: "برندینگ", description: "تعریف هویت بصری." },
      { title: "طراحی UI", description: "پروتوتایپ تعاملی." },
      { title: "توسعه", description: "Next.js و Tailwind." },
      { title: "تست", description: "تست کراس براوزر." },
      { title: "راه‌اندازی", description: "Deploy و پشتیبانی." },
    ],
    lighthouse: { performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
    review: {
      name: "علی حسینی",
      role: "مدیر برند",
      quote: "وب‌سایت جدیدمان دقیقاً همان چیزی بود که برای ارتقای برند نیاز داشتیم.",
    },
    relatedProjects: [1, 3],
  },
];

const iconMap = {
  FiLayers: <FiLayers />,
  FiTrendingUp: <FiTrendingUp />,
  FiZap: <FiZap />,
  FiShield: <FiShield />,
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const project = portfolioData.find((p) => p.id === parseInt(id));

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mohammad-portfolio-detail-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [project]);

  if (!project) {
    return (
      <div
        className="mohammad-portfolio-detail-page"
        style={{ textAlign: "center", paddingTop: "150px" }}
      >
        <h2>پروژه‌ای یافت نشد</h2>
        <Link to="/portfolio-list" className="mohammad-portfolio-detail-back-nav">
          بازگشت به نمونه‌کارها
        </Link>
      </div>
    );
  }

  const relatedProjects = portfolioData.filter((p) =>
    project.relatedProjects.includes(p.id)
  );

  return (
    <div className="mohammad-portfolio-detail-page">
      <div className="mohammad-portfolio-detail-container">
        <div className="mohammad-portfolio-detail-hero">
          <img src={project.image} alt={project.title} />
          <div className="mohammad-portfolio-detail-hero-overlay" />

          <div className="mohammad-portfolio-detail-project-category-floating">
            {project.category}
          </div>

          <div className="mohammad-portfolio-detail-hero-info">
            <div className="mohammad-portfolio-detail-hero-content">
              <h1 className="mohammad-portfolio-detail-project-title">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="mohammad-portfolio-detail-card">
          <p className="mohammad-portfolio-detail-description">
            {project.description}
          </p>

          <div className="mohammad-portfolio-detail-tech-section">
            <div className="mohammad-portfolio-detail-section-label">
              <FiZap /> تکنولوژی‌های استفاده شده
            </div>
            <div className="mohammad-portfolio-detail-tech-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="mohammad-portfolio-detail-tech-item">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mohammad-portfolio-detail-info-grid">
            <div className="mohammad-portfolio-detail-info-card">
              <div className="mohammad-portfolio-detail-info-icon">
                <FiCheckCircle />
              </div>
              <div className="mohammad-portfolio-detail-info-content">
                <span>وضعیت</span>
                <strong>{project.status}</strong>
              </div>
            </div>
            <div className="mohammad-portfolio-detail-info-card">
              <div className="mohammad-portfolio-detail-info-icon">
                <FiClock />
              </div>
              <div className="mohammad-portfolio-detail-info-content">
                <span>مدت اجرا</span>
                <strong>{project.duration}</strong>
              </div>
            </div>
            <div className="mohammad-portfolio-detail-info-card">
              <div className="mohammad-portfolio-detail-info-icon">
                <FiGlobe />
              </div>
              <div className="mohammad-portfolio-detail-info-content">
                <span>کارفرما</span>
                <strong>{project.customer}</strong>
              </div>
            </div>
            <div className="mohammad-portfolio-detail-info-card">
              <div className="mohammad-portfolio-detail-info-icon">
                <FiZap />
              </div>
              <div className="mohammad-portfolio-detail-info-content">
                <span>سال اجرا</span>
                <strong>{project.year}</strong>
              </div>
            </div>
          </div>

          <div className="mohammad-portfolio-detail-preview-cards">
            <div
              className="mohammad-portfolio-detail-preview-card"
              onClick={() => setGalleryOpen(true)}
              style={{ backgroundImage: `url(${project.gallery[0].image})` }}
            >
              <div className="mohammad-portfolio-detail-preview-card-overlay" />
              <FiImage />
              <h3>گالری تصاویر</h3>
              <span>{project.gallery.length} تصویر</span>
            </div>
            <div
              className="mohammad-portfolio-detail-preview-card"
              onClick={() => setVideoOpen(true)}
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="mohammad-portfolio-detail-preview-card-overlay" />
              <FiPlayCircle />
              <h3>نمایش زنده پروژه</h3>
              <span>مشاهده ویدئو</span>
            </div>
          </div>

          {project.website && (
            <a
              href={`https://${project.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mohammad-portfolio-detail-gallery-live-btn"
            >
              مشاهده وب‌سایت پروژه
              <LuArrowUpRight />
            </a>
          )}

          <div
            className="mohammad-portfolio-detail-features-section mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[2] = el)}
          >
            <div className="mohammad-portfolio-detail-section-label">
              ویژگی‌های کلیدی
            </div>
            <div className="mohammad-portfolio-detail-features-grid">
              {project.features.map((feat, idx) => (
                <div key={idx} className="mohammad-portfolio-detail-feature-item">
                  <div className="mohammad-portfolio-detail-feature-icon">
                    {iconMap[feat.icon]}
                  </div>
                  <div className="mohammad-portfolio-detail-feature-text">
                    <h4>{feat.title}</h4>
                    <p>{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mohammad-portfolio-detail-timeline-section mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[3] = el)}
          >
            <div className="mohammad-portfolio-detail-section-label">
              مراحل انجام پروژه
            </div>
            <div className="mohammad-portfolio-detail-timeline">
              {project.timeline.map((item, idx) => (
                <div key={idx} className="mohammad-portfolio-detail-timeline-item">
                  <div className="mohammad-portfolio-detail-timeline-dot" />
                  <div className="mohammad-portfolio-detail-timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mohammad-portfolio-detail-lighthouse-section mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[4] = el)}
          >
            <div className="mohammad-portfolio-detail-section-label">
              امتیازات عملکرد
            </div>
            <div className="mohammad-portfolio-detail-lighthouse-grid">
              <div className="mohammad-portfolio-detail-lh-item">
                <div
                  className="mohammad-portfolio-detail-lh-circle"
                  style={{ "--score": project.lighthouse.performance }}
                >
                  <span>{project.lighthouse.performance}</span>
                </div>
                <div className="mohammad-portfolio-detail-lh-label">عملکرد</div>
              </div>
              <div className="mohammad-portfolio-detail-lh-item">
                <div
                  className="mohammad-portfolio-detail-lh-circle"
                  style={{ "--score": project.lighthouse.accessibility }}
                >
                  <span>{project.lighthouse.accessibility}</span>
                </div>
                <div className="mohammad-portfolio-detail-lh-label">دسترسی‌پذیری</div>
              </div>
              <div className="mohammad-portfolio-detail-lh-item">
                <div
                  className="mohammad-portfolio-detail-lh-circle"
                  style={{ "--score": project.lighthouse.bestPractices }}
                >
                  <span>{project.lighthouse.bestPractices}</span>
                </div>
                <div className="mohammad-portfolio-detail-lh-label">بهترین روش‌ها</div>
              </div>
              <div className="mohammad-portfolio-detail-lh-item">
                <div
                  className="mohammad-portfolio-detail-lh-circle"
                  style={{ "--score": project.lighthouse.seo }}
                >
                  <span>{project.lighthouse.seo}</span>
                </div>
                <div className="mohammad-portfolio-detail-lh-label">سئو</div>
              </div>
            </div>
          </div>

          <div
            className="mohammad-portfolio-detail-review-section mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[5] = el)}
          >
            <div className="mohammad-portfolio-detail-section-label">
              نظر مشتری
            </div>
            <div className="mohammad-portfolio-detail-review-card">
              <div className="mohammad-portfolio-detail-review-header">
                <div className="mohammad-portfolio-detail-review-avatar">👤</div>
                <div>
                  <div className="mohammad-portfolio-detail-review-name">
                    {project.review.name}
                  </div>
                  <div className="mohammad-portfolio-detail-review-role">
                    {project.review.role}
                  </div>
                </div>
              </div>
              <div className="mohammad-portfolio-detail-review-quote">
                {project.review.quote}
              </div>
            </div>
          </div>

          <div
            className="mohammad-portfolio-detail-related-section mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[6] = el)}
          >
            <div className="mohammad-portfolio-detail-section-label">
              پروژه‌های مشابه
            </div>
            <div className="mohammad-portfolio-detail-related-grid">
              {relatedProjects.map((p) => (
                <Link
                  to={`/portfolio/${p.id}`}
                  key={p.id}
                  className="mohammad-portfolio-detail-related-card"
                >
                  <img src={p.image} alt={p.title} />
                  <div className="mohammad-portfolio-detail-related-info">
                    <h4>{p.title}</h4>
                    <p>{p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div
            className="mohammad-portfolio-detail-final-cta mohammad-portfolio-detail-reveal"
            ref={(el) => (revealRefs.current[7] = el)}
          >
            <h2>آماده‌اید پروژه خود را شروع کنیم؟</h2>
            <p>با تیم حرفه‌ای Velora Code، کسب‌وکارتان را به سطح بعدی ببرید.</p>
            <div className="mohammad-portfolio-detail-actions">
              <Link
                to="/order-project"
                className="mohammad-portfolio-detail-btn mohammad-portfolio-detail-btn-primary"
              >
                <FiChevronRight />
                سفارش پروژه مشابه
              </Link>

              <Link
                to="/portfolio-list"
                className="mohammad-portfolio-detail-btn mohammad-portfolio-detail-btn-outline"
              >
                <FiArrowRight />
                مشاهده نمونه‌کارهای دیگر
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={galleryOpen}
        close={() => setGalleryOpen(false)}
        index={galleryIndex}
        slides={project.gallery.map((img) => ({ src: img.image }))}
      />

      {videoOpen && (
        <div
          className="mohammad-portfolio-detail-video-modal"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="mohammad-portfolio-detail-video-box"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              style={{ width: "100%", height: "100%", borderRadius: "16px" }}
            >
              <source src={project.video} type="video/mp4" />
              مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail;