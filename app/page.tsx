// LandingPage.js

import React from "react";
import Link from "next/link"; // If you're using React Router
import cls from "./homepage.module.css"

const LandingPage = () => {
  return (
    <div className={cls.landing_page}>
      <header className={cls.header}>
        <nav className={cls.nav}>
          {/* Add navigation links as needed */}
          <Link href="/login ">Login</Link>
        </nav>
      </header>
      <section className={cls.hero}>
        <h1>Welcome to Brochure</h1>
        <p>Your One-Stop Solution for ecom website</p>

      </section>
      <section className={cls.features}>
        <div className={cls.feature_card}>
          <h2>Create Your Own Product</h2>
          <p>
            Design and customize your own product with our easy-to-use tools.
          </p>
          <a href="/product" className="link">Get Started</a>
        </div>
        <div className={cls.feature_card}>
          <h2>Try AI Chatbot</h2>
          <p>
            Experience the power of artificial intelligence with our interactive chatbot.
          </p>
          <a href="/chatbot" className="link">Try Now</a>
        </div>
        <div className={cls.feature_card}>
          <h2>Raise a Query</h2>
          <p>
            Have questions? Our support team is ready to assist you.
          </p>
          <a href="/help-desk" className="link">Submit Query</a>
        </div>
      </section>
      <footer className={cls.footer}>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
