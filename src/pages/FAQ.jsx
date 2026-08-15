import React, { useState } from "react";
import {
  FaSearch,
  FaQuestionCircle,
  FaUserCog,
  FaCreditCard,
  FaCode,
  FaHeadset,
  FaChevronDown,
} from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("همه");
  const [openIndex, setOpenIndex] = useState(null);

  // داده‌های سوالات
  const faqData = [
    {
      id: 1,
      category: "عمومی",
      question: "خدمات شما دقیقاً چیست و چگونه می‌توانم از آن استفاده کنم؟",
      answer:
        "ما یک پلتفرم جامع ارائه راهکارهای دیجیتال هستیم که شامل طراحی وب، بازاریابی محتوا و مشاوره فناوری اطلاعات می‌شود. شما می‌توانید با ثبت‌نام رایگان در وب‌سایت، از خدمات پایه استفاده کرده و در صورت نیاز، اشتراک حرفه‌ای تهیه کنید.",
    },
    {
      id: 2,
      category: "عمومی",
      question: "چگونه می‌توانم با تیم پشتیبانی تماس بگیرم؟",
      answer:
        "از سه راه می‌توانید با ما در ارتباط باشید: ۱) ارسال تیکت از طریق پنل کاربری، ۲) ارسال ایمیل به support@example.com، ۳) گفتگوی آنلاین در ساعات کاری (۹ صبح تا ۶ عصر). تیم ما معمولاً در کمتر از ۲۴ ساعت پاسخگو است.",
    },
    {
      id: 3,
      category: "حساب کاربری",
      question: "مراحل ثبت‌نام در سایت چگونه است؟",
      answer:
        "ثبت‌نام بسیار ساده است. کافی است روی دکمه «ثبت‌نام» در بالای صفحه کلیک کنید، ایمیل و رمز عبور خود را وارد کرده و روی «ایجاد حساب» بزنید. سپس یک ایمیل تأیید برای شما ارسال می‌شود که با کلیک روی لینک آن، حساب شما فعال می‌گردد.",
    },
    {
      id: 4,
      category: "حساب کاربری",
      question: "رمز عبور خود را فراموش کرده‌ام، چه باید بکنم؟",
      answer:
        "در صفحه ورود، روی گزینه «رمز عبور را فراموش کرده‌اید؟» کلیک کنید. ایمیل خود را وارد نمایید تا لینک بازنشانی رمز برای شما ارسال شود. پس از کلیک روی لینک، می‌توانید رمز جدیدی انتخاب کنید.",
    },
    {
      id: 5,
      category: "پرداخت",
      question: "روش‌های پرداخت مورد قبول شما چیست؟",
      answer:
        "ما انواع روش‌های پرداخت را پوشش می‌دهیم: کارت‌های اعتباری (ویزا، مسترکارت)، پرداخت اینترنتی از طریق درگاه بانکی، کیف پول دیجیتال (گوگل پی و اپل پی) و همچنین انتقال بانکی مستقیم.",
    },
    {
      id: 6,
      category: "پرداخت",
      question: "آیا امکان بازگشت وجه (Refund) وجود دارد؟",
      answer:
        "بله. اگر از خدمات ما راضی نبودید، تا ۳۰ روز پس از خرید، امکان درخواست بازگشت کامل وجه وجود دارد. کافی است درخواست خود را از طریق تیکت پشتیبانی ثبت کنید.",
    },
    {
      id: 7,
      category: "فنی",
      question: "سایت با چه مرورگرهایی سازگاری دارد؟",
      answer:
        "وب‌سایت ما با جدیدترین نسخه‌های مرورگرهای گوگل کروم، فایرفاکس، سافاری و مایکروسافت اج بهینه شده است. همچنین نسخه موبایل ما با اندروید و iOS کاملاً سازگار است.",
    },
    {
      id: 8,
      category: "فنی",
      question: "چگونه یک خطا یا باگ را به تیم فنی گزارش دهم؟",
      answer:
        "برای گزارش خطا، لطفاً از بخش «گزارش مشکل» در پنل کاربری استفاده کنید. توضیحات دقیق، تصویر اسکرین‌شات و مراحلی که منجر به خطا شده است را وارد نمایید.",
    },
    {
      id: 9,
      category: "پشتیبانی",
      question: "ساعات کاری پشتیبانی چگونه است؟",
      answer:
        "تیم پشتیبانی ما از شنبه تا پنجشنبه، ساعت ۹ صبح تا ۶ عصر پاسخگوی شماست. در روزهای تعطیل رسمی، پاسخ‌دهی با تأخیر انجام می‌شود.",
    },
    {
      id: 10,
      category: "پشتیبانی",
      question: "آیا امکان دریافت مشاوره تخصصی وجود دارد؟",
      answer:
        "بله، شما می‌توانید درخواست مشاوره تخصصی را از طریق فرم تماس با ما ثبت کنید. مشاوران ما در اسرع وقت با شما تماس می‌گیرند و جلسه مشاوره به‌صورت آنلاین یا حضوری برگزار می‌شود.",
    },
  ];

  // دسته‌بندی‌ها
  const categories = ["همه", "عمومی", "حساب کاربری", "پرداخت", "فنی", "پشتیبانی"];

  // فیلتر بر اساس جستجو و دسته
  const filteredData = faqData.filter((item) => {
    const matchCategory =
      activeFilter === "همه" || item.category === activeFilter;
    const matchSearch =
      item.question.includes(searchTerm) ||
      item.answer.includes(searchTerm);
    return matchCategory && matchSearch;
  });

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-bg"></div>
      <div className="faq-overlay"></div>

      <div className="faq-container">
        {/* هدر */}
        <header className="faq-hero">
          <h1 className="faq-hero-title">
            <span className="faq-hero-fa">سوالات متداول</span>
            <span className="faq-hero-brand">
              <span className="faq-brand-text">Velora Code</span>
              <span className="faq-brand-line"></span>
            </span>
          </h1>
          <p>
            پاسخ سوالات رایج خود را در اینجا بیابید. اگر پاسختان را پیدا نکردید،
            با پشتیبانی تماس بگیرید.
          </p>
        </header>

        {/* نوار جستجو و فیلتر */}
        <div className="faq-toolbar">
          <div className="faq-search-box">
            <FaSearch className="faq-search-icon" />
            <input
              type="text"
              placeholder="جستجوی سوال یا کلمه کلیدی ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="faq-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`faq-pill ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="faq-result-status">
            {filteredData.length} سوال یافت شد
          </div>
        </div>

        {/* لیست سوالات */}
        <div className="faq-list">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={item.id}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                >
                  <div className="faq-q-left">
                    <span className="faq-category-tag">{item.category}</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <span className="faq-toggle-icon">
                    <FaChevronDown />
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="faq-no-result">
              <FaQuestionCircle className="faq-no-icon" />
              <h3>هیچ نتیجه‌ای یافت نشد!</h3>
              <p>عبارت جستجو را تغییر دهید یا از فیلترهای دیگر استفاده کنید.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;