import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">📦</span>
            <span className="logo-text">Media Vault</span>
          </Link>
        </div>
        
        <nav className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">
                Sign Up
              </Link>
            </>
          )}
        </nav>
        
        <div className="mobile-menu-btn">
          ☰
        </div>
      </div>
    </header>
  )
}

export default Header