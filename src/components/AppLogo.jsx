import React, { useState } from 'react'
import './AppLogo.css'

const AppLogo = () => {
  const [logoError, setLogoError] = useState(false)
  const [logoSrc, setLogoSrc] = useState('/icb-logo.jpg')
  
  if (logoError) {
    // Text-based fallback logo
    return (
      <div className="app-logo-fallback">
        <span className="logo-text">ICB</span>
      </div>
    )
  }
  
  return (
    <img 
      src={logoSrc} 
      alt="ICB Logo" 
      className="app-logo"
      onError={(e) => {
        console.warn(`Logo failed to load from ${logoSrc}. Trying fallback methods...`)
        // Try alternative sources before giving up
        if (logoSrc === '/icb-logo.jpg') {
          console.log('Trying relative path fallback...')
          setLogoSrc('./icb-logo.jpg')
        } else if (logoSrc === './icb-logo.jpg') {
          console.log('Trying vite asset fallback...')
          setLogoSrc('/public/icb-logo.jpg')
        } else {
          console.log('All logo sources failed, using text fallback')
          setLogoError(true)
        }
      }}
      onLoad={() => console.log(`Logo loaded successfully from ${logoSrc}`)}
    />
  )
}

export default AppLogo