import { useState, useRef, useCallback, useEffect } from 'react'
import './FullscreenModal.css'

const FullscreenModal = ({ beforeImage, afterImage, sliderPosition, onSliderChange, onExit }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [scroll, setScroll] = useState(0)
  const containerRef = useRef(null)
  const modalRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return
    
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    onSliderChange(percentage)
  }, [isDragging, onSliderChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return
    
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    onSliderChange(percentage)
  }, [isDragging, onSliderChange])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleBackdropClick = useCallback((e) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    onSliderChange(percentage)
  }, [onSliderChange])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  // Keyboard controls for zoom and scroll
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '+':
        case '=':
          event.preventDefault()
          setZoom(prev => Math.min(prev * 1.2, 5))
          break
        case '-':
          event.preventDefault()
          setZoom(prev => Math.max(prev / 1.2, 0.2))
          break
        case '0':
          event.preventDefault()
          setZoom(1)
          setScroll(0)
          break
        case 'ArrowUp':
          event.preventDefault()
          setScroll(prev => Math.max(prev - 50, -1000))
          break
        case 'ArrowDown':
          event.preventDefault()
          setScroll(prev => Math.min(prev + 50, 1000))
          break
      }
    }

    const handleWheel = (event) => {
      event.preventDefault()
      setScroll(prev => {
        const newScroll = prev + event.deltaY * 0.5
        return Math.max(-1000, Math.min(1000, newScroll))
      })
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const showSlider = beforeImage && afterImage

  return (
    <div className="fullscreen-modal" ref={modalRef}>
      <div className="fullscreen-overlay" onClick={handleBackdropClick}>
        <div className="fullscreen-header">
          <button 
            className="fullscreen-exit-button"
            onClick={onExit}
            aria-label="Exit fullscreen"
          >
            EXIT
          </button>
        </div>

        <div 
          className="fullscreen-container" 
          ref={containerRef}
          onClick={handleBackdropClick}
        >
          {/* Before Image Section */}
          <div className="fullscreen-section before-section">
            <div className={`fullscreen-label ${sliderPosition <= 5 ? 'fullscreen-label-hidden' : ''}`}>
              BEFORE
            </div>
            <div className="fullscreen-image-wrapper">
              {beforeImage && (
                <img
                  src={beforeImage.src}
                  alt="Before"
                  className="fullscreen-image"
                  style={{
                    transform: `scale(${zoom}) translateY(${scroll}px)`,
                    width: '100vw'
                  }}
                />
              )}
            </div>
          </div>

          {/* After Image Section */}
          <div 
            className="fullscreen-section after-section"
            style={{ 
              clipPath: showSlider ? `inset(0 0 0 ${sliderPosition}%)` : 'none'
            }}
          >
            <div className={`fullscreen-label ${sliderPosition >= 95 ? 'fullscreen-label-hidden' : ''}`}>
              AFTER
            </div>
            <div className="fullscreen-image-wrapper">
              {afterImage && (
                <img
                  src={afterImage.src}
                  alt="After"
                  className="fullscreen-image"
                  style={{
                    transform: `scale(${zoom}) translateY(${scroll}px)`,
                    width: '100vw'
                  }}
                />
              )}
            </div>
          </div>

          {/* Slider */}
          {showSlider && (
            <div 
              className={`fullscreen-slider ${isDragging ? 'dragging' : ''}`}
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className="fullscreen-slider-line" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FullscreenModal
