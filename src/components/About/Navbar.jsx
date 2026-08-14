import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "نمونه‌کارها", href: "#work" },
  { label: "درباره ما", href: "#about" },
  { label: "تماس", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 120,
      end: 99999,
      onUpdate: (self) => {
        navRef.current?.classList.toggle("is-scrolled", self.scroll() > 120);
      },
    });
    return () => st.kill();
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);

    if (next) {
      gsap.set(menuRef.current, { pointerEvents: "auto" });
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.inOut" }
      );
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.2, ease: "expo.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "expo.inOut",
        onComplete: () => gsap.set(menuRef.current, { pointerEvents: "none" }),
      });
    }
  };

  return (
    <>
      <nav className="velora-nav" ref={navRef}>
        <a href="#top" className="velora-nav-logo">VELORA CODE</a>
        <ul className="velora-nav-links">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`velora-nav-toggle ${open ? "is-open" : ""}`}
          onClick={toggle}
          aria-label="باز و بسته کردن منو"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="velora-mobile-menu"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            ref={(el) => (linksRef.current[i] = el)}
            onClick={() => toggle()}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
