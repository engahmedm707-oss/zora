import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">صناعة يدوية بكل حب</span>
        <h1 className="hero-title">الفن يعيش في التفاصيل</h1>
        <p className="hero-description">
          قطع فنية فريدة تجمع بين أصالة التراث وعصرية التصميم، مصنوعة يدوياً
          لتناسب ذوقك الرفيع.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => navigate("/register")}>
            تسوق الآن
          </button>
          <button className="btn-secondary" onClick={() => navigate("/shop")}>
            اكتشف مجموعتنا
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
