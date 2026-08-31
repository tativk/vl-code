import React, { useEffect, useMemo, useRef, useState } from "react";
import "./FaqPage.css";

const CATEGORIES = [
  {
    id: "start",
    title: "شروع به کار",
    color: "var(--brand-cyan)",
    items: [
      { q: "ولورا کد چیست و برای چه کسانی مناسب است؟", a: "ولورا کد یک پلتفرم آموزش و اشتراک‌گذاری کد است که امکان یادگیری، تمرین و انتشار پروژه‌های برنامه‌نویسی را در یک محیط یکپارچه فراهم می‌کند؛ مناسب برای تازه‌کارها تا توسعه‌دهنده‌های حرفه‌ای." },
      { q: "چطور ثبت‌نام کنم؟", a: "با ایمیل یا حساب گیت‌هاب می‌توانید در کمتر از یک دقیقه ثبت‌نام کنید؛ فقط کافی است روی دکمه‌ی «شروع کنید» در صفحه‌ی اصلی بزنید." },
      { q: "آیا استفاده از ولورا کد رایگان است؟", a: "نسخه‌ی پایه کاملاً رایگان است و شامل دسترسی به دوره‌های عمومی و مخازن نامحدود می‌شود؛ امکانات پیشرفته‌تر در پلن‌های اشتراکی ارائه می‌شوند." },
      { q: "چه زبان‌های برنامه‌نویسی پشتیبانی می‌شوند؟", a: "در حال حاضر از پایتون، جاوااسکریپت، تایپ‌اسکریپت، گو، جاوا و سی‌پلاس‌پلاس پشتیبانی کامل می‌شود و فهرست به‌مرور گسترش پیدا می‌کند." },
    ],
  },
  {
    id: "account",
    title: "حساب کاربری",
    color: "var(--brand-blue)",
    items: [
      { q: "چطور رمز عبورم را تغییر بدهم؟", a: "از مسیر تنظیمات، بخش امنیت و سپس تغییر رمز عبور می‌توانید رمز فعلی را با یک رمز جدید جایگزین کنید." },
      { q: "می‌توانم نام کاربری‌ام را تغییر دهم؟", a: "بله، اما هر حساب فقط هر سی روز یک‌بار مجاز به تغییر نام کاربری است تا از سردرگمی در پروفایل‌های عمومی جلوگیری شود." },
      { q: "چطور حساب کاربری‌ام را حذف کنم؟", a: "از تنظیمات، بخش حساب کاربری و سپس حذف حساب اقدام کنید؛ توجه داشته باشید این عملیات غیرقابل بازگشت است و تمام پروژه‌های خصوصی شما حذف می‌شوند." },
      { q: "اگر رمز عبورم را فراموش کنم چه کار کنم؟", a: "از صفحه‌ی ورود گزینه‌ی «فراموشی رمز عبور» را بزنید تا لینک بازیابی به ایمیل ثبت‌شده‌ی شما ارسال شود." },
    ],
  },
  {
    id: "billing",
    title: "پرداخت و اشتراک",
    color: "var(--brand-blue-deep)",
    items: [
      { q: "پلن‌های اشتراک چه تفاوتی دارند؟", a: "پلن رایگان امکانات پایه را پوشش می‌دهد، پلن حرفه‌ای دسترسی به مخازن خصوصی نامحدود و ابزارهای هوش مصنوعی می‌دهد، و پلن تیمی برای همکاری گروهی طراحی شده است." },
      { q: "آیا می‌توانم اشتراکم را لغو کنم؟", a: "بله، هر زمان از تنظیمات صورتحساب می‌توانید اشتراک را لغو کنید و تا پایان دوره‌ی پرداخت‌شده همچنان به امکانات دسترسی دارید." },
      { q: "روش‌های پرداخت چه هستند؟", a: "پرداخت با کارت‌های بانکی داخلی و درگاه‌های بین‌المللی پشتیبانی می‌شود؛ فاکتور رسمی هم برای حساب‌های سازمانی صادر می‌شود." },
      { q: "آیا تخفیف دانشجویی وجود دارد؟", a: "بله، با ایمیل دانشگاهی معتبر می‌توانید پنجاه درصد تخفیف روی پلن حرفه‌ای دریافت کنید." },
    ],
  },
  {
    id: "projects",
    title: "پروژه‌ها و کد",
    color: "var(--brand-violet)",
    items: [
      { q: "چطور یک پروژه‌ی جدید بسازم؟", a: "از داشبورد روی «پروژه‌ی جدید» بزنید، زبان و قالب مورد نظر را انتخاب کنید و در چند ثانیه محیط کدنویسی آماده می‌شود." },
      { q: "آیا می‌توانم روی یک پروژه با دیگران همکاری کنم؟", a: "بله، با دعوت هم‌تیمی‌ها از طریق ایمیل یا لینک، می‌توانید به‌صورت هم‌زمان روی یک پروژه کار کنید." },
      { q: "چطور پروژه‌ام را عمومی یا خصوصی کنم؟", a: "از تنظیمات پروژه، بخش دسترسی را باز کنید و بین حالت عمومی و خصوصی یکی را انتخاب کنید؛ هر زمان هم قابل تغییر است." },
      { q: "محدودیت حجم پروژه‌ها چقدر است؟", a: "در پلن رایگان هر مخزن تا پانصد مگابایت و در پلن حرفه‌ای تا ده گیگابایت ظرفیت دارد." },
    ],
  },
  {
    id: "security",
    title: "امنیت و حریم خصوصی",
    color: "var(--brand-magenta)",
    items: [
      { q: "اطلاعات من چقدر امن است؟", a: "تمام داده‌ها هنگام انتقال و در حالت ذخیره‌سازی رمزنگاری می‌شوند؛ دسترسی به سرورها هم محدود به تیم امنیت است." },
      { q: "آیا کد خصوصی من توسط تیم ولورا کد دیده می‌شود؟", a: "خیر، مخازن خصوصی فقط برای خود شما و اعضای دعوت‌شده قابل مشاهده است، مگر با درخواست صریح شما برای پشتیبانی فنی." },
      { q: "چطور یک آسیب‌پذیری امنیتی را گزارش کنم؟", a: "از طریق فرم گزارش مسئولانه در صفحه‌ی امنیت می‌توانید گزارش بدهید؛ تیم امنیت حداکثر ظرف چهل‌وهشت ساعت پاسخ می‌دهد." },
      { q: "آیا احراز هویت دومرحله‌ای پشتیبانی می‌شود؟", a: "بله، از تنظیمات امنیت می‌توانید احراز هویت دومرحله‌ای را با اپلیکیشن‌های Authenticator فعال کنید." },
    ],
  },
];

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const toFa = (n) =>
  String(n)
    .split("")
    .map((d) => FA_DIGITS[+d] ?? d)
    .join("");

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, pct)));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useRevealOnScroll(deps) {
  const refs = useRef([]);
  refs.current = [];
  const register = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [deps]);

  return register;
}

export default function FaqPage() {
  const progress = useScrollProgress();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());
  const [activeChip, setActiveChip] = useState(CATEGORIES[0].id);

  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  // ===== تایپ انیمیشن =====
  const fullTitle = "سوالات متداول";
  const [typedTitle, setTypedTitle] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (typingIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setTypedTitle((prev) => prev + fullTitle[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, fullTitle]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.q.includes(q) || item.a.includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const registerReveal = useRevealOnScroll(filtered.length);

  let cellCounter = 0;

  const toggleCell = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToSection = (id) => {
    setActiveChip(id);
    const el = document.getElementById(id);
    if (el) {
      const headerEl = document.querySelector(".faq-sticky-header");
      const offset = headerEl ? headerEl.getBoundingClientRect().height + 12 : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setFormError("سوالت رو بنویس تا برات ارسالش کنیم.");
      return;
    }
    setFormError("");
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 900);
  };

  return (
    <div className="faq-page">
      <div
        className="faq-bg-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Asets/back.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="faq-bg-overlay"></div>

      <div className="faq-page__ambient" aria-hidden="true">
        <div className="faq-page__glow faq-page__glow--a" />
        <div className="faq-page__glow faq-page__glow--b" />
        <div className="faq-page__glow faq-page__glow--c" />
      </div>

      <div className="faq-progress" aria-hidden="true">
        <div className="faq-progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <header className="faq-sticky-header">
        <div className="faq-sticky-inner">
          <div className="faq-hero">
            <div className="faq-hero__window">
              <div className="faq-hero__dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="faq-hero__body">
                <h1 className="faq-hero__title">
                  {typedTitle}
                  <span className="faq-cursor">|</span>
                </h1>
                <p className="faq-hero__subtitle">
                 هر چیزی درون دهنت میگذرد رو تبدیل به سوال کن و اینجا  دنبال جوابش باش...
                </p>
                <div className="faq-hero__search">
                  <svg className="faq-hero__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجو در سوالات..."
                    aria-label="جستجو در سوالات متداول"
                  />
                </div>
              </div>
            </div>
          </div>

          <nav className="faq-toc" aria-label="فهرست دسته‌های سوالات">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`faq-toc__chip${activeChip === cat.id ? " is-active" : ""}`}
                style={{ "--chip-color": cat.color }}
                onClick={() => scrollToSection(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="faq-content">
        <div className="faq-content-inner">
          {filtered.length === 0 && (
            <p className="faq-empty">چیزی با این عبارت پیدا نشد؛ عبارت دیگری را امتحان کن.</p>
          )}

          {filtered.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="faq-block"
              style={{ "--accent": cat.color }}
              ref={registerReveal}
            >
              <h2 className="faq-block__title">{cat.title}</h2>

              {cat.items.map((item, i) => {
                cellCounter += 1;
                const cellId = `${cat.id}-${i}`;
                const isOpen = openIds.has(cellId);
                return (
                  <div className={`faq-cell${isOpen ? " is-open" : ""}`} key={cellId}>
                    <button
                      className="faq-cell__q"
                      onClick={() => toggleCell(cellId)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-cell__num">{toFa(cellCounter)}</span>
                      <span className="faq-cell__q-text">{item.q}</span>
                      <span className="faq-cell__toggle" aria-hidden="true">+</span>
                    </button>
                    <div className="faq-cell__a-wrap">
                      <div className="faq-cell__a-inner">
                        <p className="faq-cell__a">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          ))}

          <section className="faq-contact">
            <h2 className="faq-contact__title">سوال دیگری داری؟</h2>
            <p className="faq-contact__text">
              اگر جواب سوالت این‌جا نبود، مستقیم برامون بنویس؛ تیم پشتیبانی معمولاً ظرف چند ساعت پاسخ می‌ده.
            </p>

            {status === "sent" ? (
              <div className="faq-contact__success">
                <span className="faq-contact__success-icon">✓</span>
                <p className="faq-contact__text" style={{ marginBottom: 0 }}>
                  سوالت ارسال شد. به‌زودی از طریق ایمیل حسابت جواب می‌گیری.
                </p>
              </div>
            ) : (
              <form className="faq-contact__form" onSubmit={handleSubmit}>
                <textarea
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    if (formError) setFormError("");
                  }}
                  placeholder="سوالت رو این‌جا بنویس..."
                  aria-label="متن سوال"
                />
                {formError && <span className="faq-contact__error">{formError}</span>}
                <button className="faq-contact__btn" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "در حال ارسال..." : "ارسال سوال"}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}