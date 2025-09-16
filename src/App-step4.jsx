import React, { useState } from 'react'

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  
  const loadBefore = () => {
    setBeforeImage({
      name: 'test-before.svg',
      loaded: true,
      type: 'before'
    })
  }
  
  const loadAfter = () => {
    setAfterImage({
      name: 'test-after.svg', 
      loaded: true,
      type: 'after'
    })
  }
  
  const clearAll = () => {
    setBeforeImage(null)
    setAfterImage(null)
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
          {beforeImage ? (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#ffcccc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ff0000', flexDirection: 'column', fontSize: '12px' }}>
              <div>Before Image</div>
              <div>{beforeImage.name}</div>
            </div>
          ) : (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
              No Image
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h3>AFTER</h3>
          {afterImage ? (
            <div style={{ width: '150px', height: '100px', backgroundColor: '#ccffcc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #00ff00', flexDirection: 'column', fontSize: '12px' }}>
              <div>After Image</div>
              <div>{afterImage.name}</div>
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
        <span>STAGE • Before: {beforeImage ? `${beforeImage.name} loaded` : 'empty'} • After: {afterImage ? `${afterImage.name} loaded` : 'empty'}</span>
      </div>
    </div>
  )
}

export default App
