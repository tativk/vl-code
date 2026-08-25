"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowLeft,
  Clock3,
  LayoutGrid,
  Star,
} from "lucide-react";



gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "فروشگاه آنلاین هیوا",
    desc: "طراحی و توسعه یک فروشگاه اینترنتی حرفه‌ای با تجربه کاربری روان و امکانات پیشرفته",
    img: "/Asets/portfolio_card_1.png",
    tags: ["React / Next.js", "16 روز", "طراحی وب"],
    featured: true,
  },
  {
    id: "02",
    title: "وبسایت گردشگری روان",
    desc: "طراحی سایت گردشگری با تمرکز بر زیبایی بصری و نمایش جذاب مقاصد",
    img: "/Asets/portfolio_card_2.png",
    tags: ["UI/UX", "طراحی وب"],
  },
  {
    id: "03",
    title: "داشبورد مدیریتی دیتا",
    desc: "طراحی داشبورد مدیریت داده‌ها با گزارش‌های تحلیلی و نمودارهای پیشرفته",
    img: "/Asets/portfolio_card_3.png",
    tags: ["داشبورد", "فرانت‌اند"],
  },
  {
    id: "04",
    title: "فروشگاه پوشاک مانترا",
    desc: "طراحی سایت فروشگاهی مدرن برای برند پوشاک زنانه",
    img: "/Asets/portfolio_card_4.png",
    tags: ["فروشگاه اینترنتی", "طراحی وب"],
  },
];

export default function HomeProjects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const ctx = gsap.context((context) => {
      // ---------- Header reveal ----------
      gsap.from(".hp-head > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hp-head",
          start: "top 85%",
          once: true,
        },
      });

      // ---------- Cards reveal with ScrollTrigger ----------
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 140, scale: 0.9, rotateX: 18, opacity: 0 },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );

        const image = card.querySelector(".project-image img");
        const glow = card.querySelector(".card-glow");
        const content = card.querySelector(".project-content");
        const number = card.querySelector(".project-number");

        if (image && !reduceMotion) {
          gsap.to(image, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        if (glow && !reduceMotion) {
          gsap.to(glow, {
            backgroundPosition: "200% 0%",
            duration: 6,
            repeat: -1,
            ease: "linear",
          });
        }

        if (!reduceMotion && !isTouchDevice) {
          const hoverTl = gsap.timeline({ paused: true });

          hoverTl
            .to(card, {
              y: -10,
              scale: 1.015,
              duration: 0.45,
              ease: "power3.out",
            })
            .to(
              image,
              { scale: 1.08, rotate: -1, duration: 0.55, ease: "power3.out" },
              0
            )
            .to(content, { x: -8, duration: 0.45 }, 0)
            .to(
              number,
              {
                scale: 1.08,
                textShadow: "0 0 25px rgba(196,120,255,.9)",
                duration: 0.45,
              },
              0
            );

          const onEnter = () => hoverTl.play();
          const onLeave = () => hoverTl.reverse();

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);

          const rotateYTo = gsap.quickTo(card, "rotateY", {
            duration: 0.35,
            ease: "power3.out",
          });
          const rotateXTo = gsap.quickTo(card, "rotateX", {
            duration: 0.35,
            ease: "power3.out",
          });
          const imgXTo = gsap.quickTo(image, "x", {
            duration: 0.35,
            ease: "power3.out",
          });
          const imgYTo = gsap.quickTo(image, "y", {
            duration: 0.35,
            ease: "power3.out",
          });

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x / rect.width - 0.5) * 8;
            const rotateX = (y / rect.height - 0.5) * -8;

            rotateYTo(rotateY);
            rotateXTo(rotateX);
            imgXTo(rotateY * 1.5);
            imgYTo(rotateX * -1.5);
          };

          const handleMouseLeaveReset = () => {
            rotateYTo(0);
            rotateXTo(0);
            imgXTo(0);
            imgYTo(0);
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeaveReset);

          // پاک‌سازی رویدادها با context
          context.add(() => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeaveReset);
          });
        }
      });

      if (!reduceMotion) {
        const featuredCard = document.querySelector(".featured-card");
        if (featuredCard) {
          gsap.fromTo(
            featuredCard,
            {
              boxShadow:
                "0 0 60px rgba(70,120,255,.28), 0 0 120px rgba(188,92,255,.15)",
            },
            {
              boxShadow:
                "0 0 30px rgba(70,120,255,.15), 0 0 60px rgba(188,92,255,.1)",
              repeat: -1,
              yoyo: true,
              duration: 2.5,
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: featuredCard,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play pause resume pause",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-projects" ref={sectionRef}>
      <div className="hp-head">
        <span>نمونه کارها</span>
        <h2>پروژه‌هایی که گرفتیم</h2>
        <p>پروژه‌هایی که از ایده به محصول واقعی تبدیل کردیم</p>
      </div>

      <div className="projects-wrap">
        {projects.map((item, index) => (
          <article
            className={`project-card ${item.featured ? "featured-card" : ""}`}
            key={index}
          >
            <div className="card-glow" />
            <div className="project-number">
              <h1>{item.id}</h1>
              <span>پروژه /</span>
            </div>
            <div className="project-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="project-content">
              {item.featured && (
                <div className="featured-badge">
                  <Star size={14} />
                  پروژه منتخب
                </div>
              )}
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="meta">
                {item.featured && (
                  <>
                    <div>
                      <LayoutGrid size={18} />
                      <span>دسته‌بندی</span>
                      <b>طراحی وب</b>
                    </div>
                    <div>
                      <Clock3 size={18} />
                      <span>مدت زمان</span>
                      <b>16 روز</b>
                    </div>
                  </>
                )}
                <div>
                  <Star size={18} />
                  <span>تکنولوژی</span>
                  <b>{item.tags[0]}</b>
                </div>
              </div>
              <div className="tags">
                {item.tags.map((tag) => (
                  <label key={tag}>{tag}</label>
                ))}
              </div>
              {item.featured ? (
                <button className="view-btn">
                  مشاهده پروژه
                  <ArrowUpRight size={18} />
                </button>
              ) : (
                <button className="circle-btn">
                  <ArrowLeft size={26} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}