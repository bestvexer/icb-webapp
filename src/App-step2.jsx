import React, { useState } from 'react'

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  
  const hasImages = beforeImage || afterImage
  
  const handleLoadBefore = () => {
    setBeforeImage({ src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="%23ff0000"/><text x="150" y="100" text-anchor="middle" fill="white">BEFORE IMAGE</text></svg>', name: 'test-before.svg' })
  }
  
  const handleLoadAfter = () => {
    setAfterImage({ src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="%2300ff00"/><text x="150" y="100" text-anchor="middle" fill="white">AFTER IMAGE</text></svg>', name: 'test-after.svg' })
  }
  
  const handleClear = () => {
    setBeforeImage(null)
    setAfterImage(null)
  }

  const getStatusText = () => {
    if (!hasImages) return 'STAGE • EMPTY'
    if (beforeImage && !afterImage) return 'STAGE • BEFORE: IMG loaded'
    if (!beforeImage && afterImage) return 'STAGE • AFTER: IMG loaded'
    if (beforeImage && afterImage) return 'STAGE • BEFORE: IMG loaded • AFTER: IMG loaded'
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
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {beforeImage && (
              <div>
                <p><strong>BEFORE</strong></p>
                <img src={beforeImage.src} alt="Before" style={{ maxWidth: '200px', border: '2px solid #ff0000' }} />
              </div>
            )}
            {afterImage && (
              <div>
                <p><strong>AFTER</strong></p>
                <img src={afterImage.src} alt="After" style={{ maxWidth: '200px', border: '2px solid #00ff00' }} />
              </div>
            )}
          </div>
        ) : (
          <p>Click buttons below to load test images</p>
        )}
      </main>

      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={handleLoadBefore} style={{ padding: '8px 16px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          LOAD BEFORE
        </button>
        <button onClick={handleLoadAfter} style={{ padding: '8px 16px', backgroundColor: '#00ff00', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          LOAD AFTER
        </button>
        <button onClick={handleClear} disabled={!hasImages} style={{ padding: '8px 16px', backgroundColor: hasImages ? '#333' : '#ccc', color: 'white', border: 'none', borderRadius: '4px', cursor: hasImages ? 'pointer' : 'not-allowed' }}>
          CLEAR
        </button>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', fontSize: '12px' }}>
        <span>{getStatusText()}</span>
      </div>
    </div>
  )
}

export default App
