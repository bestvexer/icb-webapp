import React, { useState } from 'react'

function App() {
  const [hasBeforeImage, setHasBeforeImage] = useState(false)
  const [hasAfterImage, setHasAfterImage] = useState(false)
  
  const loadBefore = () => setHasBeforeImage(true)
  const loadAfter = () => setHasAfterImage(true)
  const clearAll = () => {
    setHasBeforeImage(false)
    setHasAfterImage(false)
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
      
      <main style={{ minHeight: '400px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>BEFORE</h3>
          {hasBeforeImage ? (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ff0000' }}>
              Before Image
            </div>
          ) : (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
              No Image
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>AFTER</h3>
          {hasAfterImage ? (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#ccffcc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #00ff00' }}>
              After Image
            </div>
          ) : (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
              No Image
            </div>
          )}
        </div>
      </main>

      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={loadBefore} style={{ padding: '8px 16px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          LOAD BEFORE
        </button>
        <button onClick={loadAfter} style={{ padding: '8px 16px', backgroundColor: '#00ff00', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          LOAD AFTER
        </button>
        <button onClick={clearAll} style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          CLEAR
        </button>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', fontSize: '12px' }}>
        <span>STAGE • Before: {hasBeforeImage ? 'loaded' : 'empty'} • After: {hasAfterImage ? 'loaded' : 'empty'}</span>
      </div>
    </div>
  )
}

export default App
