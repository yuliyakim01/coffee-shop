import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Optional CSS file for styles

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Awesome Coffee Shop ☕</h1>
        <p>Your daily dose of bold, smooth, and aromatic coffee delights.</p>
        <Link to="/products" className="shop-button">
          Browse Products
        </Link>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Fresh Beans</h3>
          <p>Sourced responsibly from around the globe.</p>
        </div>
        <div className="feature-card">
          <h3>Crafted with Passion</h3>
          <p>Barista-level quality in every cup.</p>
        </div>
        <div className="feature-card">
          <h3>Delivered Fast</h3>
          <p>Right to your doorstep, always fresh.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
