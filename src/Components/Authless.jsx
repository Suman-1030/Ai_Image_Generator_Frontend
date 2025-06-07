import React from 'react';

import { FaMagic, FaPaintBrush, FaRocket } from 'react-icons/fa';

function BeforeLogin() {
  return (
    <div className="before-login">
      <div className="hero">
        <h1 className="fade-in">🎨 Transform Text into Stunning Art</h1>
        <p className="slide-up">
          Enter a prompt and let our AI turn your imagination into beautiful images in seconds.
        </p>
        <img src="/ai-banner.png" alt="AI Example" className="hero-img zoom-in" />
      </div>

      <div className="features">
        <div className="feature-card fade-in-up">
          <FaMagic className="icon" />
          <h3>AI-Powered</h3>
          <p>Our advanced AI models generate high-quality images from your words instantly.</p>
        </div>
        <div className="feature-card fade-in-up delay-1">
          <FaPaintBrush className="icon" />
          <h3>Creative Control</h3>
          <p>Customize prompts to explore artistic, realistic, or abstract outputs.</p>
        </div>
        <div className="feature-card fade-in-up delay-2">
          <FaRocket className="icon" />
          <h3>Fast & Fun</h3>
          <p>Generate and download images in just a few clicks—no design skills needed!</p>
        </div>
      </div>
    </div>
  );
}

export default BeforeLogin;
