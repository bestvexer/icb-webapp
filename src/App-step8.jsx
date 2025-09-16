import React, { useState, useRef } from 'react'

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [sliderPosition, setSliderPosition] = useState(50)
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

  const handleComparisonClick = (e) => {
    if (!hasBothImages || !comparisonRef.current) return
    
    const rect = comparisonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const getStatusText = () => {
    if (!hasImages) return 'STAGE • EMPTY'
    if (beforeImage && !afterImage) return `STAGE • BEFORE: ${beforeImage.name} loaded`
    if (!beforeImage && afterImage) return `STAGE • AFTER: ${afterImage.name} loaded`
    if (beforeImage && afterImage) return `STAGE • BEFORE: ${beforeImage.name} • AFTER: ${afterImage.name} loaded • Click to compare`
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
                  maxWidth: '300px', 
                  maxHeight: '300px', 
                  border: '2px solid #ff0000',
                  objectFit: 'contain'
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
                  maxWidth: '300px', 
                  maxHeight: '300px', 
                  border: '2px solid #00aa00',
                  objectFit: 'contain'
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
    return (
      <div style={{ textAlign: 'center' }}>
        <div 
          ref={comparisonRef}
          onClick={handleComparisonClick}
          style={{ 
            position: 'relative', 
            display: 'inline-block',
            cursor: 'crosshair',
            border: '2px solid #333'
          }}
        >
          {/* Before Image - Full */}
          <img 
            src={beforeImage.src} 
            alt="Before" 
            style={{ 
              maxWidth: '600px', 
              maxHeight: '400px', 
              display: 'block',
              objectFit: 'contain'
            }} 
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
                maxWidth: '600px', 
                maxHeight: '400px', 
                display: 'block',
                objectFit: 'contain'
              }} 
            />
          </div>
          
          {/* Slider Line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '2px',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1px #000',
              pointerEvents: 'none'
            }}
          />
          
          {/* Labels */}
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'rgba(255, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              opacity: sliderPosition > 10 ? 1 : 0,
              transition: 'opacity 0.2s'
            }}
          >
            BEFORE
          </div>
          
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0, 170, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              opacity: sliderPosition < 90 ? 1 : 0,
              transition: 'opacity 0.2s'
            }}
          >
            AFTER
          </div>
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Click anywhere on the image to compare • Slider: {Math.round(sliderPosition)}%
        </div>
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

      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
