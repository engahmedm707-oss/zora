import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import "../../styles/auth.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

import Swal from "sweetalert2";
import { loginUser } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (!email || !password)
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

    try {
      await dispatch(loginUser({ email, password })).unwrap();
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
          navigate("/");
        }
      });
    } catch (e) {
      Swal.fire({
        title: "فشل التسجيل",
        text: e || "حدث خطأ غير متوقع",
        icon: "error",
        background: "#1a1410",
        color: "#ebe6e1",
        confirmButtonColor: "#d4af7a",
      });
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-container login-container">
        {/* الجانب الأيمن: المحتوى البصري (صورة مختلفة للتمييز) */}
        <div className="auth-side-visual login-visual">
          <div className="visual-inner">
            <div className="brand-badge">ZAURA ART</div>
            <div className="visual-text">
              <h1>
                مرحباً بك <br />
                <span>مرة أخرى</span>
              </h1>
              <p>
                عد إلى مساحتك الخاصة واستكمل رحلتك في اقتناء القطع الفنية
                الفريدة.
              </p>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: فورم تسجيل الدخول */}
        <div className="auth-side-form">
          <button className="minimal-back" onClick={() => navigate("/")}>
            <ArrowRight size={18} /> العودة للرئيسية
          </button>

          <div className="form-content">
            <div className="form-header">
              <h2>تسجيل الدخول</h2>
              <p>سجل دخولك للوصول إلى حقيبتك وطلباتك</p>
            </div>

            <form className="luxury-form" onSubmit={handleSubmitButton}>
              <div className="input-field">
                <label>البريد الإلكتروني</label>
                <div className="input-group">
                  <Mail className="input-icon" size={18} />
                  <input
                    value={email}
                    onChange={handleEmail}
                    type="email"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="input-field">
                <label>كلمة المرور</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    value={password}
                    onChange={handlePassword}
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="forgot-pass">
                  <button type="button">نسيت كلمة المرور؟</button>
                </div>
              </div>

              <button type="submit" className="gold-submit-btn">
                <span>دخول</span>
                <LogIn size={16} />
              </button>

              <div className="form-footer">
                <span>ليس لديك حساب؟</span>
                <button type="button" onClick={() => navigate("/register")}>
                  إنشاء حساب جديد
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
