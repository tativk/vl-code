import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "طراح رابط کاربری",
    text: "طراحی UI/UX جذاب و کاربرپسند برای تجربه‌ای دلنشین و تعامل بیشتر کاربران شما",
  },
  {
    title: "فرانت‌اند",
    text: "پیاده سازی رابط کاربری با تکنولوژی‌های مدرن و بهینه. متناسب با عملکرد بهینه",
  },
  {
    title: "بک‌اند",
    text: "طراحی و پیاده‌سازی سرویس‌ها و منطق کسب‌وکار با امنیت مقاس‌پذیری بالا",
  },
  {
    title: "واکنش‌گرا و بهینه‌سازی",
    text: "سازگاری کامل با موبایل و تبلت بهینه‌سازی سرعت و عمل کرد در همه دستگاه‌ها",
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".services__eyebrow", { opacity: 0, y: 16 });
      gsap.set(".services__title", { opacity: 0, y: 24 });
      gsap.set(".services__description", { opacity: 0, y: 20 });
      gsap.set(".services__card", { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.to(".services__eyebrow", { opacity: 1, y: 0, duration: 0.6 })
        .to(".services__title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".services__description", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(
          ".services__card",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.3"
        );

      // هاور روی کارت‌ها: بالا اومدن ملایم + روشن‌تر شدن border
      const cards = sectionRef.current.querySelectorAll(".services__card");
      cards.forEach((card) => {
        const icon = card.querySelector(".services__card-icon");
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            borderColor: "rgba(77, 141, 255, 0.5)",
            duration: 0.4,
            ease: "power3.out",
          });
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.4,
            ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            borderColor: "rgba(255, 255, 255, 0.08)",
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(icon, {
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services">
      <div className="services__container">
        <div className="services__header">
          <p className="services__eyebrow">خدمات ما</p>
          <h2 className="services__title">از ایده تا یک وبسایت واقعی</h2>
          <p className="services__description">
            ما در هر مرحله از مسیر در کنار شما هستیم تا با بهترین تجربه،
            پروژه‌ای با کیفیت تحویل دهیم.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <div className="services__card" key={service.title}>
              <div className="services__card-icon" />
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-text">{service.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="services__bg-glow" aria-hidden="true" />
    </section>
  );
};

export default Services;
