import React, { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import ImageComparer from './components/ImageComparer'
import Toolbar from './components/Toolbar'
import AppLogo from './components/AppLogo'

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
  const [isLoading, setIsLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const comparerRef = useRef(null)

  const handleLoadBefore = useCallback((file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBeforeImage({
          src: e.target.result,
          name: file.name,
          size: file.size,
          type: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleLoadAfter = useCallback((file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAfterImage({
          src: e.target.result,
          name: file.name,
          size: file.size,
          type: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleClearStage = useCallback(() => {
    setBeforeImage(null)
    setAfterImage(null)
    setSliderPosition(50)
  }, [])

  const handleScaleModeChange = useCallback((newMode) => {
    if (newMode === SCALE_OPTIONS.FULLSCREEN) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
    setScaleMode(newMode)
  }, [])

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false)
    setScaleMode(SCALE_OPTIONS.FIT)
  }, [])

  // Handle ESC key for fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleExitFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, handleExitFullscreen])

  const handleDownload = async () => {
    if (!comparerRef.current || !beforeImage || !afterImage) return
    
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const beforeImg = new Image()
      const afterImg = new Image()
      
      await Promise.all([
        new Promise((resolve) => {
          beforeImg.onload = resolve
          beforeImg.src = beforeImage.src
        }),
        new Promise((resolve) => {
          afterImg.onload = resolve
          afterImg.src = afterImage.src
        })
      ])

      // Get the displayed image element to match exact display size and position
      const displayedImg = comparerRef.current.querySelector('.comparison-image')
      if (!displayedImg) return
      
      const imgRect = displayedImg.getBoundingClientRect()
      const containerRect = comparerRef.current.getBoundingClientRect()
      
      // Set canvas size to match displayed image size
      canvas.width = imgRect.width
      canvas.height = imgRect.height
      
      // Calculate how to draw images to maintain the displayed appearance
      let drawWidth = canvas.width
      let drawHeight = canvas.height
      let offsetX = 0
      let offsetY = 0
      
      if (scaleMode === '1:1 Ratio') {
        // For 1:1, use original image dimensions but clip to canvas
        drawWidth = beforeImg.naturalWidth
        drawHeight = beforeImg.naturalHeight
        
        // Center the image if it's smaller than canvas
        if (drawWidth < canvas.width) {
          offsetX = (canvas.width - drawWidth) / 2
        }
        if (drawHeight < canvas.height) {
          offsetY = (canvas.height - drawHeight) / 2
        }
      } else {
        // For Scale to Fit, maintain aspect ratio within canvas bounds
        const imgAspect = beforeImg.naturalWidth / beforeImg.naturalHeight
        const canvasAspect = canvas.width / canvas.height
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to width
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          // Image is taller - fit to height
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
        }
      }
      
      // Fill canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw before image (full)
      ctx.drawImage(beforeImg, offsetX, offsetY, drawWidth, drawHeight)
      
      // Draw after image (clipped)
      const clipWidth = canvas.width * (sliderPosition / 100)
      ctx.save()
      ctx.beginPath()
      ctx.rect(clipWidth, 0, canvas.width - clipWidth, canvas.height)
      ctx.clip()
      ctx.drawImage(afterImg, offsetX, offsetY, drawWidth, drawHeight)
      ctx.restore()
      
      // Draw slider line
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 2
      ctx.beginPath()
      ctx.moveTo(clipWidth, 0)
      ctx.lineTo(clipWidth, canvas.height)
      ctx.stroke()
      
      const link = document.createElement('a')
      link.download = `comparison-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
      
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const hasImages = beforeImage || afterImage
  const hasBothImages = beforeImage && afterImage

  const getStatusText = () => {
    if (!hasImages) {
      return 'STAGE • EMPTY'
    } else if (beforeImage && !afterImage) {
      return 'STAGE • BEFORE: IMG loaded'
    } else if (!beforeImage && afterImage) {
      return 'STAGE • AFTER: IMG loaded'
    } else if (hasBothImages) {
      const scaleText = scaleMode === SCALE_OPTIONS.FIT ? 'fit' : 
                       scaleMode === SCALE_OPTIONS.RATIO ? '1:1' : 'fullscreen'
      return `STAGE • BEFORE: IMG loaded • AFTER: IMG loaded • scale: ${scaleText}`
    }
    return 'STAGE • EMPTY'
  }

  return (
    <>
      <div className="app">
        <header className="app-header">
          <div className="app-title-container">
            <AppLogo />
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
        
        <div className="status-bar">
          <span className="status-text">{getStatusText()}</span>
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && beforeImage && afterImage && (
        <div className="fullscreen-modal">
          <button 
            className="fullscreen-exit-btn"
            onClick={handleExitFullscreen}
          >
            EXIT FULLSCREEN
          </button>
          <div className="fullscreen-content">
            <ImageComparer
              beforeImage={beforeImage}
              afterImage={afterImage}
              scaleMode={scaleMode}
              sliderPosition={sliderPosition}
              onSliderChange={setSliderPosition}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default App
