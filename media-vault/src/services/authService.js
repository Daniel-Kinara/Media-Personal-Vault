export const authService = {
  login: async (email, password) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const token = Math.random().toString(36).substr(2)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true, user }
    }
    
    return { success: false, message: 'Invalid email or password' }
  },

  register: async (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if user exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' }
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Auto login
    const token = Math.random().toString(36).substr(2)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(newUser))
    
    return { success: true, user: newUser }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}