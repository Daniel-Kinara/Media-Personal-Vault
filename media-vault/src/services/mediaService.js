export const mediaService = {
  uploadMedia: (files) => {
    return new Promise((resolve) => {
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
      
      resolve({ success: true, media: mediaItems })
    })
  },

  getMedia: () => {
    const media = JSON.parse(localStorage.getItem('media') || '[]')
    return media
  },

  deleteMedia: (id) => {
    const media = JSON.parse(localStorage.getItem('media') || '[]')
    const updatedMedia = media.filter(item => item.id !== id)
    localStorage.setItem('media', JSON.stringify(updatedMedia))
    return { success: true }
  },

  getMediaStats: () => {
    const media = JSON.parse(localStorage.getItem('media') || '[]')
    
    const stats = media.reduce((acc, item) => {
      acc.total++
      if (item.type === 'image') acc.images++
      if (item.type === 'video') acc.videos++
      acc.totalSize += item.size || 0
      return acc
    }, { total: 0, images: 0, videos: 0, totalSize: 0 })
    
    return stats
  }
}