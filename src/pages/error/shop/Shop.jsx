import "../../../styles/shop.css";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../../store/slices/ProductSlice";
import { Spinner } from "react-bootstrap";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const { products, loading } = useSelector((state) => state.products);
  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  return (
    <div className="shop-page">
      <header className="shop-header-section">
        <div className="header-bg-glow"></div>
        <div className="header-content">
          <span className="pre-title">مجموعة ZAURA الحصرية</span>
          <h1>المعرض الفني</h1>
          <div className="shop-breadcrumb">
            <a href="/">الرئيسية</a> <ArrowLeft size={12} /> <span>المتجر</span>
          </div>
        </div>
      </header>

      <div className="shop-container-fluid">
        <main className="shop-full-width">
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="art-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="art-card-inner">
                  <div className="image-container">
                    <img src={product.main_image} alt={product.title} />
                    <div className="card-overlay">
                      <span>اكتشف القطعة</span>
                    </div>
                  </div>
                  <div className="art-details">
                    <div className="details-header">
                      <span className="art-cat">{product.category}</span>
                      <span className="art-price">
                        {product.discount_price} ج.م
                      </span>
                    </div>
                    <h3>{product.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
