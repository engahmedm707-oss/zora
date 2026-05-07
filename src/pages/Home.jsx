import "../styles/home.css";

import HeroSection from "../components/Home/HeroSection";
import Categories from "../components/Home/Categories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
const Home = () => {
  return (
    <div className="home-page">
      {/* 1. قسم الواجهة (HeroSection) */}
      <HeroSection />
      {/* 2. قسم التصنيفات (Categories) */}
      <Categories />

      {/* 3. قسم المنتجات المميزة (Featured Products) */}
      <FeaturedProducts />
    </div>
  );
};

export default Home;
