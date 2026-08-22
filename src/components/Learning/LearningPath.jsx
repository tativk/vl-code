import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGit, SiHtml5, SiCss, SiDjango, SiReact, SiCssmodules } from "react-icons/si";
import { FaBriefcase } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { id: "git", icon: SiGit, title: "Git", subtitle: "مدیریت نسخه پروژه", level: "متوسط", color: "#22c55e", glow: "rgba(34, 197, 94, 0.5)" },
  { id: "html", icon: SiHtml5, title: "HTML", subtitle: "ساختار صفحه", level: "مقدماتی", color: "#f1512a", glow: "rgba(241, 81, 42, 0.5)" },
 { id: "css", icon: SiCssmodules, title: "CSS", subtitle: "طراحی استایل", level: "مقدماتی", color: "#2965f1", glow: "rgba(41, 101, 241, 0.5)" },

  { id: "django", icon: SiDjango, title: "Django", subtitle: "فریمورک بکند", level: "پیشرفته", color: "#22c594", glow: "rgba(34, 197, 94, 0.5)" },
  { id: "react", icon: SiReact, title: "React", subtitle: "کتابخانه جاوااسکریپت", level: "پیشرفته", color: "#22d3ee", glow: "rgba(34, 211, 238, 0.5)" },
    { id: "job", icon: FaBriefcase, title: "استخدام", subtitle: "ورود به بازار کار", level: "پیشرفته", color: "#a855f7", glow: "rgba(168, 85, 247, 0.5)" },
];

// نقاط مرکز هر کارت روی گرید ۳ ستونه، داخل یک viewBox ثابت 1000x560
const POINTS = [
  { x: 175, y: 150 }, { x: 500, y: 150 }, { x: 825, y: 150 },
  { x: 175, y: 430 }, { x: 500, y: 430 }, { x: 825, y: 430 },
];

function buildPathD() {
  const [git, html, css, job, django, react] = POINTS;
  return `M ${git.x} ${git.y} L ${html.x} ${html.y} L ${css.x} ${css.y}
    C ${css.x + 90} ${css.y + 90}, ${job.x - 90} ${job.y - 90}, ${job.x} ${job.y}
    L ${django.x} ${django.y} L ${react.x} ${react.y}`;
}

export default function LearningPath() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const pathRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(cardsRef.current, { opacity: 0, y: 30 });
      gsap.set(trackRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(trackRef.current, { opacity: 1, duration: 0.4 })
            .to(path, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" }, "<");

          cardsRef.current.forEach((card, i) => {
            const node = NODES[i];
            tl.to(
              card,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                onStart: () => {
                  gsap.to(card, {
                    borderColor: node.color,
                    boxShadow: `0 0 0 1px ${node.glow}, 0 0 32px -6px ${node.glow}`,
                    duration: 0.5,
                  });
                },
              },
              i === 0 ? 0.2 : "-=0.05"
            ).fromTo(
              card.querySelector(".learning-path__icon"),
              { scale: 0.6 },
              { scale: 1, duration: 0.5, ease: "back.out(3)" },
              "<"
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="learning-path" ref={sectionRef} dir="rtl">
      <h2 className="learning-path__title">مسیر یادگیری</h2>

      <div className="learning-path__frame">
        <svg className="learning-path__track" ref={trackRef} viewBox="0 0 1000 560" preserveAspectRatio="none">
          <defs>
            <linearGradient id="learningPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="35%" stopColor="#2965f1" />
              <stop offset="65%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path d={buildPathD()} className="learning-path__track-bg" />
          <path d={buildPathD()} ref={pathRef} className="learning-path__track-fg" />
        </svg>

        <div className="learning-path__grid">
          {NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="learning-path__card"
                style={{ "--node-color": node.color, "--node-glow": node.glow }}
              >
                <div className="learning-path__icon">
                  <Icon size={28} color={node.color} />
                </div>
                <h3 className="learning-path__card-title">{node.title}</h3>
                <p className="learning-path__card-subtitle">{node.subtitle}</p>
                <span className="learning-path__card-level">{node.level}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}