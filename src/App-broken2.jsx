import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import ImageComparer from './components/ImageComparer'
import Toolbar from './components/Toolbar'
import Notification from './components/Notification'
import FullscreenModal from './components/FullscreenModal'
import { validateImageFile, handleAsyncError } from './utils/errorHandling'

const SCALE_OPTIONS = {
  FIT: 'Scale to Fit',
  RATIO: '1:1 Ratio',
  FULLSCREEN: 'Fullscreen'
}

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [scaleMode, setScaleMode] = useState(SCALE_OPTIONS.FIT)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [notification, setNotification] = useState({ message: '', type: 'info', isVisible: false })
  const [isLoading, setIsLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const comparerRef = useRef(null)

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type, isVisible: true })
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }, [])

  const handleLoadBefore = useCallback((file) => {
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      showNotification(validation.error, 'error')
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setBeforeImage({
          src: e.target.result,
          name: file.name,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        })
        showNotification('Before image loaded successfully', 'success')
        setIsLoading(false)
      }
      img.onerror = () => {
        showNotification('Failed to load before image', 'error')
        setIsLoading(false)
      }
      img.src = e.target.result
    }
    reader.onerror = () => {
      showNotification('Failed to load before image', 'error')
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }, [showNotification])

  const handleLoadAfter = useCallback((file) => {
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      showNotification(validation.error, 'error')
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setAfterImage({
          src: e.target.result,
          name: file.name,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        })
        showNotification('After image loaded successfully', 'success')
        setIsLoading(false)
      }
      img.onerror = () => {
        showNotification('Failed to load after image', 'error')
        setIsLoading(false)
      }
      img.src = e.target.result
    }
    reader.onerror = () => {
      showNotification('Failed to load after image', 'error')
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }, [showNotification])

  const handleClearStage = useCallback(() => {
    setBeforeImage(null)
    setAfterImage(null)
    setSliderPosition(50)
    showNotification('Stage cleared', 'info')
  }, [showNotification])

  const handleScaleModeChange = useCallback((newMode) => {
    if (newMode === SCALE_OPTIONS.FULLSCREEN) {
      setIsFullscreen(true)
    } else {
      setScaleMode(newMode)
    }
  }, [])

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false)
    setScaleMode(SCALE_OPTIONS.FIT)
  }, [])

  const handleDownload = useCallback(async () => {
    if (!comparerRef.current || (!beforeImage && !afterImage)) {
      showNotification('No images to download', 'warning')
      return
    }

    setIsLoading(true)
    showNotification('Generating download...', 'info')
    
    try {
      if (hasBothImages) {
        // Custom canvas rendering for proper before/after combination
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        const beforeImg = new Image()
        const afterImg = new Image()
        
        // Load both images synchronously
        beforeImg.src = beforeImage.src
        afterImg.src = afterImage.src
        
        // Wait for both images to load
        await new Promise((resolve) => {
          let loadedCount = 0
          const onLoad = () => {
            loadedCount++
            if (loadedCount === 2) resolve()
          }
          beforeImg.onload = onLoad
          afterImg.onload = onLoad
        })
        
        // Set canvas dimensions based on container
        const containerRect = comparerRef.current.getBoundingClientRect()
        canvas.width = containerRect.width
        canvas.height = containerRect.height
        
        // Fill with black background
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Calculate image scaling for "scale to fit"
        const beforeAspect = beforeImg.naturalWidth / beforeImg.naturalHeight
        const containerAspect = canvas.width / canvas.height
        
        let imgWidth, imgHeight, x, y
        if (containerAspect > beforeAspect) {
          imgHeight = canvas.height
          imgWidth = imgHeight * beforeAspect
        } else {
          imgWidth = canvas.width
          imgHeight = imgWidth / beforeAspect
        }
        x = (canvas.width - imgWidth) / 2
        y = (canvas.height - imgHeight) / 2
        
        // Draw before image (full)
        ctx.drawImage(beforeImg, x, y, imgWidth, imgHeight)
        
        // Create clipping for after image based on slider position
        const sliderX = (sliderPosition / 100) * canvas.width
        ctx.save()
        ctx.beginPath()
        ctx.rect(sliderX, 0, canvas.width - sliderX, canvas.height)
        ctx.clip()
        
        // Draw after image (clipped)
        ctx.drawImage(afterImg, x, y, imgWidth, imgHeight)
        ctx.restore()
        
        // Draw slider line
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(sliderX, 0)
        ctx.lineTo(sliderX, canvas.height)
        ctx.stroke()
        
        // Download the canvas
        const link = document.createElement('a')
        link.download = `comparison-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        
      } else {
        // Fallback to html2canvas for single image
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(comparerRef.current, {
          backgroundColor: '#000000',
          scale: 1
        })
        
        const link = document.createElement('a')
        link.download = `comparison-${Date.now()}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
      
      showNotification('Download started successfully', 'success')
    } catch (error) {
      const errorMessage = handleAsyncError(error, 'during download')
      showNotification(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [beforeImage, afterImage, hasBothImages, sliderPosition, showNotification])

  const hasImages = beforeImage || afterImage
  const hasBothImages = beforeImage && afterImage

  const getStatusText = useCallback(() => {
    if (!hasImages) {
      return 'STAGE • EMPTY'
    } else if (beforeImage && !afterImage) {
      const resolution = beforeImage.naturalWidth && beforeImage.naturalHeight 
        ? `${beforeImage.naturalWidth}×${beforeImage.naturalHeight}` 
        : 'Loading...'
      return `STAGE • BEFORE: IMG ${resolution}`
    } else if (!beforeImage && afterImage) {
      const resolution = afterImage.naturalWidth && afterImage.naturalHeight 
        ? `${afterImage.naturalWidth}×${afterImage.naturalHeight}` 
        : 'Loading...'
      return `STAGE • AFTER: IMG ${resolution}`
    } else if (hasBothImages) {
      const beforeRes = beforeImage.naturalWidth && beforeImage.naturalHeight 
        ? `${beforeImage.naturalWidth}×${beforeImage.naturalHeight}` 
        : 'Loading...'
      const afterRes = afterImage.naturalWidth && afterImage.naturalHeight 
        ? `${afterImage.naturalWidth}×${afterImage.naturalHeight}` 
        : 'Loading...'
      const scaleText = scaleMode === SCALE_OPTIONS.FIT ? 'fit' : 
                       scaleMode === SCALE_OPTIONS.RATIO ? '1:1' : 'fullscreen'
      return `STAGE • BEFORE: IMG ${beforeRes} • AFTER: IMG ${afterRes} • scale: ${scaleText}`
    }
    return 'STAGE • EMPTY'
  }, [hasImages, beforeImage, afterImage, hasBothImages, scaleMode])

  // ESC key handler for fullscreen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        handleExitFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, handleExitFullscreen])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-container">
          <img src="/icb-logo.jpg" alt="ICB Logo" className="app-logo" />
          <h1 className="app-title">Image Comparison Bench</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="comparison-container" ref={comparerRef}>
          <ImageComparer
            beforeImage={beforeImage}
            afterImage={afterImage}
            scaleMode={scaleMode}
            sliderPosition={sliderPosition}
            onSliderChange={setSliderPosition}
          />
        </div>
      </main>

      <Toolbar
        onLoadBefore={handleLoadBefore}
        onLoadAfter={handleLoadAfter}
        onClearStage={handleClearStage}
        onDownload={handleDownload}
        scaleMode={scaleMode}
        onScaleModeChange={handleScaleModeChange}
        scaleOptions={SCALE_OPTIONS}
        hasImages={hasImages}
        hasBothImages={hasBothImages}
        isLoading={isLoading}
      />
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <div className="status-bar">
        <span className="status-text">{getStatusText()}</span>
      </div>

      {isFullscreen && (
        <FullscreenModal
          beforeImage={beforeImage}
          afterImage={afterImage}
          sliderPosition={sliderPosition}
          onSliderChange={setSliderPosition}
          onExit={handleExitFullscreen}
        />
      )}
    </div>
  )
}

export default App
