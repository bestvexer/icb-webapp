import { useState, useRef, useCallback } from 'react'
import './App.css'
import ImageComparer from './components/ImageComparer'
import Toolbar from './components/Toolbar'
import Notification from './components/Notification'
import { validateImageFile, handleAsyncError } from './utils/errorHandling'

const SCALE_OPTIONS = {
  FIT: 'Scale to Fit',
  RATIO: '1:1 Ratio',
  FULLSCREEN: 'Fullscreen'
}

function App() {
  const [beforeImage, setBeforeImage] = useState(null)
  const [afterImage, setAfterImage] = useState(null)
  const [scaleMode, setScaleMode] = useState(SCALE_OPTIONS.FIT)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const comparerRef = useRef(null)

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type, isVisible: true })
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }, [])

  const handleLoadBefore = useCallback((file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBeforeImage({
          src: e.target.result,
          name: file.name
        })
        showNotification('Before image loaded successfully', 'success')
      }
      reader.readAsDataURL(file)
    }
  }, [showNotification])

  const handleLoadAfter = useCallback((file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAfterImage({
          src: e.target.result,
          name: file.name
        })
        showNotification('After image loaded successfully', 'success')
      }
      reader.readAsDataURL(file)
    }
  }, [showNotification])

  const handleClearStage = useCallback(() => {
    setBeforeImage(null)
    setAfterImage(null)
    setSliderPosition(50)
    showNotification('Stage cleared', 'info')
  }, [showNotification])

  const hasImages = beforeImage || afterImage
  const hasBothImages = beforeImage && afterImage

  const getStatusText = () => {
    if (!hasImages) {
      return 'STAGE • EMPTY'
    } else if (beforeImage && !afterImage) {
      return 'STAGE • BEFORE: IMG loaded'
    } else if (!beforeImage && afterImage) {
      return 'STAGE • AFTER: IMG loaded'
    } else if (hasBothImages) {
      const scaleText = scaleMode === SCALE_OPTIONS.FIT ? 'fit' : 
                       scaleMode === SCALE_OPTIONS.RATIO ? '1:1' : 'fullscreen'
      return `STAGE • BEFORE: IMG loaded • AFTER: IMG loaded • scale: ${scaleText}`
    }
    return 'STAGE • EMPTY'
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-container">
          <img src="/icb-logo.jpg" alt="ICB Logo" className="app-logo" />
          <h1 className="app-title">Image Comparison Bench</h1>
        </div>
      </header>
      
      <main className="app-main">
        <div className="comparison-container" ref={comparerRef}>
          <ImageComparer
            beforeImage={beforeImage}
            afterImage={afterImage}
            scaleMode={scaleMode}
            sliderPosition={sliderPosition}
            onSliderChange={setSliderPosition}
          />
        </div>
      </main>

      <Toolbar
        onLoadBefore={handleLoadBefore}
        onLoadAfter={handleLoadAfter}
        onClearStage={handleClearStage}
        onDownload={() => console.log('Download')}
        scaleMode={scaleMode}
        onScaleModeChange={setScaleMode}
        scaleOptions={SCALE_OPTIONS}
        hasImages={hasImages}
        hasBothImages={hasBothImages}
        isLoading={isLoading}
      />
      
      <div className="status-bar">
        <span className="status-text">{getStatusText()}</span>
      </div>
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  )
}

export default App
