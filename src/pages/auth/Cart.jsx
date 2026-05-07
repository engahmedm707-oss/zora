import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import Swal from "sweetalert2";
import "../../styles/cart.css";

const Cart = () => {
  const navigate = useNavigate();

  // بيانات تجريبية للسلة
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "حقيبة كروشيه ملكية",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1614859132130-192569201532?q=80&w=200",
      quantity: 1,
    },
    {
      id: 2,
      name: "لوحة ريزون زرقاء",
      price: 750,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    Swal.fire({
      title: "حذف المنتج؟",
      text: "هل تريد إزالة هذه القطعة من سلتك؟",
      icon: "warning",
      showCancelButton: true,
      background: "#1a1410",
      color: "#ebe6e1",
      confirmButtonColor: "#d4af7a",
      cancelButtonColor: "#3d3028",
      confirmButtonText: "نعم، احذفها",
      cancelButtonText: "تراجع",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((items) => items.filter((item) => item.id !== id));
      }
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 50; // تكلفة شحن ثابتة كمثال

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={80} strokeWidth={1} />
        <h2>حقيبتك فارغة حالياً</h2>
        <p>يبدو أنك لم تختر أي قطعة فنية بعد.</p>
        <Link to="/shop" className="go-shop-btn">
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">
          حقيبة التسوق <span>({cartItems.length} قطع)</span>
        </h1>

        <div className="cart-grid">
          {/* قائمة المنتجات */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-unit-price">{item.price} ج.م</p>
                  <div className="item-controls">
                    <div className="qty-stepper">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="item-total-price">
                  {item.price * item.quantity} ج.م
                </div>
              </div>
            ))}

            <button className="continue-link" onClick={() => navigate("/shop")}>
              <ArrowRight size={18} /> العودة للتسوق
            </button>
          </div>

          {/* ملخص الدفع */}
          <aside className="cart-summary">
            <div className="summary-card">
              <h3>ملخص الطلب</h3>
              <div className="summary-row">
                <span>الإجمالي الفرعي</span>
                <span>{subtotal} ج.م</span>
              </div>
              <div className="summary-row">
                <span>مصاريف الشحن</span>
                <span>{shipping} ج.م</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>الإجمالي النهائي</span>
                <span>{subtotal + shipping} ج.م</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => {
                  Swal.fire({
                    title: "جاري الانتقال للدفع",
                    text: "سيتم تحويلك لصفحة الدفع الآمن",
                    icon: "info",
                    background: "#1a1410",
                    color: "#ebe6e1",
                    confirmButtonColor: "#d4af7a",
                  });
                }}
              >
                <CreditCard size={20} /> إتمام الشراء
              </button>

              <p className="secure-note">دفع آمن 100% · استرجاع خلال 14 يوم</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
