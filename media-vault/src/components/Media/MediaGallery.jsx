import { useState } from 'react'
import MediaItem from './MediaItem'
import './MediaGallery.css'

const MediaGallery = ({ media, onDelete }) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filter, setFilter] = useState('all') // 'all', 'images', 'videos'
  const [sortBy, setSortBy] = useState('date') // 'date', 'name', 'size'

  const filteredMedia = media.filter(item => {
    if (filter === 'images') return item.type === 'image'
    if (filter === 'videos') return item.type === 'video'
    return true
  })

  const sortedMedia = [...filteredMedia].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.uploadDate) - new Date(a.uploadDate)
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === 'size') {
      return (b.size || 0) - (a.size || 0)
    }
    return 0
  })

  const handleDeleteItem = (id) => {
    const updatedMedia = media.filter(item => item.id !== id)
    localStorage.setItem('media', JSON.stringify(updatedMedia))
    onDelete()
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const totalSize = sortedMedia.reduce((sum, item) => sum + (item.size || 0), 0)

  return (
    <div className="media-gallery">
      <div className="gallery-header">
        <div className="gallery-info">
          <h3>My Media</h3>
          <p className="media-count">
            {sortedMedia.length} items • {formatFileSize(totalSize)}
          </p>
        </div>
        
        <div className="gallery-controls">
          <div className="filter-controls">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Media</option>
              <option value="images">Images Only</option>
              <option value="videos">Videos Only</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ▦
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {sortedMedia.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h4>No media files yet</h4>
          <p>Upload your first photo or video to get started</p>
        </div>
      ) : (
        <div className={`gallery-content ${viewMode}`}>
          {sortedMedia.map((item) => (
            <MediaItem 
              key={item.id} 
              item={item} 
              viewMode={viewMode}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
        </div>
      )}

      <div className="gallery-footer">
        <div className="footer-info">
          <p>Total Storage: {formatFileSize(totalSize)}</p>
          <p>{filteredMedia.length} of {media.length} items shown</p>
        </div>
      </div>
    </div>
  )
}

export default MediaGallery