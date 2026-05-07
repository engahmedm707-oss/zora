import { FanIcon, Mail, MapPin, Phone, Search, X } from "lucide-react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="zaura-footer">
      <div className="footer-container">
        {/* العمود الأول: عن البراند */}
        <div className="footer-column brand-col">
          <h2 className="footer-logo">ZAURA</h2>
          <p className="brand-desc">
            نحن نصنع الفن بأيدينا لنهديك قطعاً فريدة تحكي قصة إبداع في كل زاوية
            من منزلك.
          </p>
          <div className="social-links">
            <a href="#">
              <Search size={20} strokeWidth={1} />
            </a>
            <a href="#">
              <FanIcon size={18} />
            </a>
            <a href="#">
              <X size={18} />
            </a>
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="footer-column">
          <h3>روابط سريعة</h3>
          <ul>
            <li>
              <a href="#">الرئيسية</a>
            </li>
            <li>
              <a href="#">متجرنا</a>
            </li>
            <li>
              <a href="#">من نحن</a>
            </li>
            <li>
              <a href="#">سياسة التوصيل</a>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: الأقسام */}
        <div className="footer-column">
          <h3>أقسامنا</h3>
          <ul>
            <li>
              <a href="#">كروشيه</a>
            </li>
            <li>
              <a href="#">ريزون</a>
            </li>
            <li>
              <a href="#">لوحات فنية</a>
            </li>
            <li>
              <a href="#">ديكور منزل</a>
            </li>
          </ul>
        </div>

        {/* العمود الرابع: التواصل */}
        <div className="footer-column">
          <h3>اتصل بنا</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={16} color="var(--gold)" /> القاهرة، مصر
            </li>
            <li>
              <Phone size={16} color="var(--gold)" /> +20 123 456 789
            </li>
            <li>
              <Mail size={16} color="var(--gold)" /> info@zaura.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ZAURA HANDMADE. جميع الحقوق محفوظة.</p>
        <div className="payment-methods">
          {/* هنا ممكن تضيف صور فيزا وماستر كارد صغيرة */}
          <span>Visa</span>
          <span>MasterCard</span>
          <span>Cash</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
