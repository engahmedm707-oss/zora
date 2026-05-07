import { useEffect, useState } from "react";
import {
  Package,
  Heart,
  Settings,
  LogOut,
  MapPin,
  ChevronLeft,
  Camera,
  Loader,
} from "lucide-react";
import Swal from "sweetalert2";
import "../../styles/user-profile.css";
import { fetchUserProfile, logout } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // سحب البيانات وحالة التحميل من الريدكس
  const { user, profile, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user, profile, dispatch]);

  const orders = [
    {
      id: "ZA-9082",
      date: "2024/05/01",
      status: "تم التوصيل",
      total: "1,200 ج.م",
    },
    {
      id: "ZA-1145",
      date: "2024/04/15",
      status: "جاري الشحن",
      total: "450 ج.م",
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "تسجيل الخروج؟",
      text: "هل أنت متأكد أنك تريد مغادرة عالم زورا؟",
      icon: "warning",
      showCancelButton: true,
      background: "#1a1410",
      color: "#ebe6e1",
      confirmButtonColor: "#d4af7a",
      cancelButtonColor: "#3d3028",
      confirmButtonText: "نعم، خروج",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout()); // تنفيذ الخروج من الريدكس وسوبابيز
        navigate("/login");
      }
    });
  };

  // 1. حماية ضد الـ Null: إذا كان يحمل البيانات، اظهر Spinner
  if (loading || !profile) {
    return (
      <div className="profile-loading">
        <Loader className="spinner" size={40} />
        <p>جاري تحضير خزانتك الخاصة...</p>
      </div>
    );
  }

  // دالة بسيطة لتحويل التاريخ لشكل مقروء
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* الجانب الأيمن: القائمة الجانبية */}
        <aside className="profile-sidebar">
          <div className="user-card">
            <div className="avatar-wrapper">
              {/* استخدام الـ Optional Chaining هنا كطبقة حماية إضافية */}
              <img
                src={
                  profile?.avatar_url ||
                  "https://ui-avatars.com/api/?name=" + profile?.full_name
                }
                alt="avatar"
              />
              <button className="edit-avatar">
                <Camera size={16} />
              </button>
            </div>
            <h3>{profile?.full_name}</h3>
            <p>عضو منذ {formatDate(profile?.created_at)}</p>
          </div>

          <nav className="profile-nav">
            <button
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              <Package size={20} /> طلباتي
            </button>
            <button
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart size={20} /> المفضلة
            </button>
            <button
              className={activeTab === "address" ? "active" : ""}
              onClick={() => setActiveTab("address")}
            >
              <MapPin size={20} /> العناوين
            </button>
            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={20} /> الإعدادات
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={20} /> تسجيل الخروج
            </button>
          </nav>
        </aside>

        {/* الجانب الأيسر: محتوى التبويبات */}
        <main className="profile-content">
          {activeTab === "orders" && (
            <div className="tab-section">
              <h2 className="tab-title">تاريخ الطلبات</h2>
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <span className="order-id">رقم الطلب: {order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="order-status-price">
                      <span
                        className={`status ${order.status === "تم التوصيل" ? "delivered" : "shipping"}`}
                      >
                        {order.status}
                      </span>
                      <span className="order-total">{order.total}</span>
                    </div>
                    <button className="order-details-btn">
                      تفاصيل الطلب <ChevronLeft size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="tab-section">
              <h2 className="tab-title">إعدادات الحساب</h2>
              <form
                className="settings-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label>الاسم بالكامل</label>
                    <input type="text" defaultValue={profile?.full_name} />
                  </div>
                  <div className="form-group">
                    <label>البريد الإلكتروني (للتواصل)</label>
                    <input type="email" defaultValue={user?.email} disabled />
                  </div>
                </div>
                <div className="form-group">
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    defaultValue={profile?.phone_number || "لم يتم الإضافة"}
                  />
                </div>
                <button
                  type="submit"
                  className="save-btn"
                  onClick={() => {
                    Swal.fire({
                      icon: "success",
                      title: "تم التحديث!",
                      text: "تم حفظ بياناتك بنجاح",
                      background: "#1a1410",
                      color: "#ebe6e1",
                      confirmButtonColor: "#d4af7a",
                    });
                  }}
                >
                  حفظ التغييرات
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
