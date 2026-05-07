import { useState } from "react";
import "../../styles/NavBar.css";
import { ShoppingBag, Heart, User, Search } from "lucide-react";
import { Link } from "react-router";
const NavBarZora = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="zaura-header">
      {/* 1. التوب بار - نحيف جداً */}
      <div className="top-bar">
        <div className="nav-container">
          <div className="top-links">
            <a href="#">english</a>
            <a href="#">من نحن؟</a>
            <a href="#">الأسئلة</a>
          </div>
          <div className="top-brand-small">ZAURA LUXURY</div>
        </div>
      </div>

      {/* 2. المين بار - يحتوي اللوجو والبحث */}
      <div className="main-nav">
        <div className="nav-container main-nav-grid">
          <div className="nav-search">
            <div className="search-wrapper">
              <input type="text" placeholder="ابحث..." />
              <span className="search-icon">
                <Search size={20} strokeWidth={1} />
              </span>
            </div>
          </div>

          <div className="nav-logo">
            <a href="/" className="logo-link">
              <span className="logo-wordmark">ZAURA</span>
              <div className="logo-divider"></div>
              <span className="logo-tagline">HANDMADE · ART</span>
            </a>
          </div>

          <div className="nav-icons">
            <Link to={"/UserProfile"} className="icon-btn">
              <User size={20} strokeWidth={1} />
            </Link>
            <button className="icon-btn">
              <Heart size={20} strokeWidth={1} />
            </button>
            <Link to={"/Cart"} className="icon-btn cart-btn">
              <ShoppingBag size={20} strokeWidth={1} />{" "}
              <span className="badge">2</span>
            </Link>
            <button
              className="mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* 3. التصنيفات - أنيق وبسيط */}
      <nav className={`categories-nav ${menuOpen ? "mobile-open" : ""}`}>
        <ul className="nav-container categories-list">
          <li>
            <a href="#" className="active">
              الكل
            </a>
          </li>
          <li>
            <a href="#">كروشيه</a>
          </li>
          <li>
            <a href="#">ريزون</a>
          </li>
          <li>
            <a href="#">لوحات</a>
          </li>
          <li>
            <a href="#">انتيكا</a>
          </li>
          <li>
            <a href="#">ديكور</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBarZora;
