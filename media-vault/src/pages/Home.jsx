import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Secure Your Memories</h1>
          <p className="hero-subtitle">
            Store, organize, and access your photos and videos anywhere, anytime.
            Your personal media vault in the cloud.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="cta-btn primary">
              Get Started Free
            </Link>
            <Link to="/login" className="cta-btn secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-grid">
            <div className="image-item item1">🖼️</div>
            <div className="image-item item2">🎥</div>
            <div className="image-item item3">📸</div>
            <div className="image-item item4">🎬</div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Media Vault?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Storage</h3>
            <p>Your media is encrypted and stored securely with bank-level security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Upload</h3>
            <p>Upload multiple files simultaneously with our high-speed servers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Anywhere Access</h3>
            <p>Access your media from any device with an internet connection.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Auto Sync</h3>
            <p>Your files are automatically synced across all your devices.</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in seconds</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Media</h3>
            <p>Drag & drop your photos and videos</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Access Anywhere</h3>
            <p>View your media from any device</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start Protecting Your Memories Today</h2>
        <p>Join thousands of users who trust Media Vault with their precious memories.</p>
        <Link to="/register" className="cta-btn primary large">
          Create Free Account
        </Link>
      </div>
    </div>
  )
}

export default Home