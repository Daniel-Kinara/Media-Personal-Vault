import { useState, useRef } from 'react'
import './MediaUpload.css'

const MediaUpload = ({ onUpload }) => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Save to localStorage
          const mediaItems = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 'video',
            size: file.size,
            url: URL.createObjectURL(file),
            uploadDate: new Date().toISOString()
          }))
          
          const existingMedia = JSON.parse(localStorage.getItem('media') || '[]')
          localStorage.setItem('media', JSON.stringify([...existingMedia, ...mediaItems]))
          
          setTimeout(() => {
            setUploading(false)
            setFiles([])
            setProgress(0)
            onUpload()
          }, 500)
          
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="media-upload">
      <h3>Upload Media</h3>
      
      <div 
        className="upload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="dropzone-content">
          <svg className="upload-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M22,16A2,2 0 0,1 20,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4V16Z" />
          </svg>
          <p>Drag & drop files here or click to browse</p>
          <p className="file-types">Supports: Images (JPG, PNG, GIF) & Videos (MP4, MOV)</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <div className="selected-files">
          <h4>Selected Files ({files.length})</h4>
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button 
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="upload-actions">
        <button 
          className="upload-btn"
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
        
        {uploading && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaUpload