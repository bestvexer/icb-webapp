import React, { useState, useRef, useCallback, useEffect } from 'react'
import './ImageComparer.css'

const ImageComparer = ({ beforeImage, afterImage, scaleMode, sliderPosition, onSliderChange }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(0) // -3 to +3, where 0 is initial size
  const containerRef = useRef(null)
  
  const hasImages = beforeImage || afterImage
  const showSlider = beforeImage && afterImage
  
  // Zoom levels for fullscreen: -3, -2, -1, 0, +1, +2, +3
  // Level 0 = fit to screen width, then 3 steps in each direction
  const getZoomScale = (level, mode) => {
    if (mode === '1:1 Ratio') {
      // For 1:1 ratio, use percentage scaling from actual pixel size
      const zoomMap = {
        '-3': 0.25,
        '-2': 0.5, 
        '-1': 0.75,
        '0': 1.0,
        '1': 1.25,
        '2': 1.5,
        '3': 2.0
      }
      return zoomMap[level.toString()] || 1.0
    } else {
      // For fullscreen, Level 0 = fit to width, then scale from there
      const zoomMap = {
        '-3': 0.4,   // Much smaller than screen
        '-2': 0.6,   // Smaller than screen 
        '-1': 0.8,   // Slightly smaller than screen
        '0': 1.0,    // Fit to screen width (base level)
        '1': 1.3,    // Bigger than screen
        '2': 1.6,    // Much bigger than screen
        '3': 2.0     // Very big
      }
      return zoomMap[level.toString()] || 1.0
    }
  }

  const updateSliderPosition = useCallback((e) => {
    if (!showSlider || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    onSliderChange(percentage)
  }, [showSlider, onSliderChange])

  const handleMouseDown = useCallback((e) => {
    if (!showSlider) return
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e)
  }, [showSlider, updateSliderPosition])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    updateSliderPosition(e)
  }, [isDragging, updateSliderPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e) => {
    if (!showSlider) return
    e.preventDefault()
    setIsDragging(true)
    if (e.touches[0]) {
      const touch = e.touches[0]
      updateSliderPosition({ clientX: touch.clientX })
    }
  }, [showSlider, updateSliderPosition])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    if (e.touches[0]) {
      const touch = e.touches[0]
      updateSliderPosition({ clientX: touch.clientX })
    }
  }, [isDragging, updateSliderPosition])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (scaleMode === 'Fullscreen' && e.key === 'Escape') {
        // Note: This would need to be handled by parent component
        return
      }
      
      if (scaleMode === '1:1 Ratio' || scaleMode === 'Fullscreen') {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            setScroll(prev => Math.max(prev - 50, -1000))
            break
          case 'ArrowDown':
            e.preventDefault()
            setScroll(prev => Math.min(prev + 50, 1000))
            break
          case '=':
          case '+':
            e.preventDefault()
            setZoomLevel(prev => {
              console.log('Zoom in: from', prev, 'to', Math.min(prev + 1, 3))
              return Math.min(prev + 1, 3)
            })
            break
          case '-':
          case '_':
            e.preventDefault()
            setZoomLevel(prev => {
              console.log('Zoom out: from', prev, 'to', Math.max(prev - 1, -3))
              return Math.max(prev - 1, -3)
            })
            break
          case '0':
            e.preventDefault()
            console.log('Reset zoom to 0')
            setZoomLevel(0)
            break
        }
      }
    }

    const handleWheel = (e) => {
      if (scaleMode === '1:1 Ratio' || scaleMode === 'Fullscreen') {
        e.preventDefault()
        setScroll(prev => {
          const newScroll = prev + e.deltaY * 0.5
          return Math.max(-1000, Math.min(1000, newScroll))
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    if (scaleMode === '1:1 Ratio' || scaleMode === 'Fullscreen') {
      document.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
    }
  }, [scaleMode])

  useEffect(() => {
    if (scaleMode !== '1:1 Ratio' && scaleMode !== 'Fullscreen') {
      setScroll(0)
      setZoomLevel(0)
    }
  }, [scaleMode])

  const getImageStyle = (image) => {
    if (!image) return {}
    
    const baseStyle = {
      draggable: false
    }
    
    const zoomScale = getZoomScale(zoomLevel, scaleMode)
    console.log('Current zoom level:', zoomLevel, 'scale:', zoomScale, 'mode:', scaleMode)
    
    switch (scaleMode) {
      case '1:1 Ratio':
        return {
          ...baseStyle,
          maxWidth: 'none',
          maxHeight: 'none',
          width: 'auto',
          height: 'auto',
          transform: `translateY(${scroll}px) scale(${zoomScale})`,
          transition: 'transform 0.1s ease'
        }
      case 'Fullscreen':
        return {
          ...baseStyle,
          maxWidth: '100vw',
          maxHeight: 'none',
          width: '100vw',
          height: 'auto',
          objectFit: 'contain',
          transform: `translateY(${scroll}px) scale(${zoomScale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease'
        }
      default: // Scale to Fit
        return {
          ...baseStyle,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }
    }
  }

  return (
    <div 
      className="image-comparer" 
      ref={containerRef}
      onMouseDown={showSlider ? handleMouseDown : undefined}
      onTouchStart={showSlider ? handleTouchStart : undefined}
      style={{
        cursor: showSlider ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none'
      }}
    >
      {hasImages && (
        <div className="images-container">
          {/* Before Image Section */}
          <div className="image-section before-section">
            {hasImages && (
              <div className={`image-label image-label-before ${showSlider && sliderPosition <= 5 ? 'image-label-hidden' : ''}`}>BEFORE</div>
            )}
            <div className="image-wrapper">
              {beforeImage ? (
                <img
                  src={beforeImage.src}
                  alt="Before"
                  style={getImageStyle(beforeImage)}
                  className="comparison-image"
                />
              ) : (
                <div className="image-placeholder">
                  <span>No before image</span>
                </div>
              )}
            </div>
          </div>

          {/* After Image Section */}
          <div 
            className="image-section after-section"
            style={{ 
              clipPath: showSlider ? `inset(0 0 0 ${sliderPosition}%)` : 'none'
            }}
          >
            {hasImages && (
              <div className={`image-label image-label-after ${showSlider && sliderPosition >= 95 ? 'image-label-hidden' : ''}`}>AFTER</div>
            )}
            <div className="image-wrapper">
              {afterImage ? (
                <img
                  src={afterImage.src}
                  alt="After"
                  style={getImageStyle(afterImage)}
                  className="comparison-image"
                />
              ) : (
                <div className="image-placeholder">
                  <span>No after image</span>
                </div>
              )}
            </div>
          </div>

          {/* Slider */}
          {showSlider && (
            <div 
              className={`slider ${isDragging ? 'dragging' : ''}`}
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="slider-line" />
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default ImageComparer
