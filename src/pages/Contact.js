import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";

import {
  FaPhoneAlt,
  FaMobileAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGithub,
  FaHeadset
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-ambient-glow"></div>

      <div className="contact-bg"></div>
      <div className="contact-overlay"></div>

      <div className="contact-container">
        <section className="contact-hero">
          <h1 className="contact-hero-title">
            <span className="contact-hero-fa">تماس با</span>
            <span className="contact-hero-brand">Velora Code</span>
          </h1>

          <p className="contact-hero-desc">
            <span className="contact-desc-full">
              اگر برای طراحی وب‌سایت، طراحی رابط کاربری، توسعه فرانت‌اند یا
              دریافت مشاوره درباره پروژه خود نیاز به راهنمایی دارید،
              از طریق راه‌های ارتباطی زیر با ما در ارتباط باشید.
              تیم Velora Code در سریع‌ترین زمان ممکن پاسخگوی شما خواهد بود.
            </span>
            <span className="contact-desc-short">
              برای همکاری، مشاوره یا دریافت خدمات طراحی و توسعه وب،
              با تیم Velora Code در ارتباط باشید.
            </span>
          </p>
        </section>

        <section className="contact-map-section">
          <div className="contact-map-card">
            <div className="contact-map-badge">
              <div className="contact-dot"></div>
              <span>دفتر مرکزی Velora Code</span>
            </div>

            <iframe
              title="موقعیت دفتر مرکزی Velora Code"
              src="https://maps.google.com/maps?q=34.297669340431256,48.830378713011136&z=17&output=embed"
              loading="lazy"
              allowFullScreen
            />

            <a
              className="contact-map-route"
              href="https://www.google.com/maps/dir/?api=1&destination=34.297669340431256,48.830378713011136"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="مسیریابی به دفتر مرکزی Velora Code"
            >
              مسیریابی
            </a>
          </div>
        </section>

        <div className="contact-grid">
          <div className="contact-glass">
            <div className="contact-section-title">
              <h2>اطلاعات تماس</h2>
              <div className="contact-section-line"></div>
            </div>

            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaPhoneAlt />
                </div>
                <h3>تلفن ثابت</h3>
                <p>
                  <a href="tel:08132278117" dir="ltr" className="contact-phone-number" aria-label="تماس با تلفن ثابت">
                    081-32278117
                  </a>
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaMobileAlt />
                </div>
                <h3>شماره موبایل</h3>
                <p>
                  <a href="tel:09376821896" dir="ltr" className="contact-phone-number" aria-label="تماس با شماره موبایل">
                    09376821896
                  </a>
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaEnvelope />
                </div>
                <h3>ایمیل</h3>
                <p>
                  <a href="mailto:info@velora-code.ir" aria-label="ارسال ایمیل به Velora Code">
                    info@velora-code.ir
                  </a>
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>آدرس دفتر</h3>
                <p>
                  استان همدان شهرستان ملایر  بلوار سیف الدوله
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaClock />
                </div>
                <h3>ساعات پاسخگویی</h3>
                <p>
                  شنبه تا چهارشنبه
                  <br />
                  ۰۸:۳۰ - ۱۳:۰۰ / ۱۶:۰۰ - ۲۰:۰۰
                  <br />
                  پنجشنبه: ۰۸:۳۰ - ۱۳:۰۰ &nbsp;&nbsp; | &nbsp;&nbsp; جمعه: تعطیل
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaGithub />
                </div>
                <h3>گیت‌هاب</h3>
                <p>
                  <a
                    href="https://github.com/velora-code"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/velora-code
                  </a>
                </p>
              </div>

              <div className="contact-info-card contact-support-card">
                <div className="contact-info-icon">
                  <FaHeadset />
                </div>
                <h3>پشتیبانی آنلاین</h3>
                <p>
                  برای دریافت راهنمایی و پاسخ به سوالات،
                  از طریق پشتیبانی آنلاین با ما در ارتباط باشید.
                </p>
                <Link to="/support" className="contact-support-btn">
                  دریافت پشتیبانی
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;