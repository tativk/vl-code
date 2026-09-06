import React from "react";
import { NavLink } from "react-router-dom";
import { FiInstagram, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import "./Layout.css";

const QUICK_LINKS = [
  { to: "/", label: "خانه" },
  { to: "/learning", label: "یادگیری" },
  { to: "/#projects", label: "نمونه‌کارها" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس" },
];

const SOCIALS = [
  { href: "https://instagram.com", icon: FiInstagram, label: "اینستاگرام" },
  { href: "https://t.me", icon: FiSend, label: "تلگرام" },
  { href: "https://github.com", icon: FiGithub, label: "گیت‌هاب" },
  { href: "https://linkedin.com", icon: FiLinkedin, label: "لینکدین" },
];

export default function Footer() {
  return (
    <footer className="footer" dir="rtl">
      <div className="footer__glow" aria-hidden="true" />

      <div className="footer__inner">
        <div className="footer__brand">
          <img
            src="/Asets/logo-bk.png"
            alt="Vl.Code"
            className="footer__logo-img"
          />
          <p className="footer__tagline">
            از ایده تا اجرا؛ طراحی و توسعه‌ی وب‌سایت‌ها و دوره‌های برنامه‌نویسی
            با کیفیت حرفه‌ای.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="footer__social"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">دسترسی سریع</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">تماس با ما</h4>
          <ul className="footer__links footer__links--info">
            <li>info@vlcode.ir</li>
            <li>۰۲۱-۰۰۰۰۰۰۰</li>
            <li>تهران، ایران</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Vl.Code — همه حقوق محفوظ است</span>
        <div className="footer__bottom-links">
          <a href="/privacy">حریم خصوصی</a>
          <a href="/terms">قوانین استفاده</a>
        </div>
      </div>
    </footer>
  );
}
