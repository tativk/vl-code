import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    id: "testimonial-01",
    quote:
      "ولورا دقیقاً همان جایی بود که لازم داشتم؛ نه فقط آموزش، بلکه یک مسیر واقعی برای تبدیل شدن به توسعه‌دهنده.",
    name: "علی رضایی",
    role: "Frontend Developer",
  },
  {
    id: "testimonial-02",
    quote:
      "پروژه‌ای که با تیم ولورا ساختیم، از نظر کیفیت و جزئیات فراتر از انتظار ما بود. همه‌چیز دقیق و به‌موقع تحویل شد.",
    name: "سارا محمدی",
    role: "Product Manager",
  },
  {
    id: "testimonial-03",
    quote:
      "برای اولین بار یادگیری کدنویسی برایم معنی پیدا کرد. دوره‌ها پروژه‌محور بودند و دقیقاً چیزی که یاد می‌گرفتم را می‌ساختم.",
    name: "محمد کریمی",
    role: "React Developer",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const roleRef = useRef(null);
  const reducedMotion = useRef(false);

  const animateQuote = useCallback((show) => {
    if (!quoteRef.current || !authorRef.current || !roleRef.current) return;

    if (reducedMotion.current || !show) {
      gsap.set([quoteRef.current, authorRef.current, roleRef.current], {
        autoAlpha: show ? 1 : 0,
        y: show ? 0 : 20,
      });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      [quoteRef.current, authorRef.current, roleRef.current],
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: "auto",
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    // Initial reveal
    animateQuote(true);
  }, [animateQuote]);

  useEffect(() => {
    animateQuote(true);
  }, [activeIndex, animateQuote]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="home-testimonials" dir="rtl">
      <div className="home-testimonials__container">
        <header className="home-testimonials__header">
          <div className="home-testimonials__eyebrow">
            <span>07</span>
            <span className="home-testimonials__eyebrow-line" />
            <span>تجربه دیگران</span>
          </div>
          <h2 className="home-testimonials__heading">
            حرف‌هایی که
            <br />
            بعد از تجربه می‌مانند.
          </h2>
        </header>

        <div className="home-testimonials__slider">
          <div className="home-testimonials__quote-mark" aria-hidden="true">
            “
          </div>

          <blockquote
            className="home-testimonials__quote"
            ref={quoteRef}
            aria-live="polite"
          >
            {current.quote}
          </blockquote>

          <div className="home-testimonials__author-wrapper">
            <span className="home-testimonials__author" ref={authorRef}>
              {current.name}
            </span>
            <span className="home-testimonials__role" ref={roleRef}>
              {current.role}
            </span>
          </div>

          <div className="home-testimonials__navigation">
            <button
              className="home-testimonials__button"
              onClick={handlePrev}
              aria-label="نظر قبلی"
            >
              <FiArrowRight />
            </button>
            <span className="home-testimonials__counter">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              className="home-testimonials__button"
              onClick={handleNext}
              aria-label="نظر بعدی"
            >
              <FiArrowLeft />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;