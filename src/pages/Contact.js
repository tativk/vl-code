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
      <div className="contact-bg"></div>
      <div className="contact-overlay"></div>

      <div className="contact-container">
        <section className="contact-hero">
          <h1 className="contact-hero-title">
            <span className="contact-hero-fa">تماس با ما</span>
            <span className="contact-hero-brand">
              <span className="contact-brand-text">Velora Code</span>
              <span className="contact-brand-line"></span>
            </span>
          </h1>
          <p>
            اگر برای طراحی وب‌سایت، طراحی رابط کاربری، توسعه فرانت‌اند یا
            دریافت مشاوره درباره پروژه خود نیاز به راهنمایی دارید،
            از طریق راه‌های ارتباطی زیر با ما در ارتباط باشید.
            تیم Velora Code در سریع‌ترین زمان ممکن پاسخگوی شما خواهد بود.
          </p>
        </section>

        <section className="contact-map-section">
          <div className="contact-map-card">
            <div className="contact-map-badge">
              <div className="contact-dot"></div>
              <span>دفتر مرکزی Velora Code</span>
            </div>

            <iframe
              title="Velora Code Location"
              src="https://maps.google.com/maps?q=استان%20همدان%20شهرستان%20ملایر%20بلوار%20قائم‌مقام%20میدان%20استاندارد%20خیابان%20خبرنگار%20کوچه%20باران&z=17&output=embed"
              loading="lazy"
              allowFullScreen
            />
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
                  <a href="tel:08132278117" dir="ltr" className="contact-phone-number">
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
                  <a href="tel:09376821896" dir="ltr" className="contact-phone-number">
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
                  <a href="mailto:info@velora-code.ir">info@velora-code.ir</a>
                </p>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>آدرس دفتر</h3>
                <p>
                  استان همدان، شهرستان ملایر
                  <br />
                  بلوار قائم‌مقام، میدان استاندارد
                  <br />
                  خیابان خبرنگار، کوچه باران
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