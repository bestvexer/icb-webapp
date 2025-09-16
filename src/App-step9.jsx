import React, { useState, useRef, useCallback, useEffect } from 'react'

const SCALE_OPTIONS = {
  FIT: 'Scale to Fit',
  RATIO: '1:1 Ratio', 
  FULLSCREEN: 'Fullscreen'
}

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [scaleMode, setScaleMode] = useState(SCALE_OPTIONS.FIT)
  const [isDragging, setIsDragging] = useState(false)
  const beforeInputRef = useRef(null)
  const afterInputRef = useRef(null)
  const comparisonRef = useRef(null)
  
  const hasImages = beforeImage || afterImage
  const hasBothImages = beforeImage && afterImage
  
  const handleLoadBefore = (file) => {
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
  }
  
  const handleLoadAfter = (file) => {
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
  }
  
  const handleBeforeClick = () => {
    beforeInputRef.current?.click()
  }
  
  const handleAfterClick = () => {
    afterInputRef.current?.click()
  }
  
  const handleBeforeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleLoadBefore(file)
    }
    e.target.value = ''
  }
  
  const handleAfterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleLoadAfter(file)
    }
    e.target.value = ''
  }
  
  const handleClear = () => {
    setBeforeImage(null)
    setAfterImage(null)
    setSliderPosition(50)
  }

  const updateSliderPosition = useCallback((e) => {
    if (!hasBothImages || !comparisonRef.current) return
    
    const rect = comparisonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [hasBothImages])

  const handleMouseDown = useCallback((e) => {
    if (!hasBothImages) return
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e)
  }, [hasBothImages, updateSliderPosition])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    updateSliderPosition(e)
  }, [isDragging, updateSliderPosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const getImageStyle = () => {
    switch (scaleMode) {
      case SCALE_OPTIONS.RATIO:
        return {
          maxWidth: 'none',
          maxHeight: 'none',
          width: 'auto',
          height: 'auto'
        }
      case SCALE_OPTIONS.FULLSCREEN:
        return {
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }
      default: // Scale to Fit
        return {
          maxWidth: '600px',
          maxHeight: '400px',
          objectFit: 'contain'
        }
    }
  }

  const getStatusText = () => {
    const scaleText = scaleMode === SCALE_OPTIONS.FIT ? 'fit' : 
                     scaleMode === SCALE_OPTIONS.RATIO ? '1:1' : 'fullscreen'
    
    if (!hasImages) return 'STAGE • EMPTY'
    if (beforeImage && !afterImage) return `STAGE • BEFORE: ${beforeImage.name} loaded • scale: ${scaleText}`
    if (!beforeImage && afterImage) return `STAGE • AFTER: ${afterImage.name} loaded • scale: ${scaleText}`
    if (beforeImage && afterImage) return `STAGE • BEFORE: ${beforeImage.name} • AFTER: ${afterImage.name} loaded • scale: ${scaleText} • ${isDragging ? 'Dragging' : 'Click or drag to compare'}`
    return 'STAGE • EMPTY'
  }

  const renderComparison = () => {
    if (!hasBothImages) {
      return (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {beforeImage && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#ff0000' }}>BEFORE</h3>
              <img 
                src={beforeImage.src} 
                alt="Before" 
                style={{ 
                  ...getImageStyle(),
                  border: '2px solid #ff0000'
                }} 
              />
              <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
                {beforeImage.name} ({Math.round(beforeImage.size / 1024)}KB)
              </div>
            </div>
          )}
          {afterImage && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#00aa00' }}>AFTER</h3>
              <img 
                src={afterImage.src} 
                alt="After" 
                style={{ 
                  ...getImageStyle(),
                  border: '2px solid #00aa00'
                }} 
              />
              <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
                {afterImage.name} ({Math.round(afterImage.size / 1024)}KB)
              </div>
            </div>
          )}
        </div>
      )
    }

    // Both images loaded - show comparison view
    const containerStyle = scaleMode === SCALE_OPTIONS.FULLSCREEN ? {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    } : {
      textAlign: 'center'
    }

    return (
      <div style={containerStyle}>
        <div 
          ref={comparisonRef}
          onMouseDown={handleMouseDown}
          style={{ 
            position: 'relative', 
            display: 'inline-block',
            cursor: isDragging ? 'grabbing' : 'grab',
            border: scaleMode === SCALE_OPTIONS.FULLSCREEN ? 'none' : '2px solid #333',
            userSelect: 'none'
          }}
        >
          {/* Before Image - Full */}
          <img 
            src={beforeImage.src} 
            alt="Before" 
            style={{ 
              ...getImageStyle(),
              display: 'block'
            }} 
            draggable={false}
          />
          
          {/* After Image - Clipped */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              clipPath: `inset(0 0 0 ${sliderPosition}%)`
            }}
          >
            <img 
              src={afterImage.src} 
              alt="After" 
              style={{ 
                ...getImageStyle(),
                display: 'block'
              }} 
              draggable={false}
            />
          </div>
          
          {/* Slider Line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3px',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1px #000, 0 0 10px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              opacity: isDragging ? 1 : 0.8,
              transform: isDragging ? 'scaleY(1.1)' : 'scaleY(1)',
              transition: isDragging ? 'none' : 'opacity 0.2s, transform 0.2s'
            }}
          />
          
          {/* Labels */}
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'rgba(255, 0, 0, 0.9)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              opacity: sliderPosition > 10 ? 1 : 0,
              transition: 'opacity 0.2s',
              borderRadius: '2px'
            }}
          >
            BEFORE
          </div>
          
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0, 170, 0, 0.9)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              opacity: sliderPosition < 90 ? 1 : 0,
              transition: 'opacity 0.2s',
              borderRadius: '2px'
            }}
          >
            AFTER
          </div>

          {/* Fullscreen Exit Button */}
          {scaleMode === SCALE_OPTIONS.FULLSCREEN && (
            <button
              onClick={() => setScaleMode(SCALE_OPTIONS.FIT)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '50%',
                transform: 'translateX(50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                fontSize: '12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              EXIT FULLSCREEN
            </button>
          )}
        </div>
        
        {scaleMode !== SCALE_OPTIONS.FULLSCREEN && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            {isDragging ? `Dragging • ${Math.round(sliderPosition)}%` : `Click or drag to compare • Slider: ${Math.round(sliderPosition)}%`}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#ddd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
            LOGO
          </div>
          <h1>Image Comparison Bench</h1>
        </div>
      </header>
      
      <main style={{ minHeight: '400px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        {hasImages ? renderComparison() : (
          <p style={{ color: '#666', fontSize: '18px' }}>Click buttons below to load images for comparison</p>
        )}
      </main>

      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          ref={beforeInputRef}
          type="file"
          accept="image/*"
          onChange={handleBeforeChange}
          style={{ display: 'none' }}
        />
        <input
          ref={afterInputRef}
          type="file"
          accept="image/*"
          onChange={handleAfterChange}
          style={{ display: 'none' }}
        />
        
        <button 
          onClick={handleBeforeClick}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#ff0000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          LOAD BEFORE
        </button>

        {/* Scale Mode Dropdown */}
        <select
          value={scaleMode}
          onChange={(e) => setScaleMode(e.target.value)}
          disabled={!hasBothImages}
          style={{
            padding: '12px 16px',
            backgroundColor: hasBothImages ? 'white' : '#f0f0f0',
            border: '2px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: hasBothImages ? 'pointer' : 'not-allowed'
          }}
        >
          {Object.values(SCALE_OPTIONS).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <button 
          onClick={handleAfterClick}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#00aa00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          LOAD AFTER
        </button>
        
        <button 
          onClick={handleClear} 
          disabled={!hasImages} 
          style={{ 
            padding: '12px 20px', 
            backgroundColor: hasImages ? '#333' : '#ccc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: hasImages ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          CLEAR STAGE
        </button>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', fontSize: '12px', fontFamily: 'monospace' }}>
        <span>{getStatusText()}</span>
      </div>
    </div>
  )
}

export default App
