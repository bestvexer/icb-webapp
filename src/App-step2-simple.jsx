import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  
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
      
      <main style={{ minHeight: '400px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', flexDirection: 'column', gap: '20px' }}>
        <p>Testing useState - Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)} 
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(0)} 
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </main>
      
      <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', fontSize: '12px' }}>
        <span>STAGE • Testing basic state - Count: {count}</span>
      </div>
    </div>
  )
}

export default App
