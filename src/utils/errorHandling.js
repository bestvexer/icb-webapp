export const validateImageFile = (file) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp']
  
  if (!file) {
    return { isValid: false, error: 'No file selected' }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Please select a valid image file (JPEG, PNG, GIF, BMP, TIFF, WebP)' 
    }
  }
  
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: 'File too large. Please select an image smaller than 10MB' 
    }
  }
  
  return { isValid: true, error: null }
}

export const handleAsyncError = (error, context = '') => {
  console.error(`Error ${context}:`, error)
  
  if (error.name === 'QuotaExceededError') {
    return 'Storage quota exceeded. Please clear some space and try again.'
  }
  
  if (error.message?.includes('html2canvas')) {
    return 'Failed to generate download. Please try again.'
  }
  
  return `An error occurred${context ? ` ${context}` : ''}. Please try again.`
}
