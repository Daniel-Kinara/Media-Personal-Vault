import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Mock authentication - in real app, call your backend API
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const token = Math.random().toString(36).substr(2)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      onLogin()
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your Media Vault</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login