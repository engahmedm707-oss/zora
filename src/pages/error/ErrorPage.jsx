import { Link } from "react-router-dom"; // لو بتستخدم Router
import { Compass } from "lucide-react"; // أيقونة البوصلة من Lucide
import "../../styles/error.css";

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-icon">
          <Compass size={80} strokeWidth={1} color="var(--gold)" />
        </div>
        <h1 className="error-code">404</h1>
        <h2 className="error-title">يبدو أنك تهت في عالم الفن</h2>
        <p className="error-message">
          الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها لمكان آخر. لا تقلق،
          يمكنك دائماً العودة إلى مجموعاتنا الرائعة.
        </p>
        <div className="error-actions">
          {/* لو مش بتستخدم React Router خليها <a> بدال <Link> */}
          <Link to="/" className="btn-primary">
            العودة للرئيسية
          </Link>
          <Link to="/shop" className="btn-secondary">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
