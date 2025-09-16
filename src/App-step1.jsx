import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-container">
          <img src="/icb-logo.jpg" alt="ICB Logo" className="app-logo" />
          <h1 className="app-title">Image Comparison Bench</h1>
        </div>
      </header>
      
      <main className="app-main">
        <div className="comparison-container">
          <p>Image comparer will go here</p>
        </div>
      </main>

      <div className="toolbar">
        <p>Toolbar will go here</p>
      </div>
      
      <div className="status-bar">
        <span className="status-text">STAGE • EMPTY</span>
      </div>
    </div>
  )
}

export default App
