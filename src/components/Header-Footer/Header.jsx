import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMenu, FiX } from "react-icons/fi";
import "./Layout.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { to: "/", label: "خانه" },
  { to: "/learning", label: "یادگیری" },
  { to: "/portfolio", label: "نمونه‌کارها" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس" },
];

export default function Header() {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          headerRef.current.classList.toggle(
            "header--scrolled",
            self.scroll() > 80,
          );
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(
          ".header__mobile-link, .header__mobile-cta",
        ),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(mobileMenuRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <header className="header" ref={headerRef} dir="rtl">
        <div className="header__inner">
          <NavLink to="/" className="header__logo">
            <img
              src="/Asets/logo-bk.png"
              alt="Vl.Code"
              className="header__logo-img"
            />
          </NavLink>

          <nav className="header__nav">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  "header__link" + (isActive ? " header__link--active" : "")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <NavLink to="/login" className="header__cta">
              ثبت نام 
            </NavLink>
            <button
              className="header__burger"
              aria-label="باز کردن منو"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className="header__mobile-menu" ref={mobileMenuRef} dir="rtl">
        <button
          className="header__mobile-close"
          aria-label="بستن منو"
          onClick={() => setMenuOpen(false)}
        >
          <FiX size={26} />
        </button>
        <nav className="header__mobile-nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className="header__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="header__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            مشاوره رایگان
          </NavLink>
        </nav>
      </div>
    </>
  );
}
