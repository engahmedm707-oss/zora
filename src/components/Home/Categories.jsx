import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";
import { fetchcategories } from "../../store/slices/categorySlice";
const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcategories());
  }, [dispatch]);
  const { categories, loading } = useSelector((state) => state.categories);
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  return (
    <section className="featured-categories">
      <div className="section-header">
        <span className="section-subtitle">تصفح حسب</span>
        <h2>أقسامنا الفنية</h2>
        <div className="divider"></div>
      </div>
      <div className="categories-grid">
        {categories.slice(0, 3).map((category, index) => {
          return (
            <div className="category-card" key={index}>
              <div className="cat-img cat-1">
                <img
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={category.img}
                  alt={category.name}
                />
              </div>
              <div className="cat-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
