import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import "../../styles/auth.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // سحب حالة التحميل والخطأ من الريدكس
  const { loading, user } = useSelector((state) => state.auth);

  // 1. مراقبة حالة المستخدم: لو سجل دخول بنجاح انقله
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submitDataBtn = async (e) => {
    e.preventDefault();

    // 2. التحقق من البيانات
    if (!fullName || !email || !password) {
      return Swal.fire({
        title: "خطأ أثناء التسجيل",
        text: "اكمل بياناتك هناك حقل ناقص",
        icon: "error",
        background: "#1a1410",
        color: "#ebe6e1",
        confirmButtonColor: "#d4af7a",
        confirmButtonText: "أعد المحاولة مرة أخرى",
        iconColor: "#d4af7a",
      });
    }

    // 3. تنفيذ التسجيل عبر الريدكس
    try {
      // نستخدم unwrap عشان نقدر نمسك النجاح أو الفشل في الـ try/catch
      await dispatch(registerUser({ fullName, email, password })).unwrap();

      // 4. رسالة النجاح تظهر فقط عند اكتمال العملية
      Swal.fire({
        title: "أهلاً بك في عائلة ZURA",
        text: "تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل دخولك وتصفح باقات الفن",
        icon: "success",
        background: "#1a1410",
        color: "#ebe6e1",
        confirmButtonColor: "#d4af7a",
        confirmButtonText: "سجل دخولك الآن",
        iconColor: "#d4af7a",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (err) {
      // في حالة وجود خطأ من سوبابيز (مثلاً الإيميل مستخدم)
      Swal.fire({
        title: "فشل التسجيل",
        text: err || "حدث خطأ غير متوقع",
        icon: "error",
        background: "#1a1410",
        color: "#ebe6e1",
        confirmButtonColor: "#d4af7a",
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* الجانب الأيمن: المحتوى البصري */}
        <div className="auth-side-visual">
          <div className="visual-inner">
            <div className="brand-badge">ZAURA ART</div>
            <div className="visual-text">
              <h1>
                انضم إلى <br />
                <span>نخبة المبدعين</span>
              </h1>
              <p>
                حيث تلتقي الغرز اليدوية بسحر الريزون لتروي قصة فريدة في كل قطعة.
              </p>
            </div>
            <div className="floating-decor"></div>
          </div>
        </div>

        {/* الجانب الأيسر: فورم التسجيل */}
        <div className="auth-side-form">
          <button className="minimal-back" onClick={() => navigate("/")}>
            <ArrowRight size={18} /> العودة
          </button>

          <div className="form-content">
            <div className="form-header">
              <h2>إنشاء حساب</h2>
              <p>يسعدنا انضمامك لعائلتنا الفنية</p>
            </div>

            <form className="luxury-form" onSubmit={submitDataBtn}>
              <div className="input-field">
                <label>الاسم الكامل</label>
                <div className="input-group">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    placeholder="اسمك الذي سيظهر في المتجر"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>البريد الإلكتروني</label>
                <div className="input-group">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>كلمة المرور</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="gold-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>جاري المعالجة...</span>
                ) : (
                  <>
                    <span>تأكيد الانضمام</span>
                    <Sparkles size={16} />
                  </>
                )}
              </button>

              <div className="form-footer">
                <span>لديك حساب بالفعل؟</span>
                <button type="button" onClick={() => navigate("/login")}>
                  تسجيل الدخول
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
