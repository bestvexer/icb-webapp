import React from 'react'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test App</h1>
      <p>If this refreshes without freezing, the issue is with our complex components.</p>
      <button onClick={() => console.log('Button clicked')}>
        Test Button
      </button>
    </div>
  )
}

export default App
