import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Heart,
  ShieldCheck,
  Share2,
} from "lucide-react";

// استيراد Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, EffectFade } from "swiper/modules";

// استيراد استايلات Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";

import "../../../styles/product-details.css";
import { fetchSingleProduct } from "../../../store/slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { singleProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  if (loading || !singleProduct) {
    return (
      <div
        className="product-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>جاري تحميل تفاصيل المنتج...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">حدث خطأ: {error}</div>;
  }

  if (!singleProduct) {
    return (
      <div className="pd-error">
        <h2>لم يتم العثور على هذا المنتج.</h2>
        <button onClick={() => navigate("/shop")}>العودة للمتجر</button>
      </div>
    );
  }

  // تعريف المتغيرات لسهولة الاستخدام مع وضع قيم افتراضية لمنع الـ undefined
  const productImages = singleProduct.images || [];
  const productFeatures = singleProduct.features || [];

  return (
    <div className="product-page">
      <div className="pd-container">
        <button className="back-btn" onClick={() => navigate("/shop")}>
          <ArrowRight size={18} /> العودة للمتجر
        </button>

        <div className="pd-grid">
          {/* الجانب الأيمن: معرض الصور */}
          <div className="pd-gallery">
            <div className="swiper-master-wrapper">
              <Swiper
                style={{
                  "--swiper-navigation-color": "var(--gold)",
                  "--swiper-navigation-size": "25px",
                }}
                spaceBetween={0}
                effect={"fade"}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                className="main-swiper"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="main-img-container">
                      <img src={img} alt={singleProduct.name} />
                    </div>
                  </SwiperSlide>
                ))}
                {productImages.length === 0 && (
                  <SwiperSlide>
                    <div className="main-img-container">
                      <p>لا توجد صور لهذا المنتج</p>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>

            <div className="swiper-thumbs-wrapper">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-swiper"
              >
                {productImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="thumb-wrapper">
                      <img src={img} alt="thumbnail" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* الجانب الأيسر: المعلومات */}
          <div className="pd-info">
            <span className="pd-category-tag">
              {singleProduct.category || "تصنيف عام"}
            </span>
            <h1 className="pd-main-title">{singleProduct.title}</h1>

            <div className="pd-price-row">
              <span className="pd-current-price">
                {singleProduct.discount_price} ج.م
              </span>
            </div>

            <div className="pd-divider"></div>
            <p className="pd-full-desc">{singleProduct.description}</p>

            <ul className="specs-list">
              {productFeatures.length > 0 ? (
                productFeatures.map((feature, i) => (
                  <li key={i}>
                    <ShieldCheck size={16} color="var(--gold)" /> {feature}
                  </li>
                ))
              ) : (
                <li>لا توجد مميزات إضافية</li>
              )}
            </ul>

            <div className="pd-purchase-section">
              <div className="qty-box">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="main-cart-btn">
                <ShoppingBag size={20} /> إضافة للسلة
              </button>

              <button className="pd-wish-btn">
                <Heart size={20} />
              </button>
            </div>

            <div className="pd-footer-meta">
              <p>
                <Share2 size={14} /> مشاركة هذه القطعة
              </p>
              <span>* شحن سريع وتغليف هدايا مجاني</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
