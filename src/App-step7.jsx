import React, { useState, useRef } from 'react'

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const beforeInputRef = useRef(null)
  const afterInputRef = useRef(null)
  
  const hasImages = beforeImage || afterImage
  
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
    e.target.value = '' // Reset to allow same file again
  }
  
  const handleAfterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleLoadAfter(file)
    }
    e.target.value = '' // Reset to allow same file again
  }
  
  const handleClear = () => {
    setBeforeImage(null)
    setAfterImage(null)
  }

  const getStatusText = () => {
    if (!hasImages) return 'STAGE • EMPTY'
    if (beforeImage && !afterImage) return `STAGE • BEFORE: ${beforeImage.name} loaded`
    if (!beforeImage && afterImage) return `STAGE • AFTER: ${afterImage.name} loaded`
    if (beforeImage && afterImage) return `STAGE • BEFORE: ${beforeImage.name} • AFTER: ${afterImage.name} loaded`
    return 'STAGE • EMPTY'
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
        {hasImages ? (
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
        ) : (
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
