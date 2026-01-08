import { useState } from 'react'
import './MediaItem.css'

const MediaItem = ({ item, viewMode, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    if (bytes < 1024) return bytes + ' Bytes'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleDownload = () => {
    // Create a temporary link for download
    const link = document.createElement('a')
    link.href = item.url
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete()
    } else {
      setShowDeleteConfirm(true)
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => {
        setShowDeleteConfirm(false)
      }, 3000)
    }
  }

  const renderGridItem = () => (
    <div 
      className={`media-item grid ${item.type}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="item-preview">
        {item.type === 'image' ? (
          <img src={item.url} alt={item.name} />
        ) : (
          <div className="video-preview">
            <div className="video-icon">▶️</div>
            <span className="video-label">Video</span>
          </div>
        )}
        {isHovered && (
          <div className="item-overlay">
            <div className="overlay-actions">
              <button 
                className="action-btn view-btn"
                onClick={() => window.open(item.url, '_blank')}
                title="View"
              >
                👁️
              </button>
              <button 
                className="action-btn download-btn"
                onClick={handleDownload}
                title="Download"
              >
                ⬇️
              </button>
              <button 
                className={`action-btn delete-btn ${showDeleteConfirm ? 'confirm' : ''}`}
                onClick={handleDelete}
                title={showDeleteConfirm ? "Click again to confirm" : "Delete"}
              >
                {showDeleteConfirm ? '❓' : '🗑️'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="item-info">
        <h4 className="item-name" title={item.name}>
          {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
        </h4>
        <div className="item-meta">
          <span className="item-type">{item.type.toUpperCase()}</span>
          <span className="item-size">{formatFileSize(item.size)}</span>
          <span className="item-date">{formatDate(item.uploadDate)}</span>
        </div>
      </div>
    </div>
  )

  const renderListItem = () => (
    <div 
      className="media-item list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="list-icon">
        {item.type === 'image' ? '🖼️' : '🎥'}
      </div>
      <div className="list-info">
        <div className="list-main">
          <h4 className="item-name">{item.name}</h4>
          <div className="list-meta">
            <span className="item-type">{item.type.toUpperCase()}</span>
            <span className="item-size">{formatFileSize(item.size)}</span>
            <span className="item-date">{formatDate(item.uploadDate)}</span>
          </div>
        </div>
        <div className="list-actions">
          <button 
            className="action-btn view-btn"
            onClick={() => window.open(item.url, '_blank')}
            title="View"
          >
            👁️ View
          </button>
          <button 
            className="action-btn download-btn"
            onClick={handleDownload}
            title="Download"
          >
            ⬇️ Download
          </button>
          <button 
            className={`action-btn delete-btn ${showDeleteConfirm ? 'confirm' : ''}`}
            onClick={handleDelete}
            title={showDeleteConfirm ? "Click again to confirm" : "Delete"}
          >
            {showDeleteConfirm ? '❓ Confirm Delete' : '🗑️ Delete'}
          </button>
        </div>
      </div>
    </div>
  )

  return viewMode === 'grid' ? renderGridItem() : renderListItem()
}

export default MediaItem