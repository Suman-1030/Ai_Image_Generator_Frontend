import React from 'react'

function Banner() {
  return (
    <div className="banner">
      <div className="banner-bg-glow" />
      <div className="banner-content">
        <h1>🎨 Unleash Your Imagination with AI</h1>
        <p>Type in your wildest ideas — our AI will instantly bring them to life as breathtaking images.</p>
  
        <ul className="features-list">
          <li>⚡ Fast image generation</li>
          <li>🎯 Precision based on your prompt</li>
          <li>🖼️ High-quality visual outputs</li>
        </ul>
  
        <button className="cta-button" onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}>
          🚀 Try it Now
        </button>
  
        <div className="scroll-hint">
          <span>↓ Scroll to Generate</span>
        </div>
      </div>
    </div>
  );
  
}

export default Banner
