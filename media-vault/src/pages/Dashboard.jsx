import { useState, useEffect } from 'react'
import MediaUpload from '../components/Media/MediaUpload'
import MediaGallery from '../components/Media/MediaGallery'
import './Dashboard.css'

const Dashboard = () => {
  const [media, setMedia] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    videos: 0,
    totalSize: 0
  })

  const loadMedia = () => {
    const storedMedia = JSON.parse(localStorage.getItem('media') || '[]')
    setMedia(storedMedia)
    
    // Calculate statistics
    const stats = storedMedia.reduce((acc, item) => {
      acc.total++
      if (item.type === 'image') acc.images++
      if (item.type === 'video') acc.videos++
      acc.totalSize += item.size || 0
      return acc
    }, { total: 0, images: 0, videos: 0, totalSize: 0 })
    
    setStats(stats)
  }

  useEffect(() => {
    loadMedia()
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Media Dashboard</h1>
        <p>Manage your photos and videos</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Files</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <h3>{stats.images}</h3>
            <p>Images</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎥</div>
          <div className="stat-content">
            <h3>{stats.videos}</h3>
            <p>Videos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💾</div>
          <div className="stat-content">
            <h3>{(stats.totalSize / 1024 / 1024).toFixed(2)} MB</h3>
            <p>Total Size</p>
          </div>
        </div>
      </div>
      
      <MediaUpload onUpload={loadMedia} />
      <MediaGallery media={media} onDelete={loadMedia} />
    </div>
  )
}

export default Dashboard