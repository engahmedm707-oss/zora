import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/ProductSlice";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
const FeaturedProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const { products, loading } = useSelector((state) => state.products);
  const Navigate = useNavigate();
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
    <section className="featured-products">
      <div className="section-header">
        <span className="section-subtitle">اخترنا لك بعناية</span>
        <h2>الأكثر مبيعاً</h2>
        <div className="divider"></div>
      </div>

      <div className="products-container">
        {/* المنتج 1 */}
        {products.slice(0, 4).map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                {/* <div className="product-badge">جديد</div> */}
                <img src={product.main_image} alt="منتج" />
                <div className="product-actions">
                  <button onClick={() => Navigate(`/product/${product.id}`)}>
                    عرض المنتج
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <span className="product-price">
                  {product.discount_price} ج.م
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
