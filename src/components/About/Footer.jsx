import React from "react";

const Footer = () => (
  <footer className="velora-footer">
    <span>© {new Date().getFullYear()} ولورا کد</span>
    <nav className="velora-footer-links">
      <a href="#top">بازگشت به بالا</a>
      <a href="#work">نمونه‌کارها</a>
      <a href="#about">درباره ما</a>
    </nav>
    <span>استودیوی توسعه‌ی خلاق</span>
  </footer>
);

export default Footer;
