import { useRef } from 'react'
import './Toolbar.css'
import ScaleDropdown from './ScaleDropdown'

const Toolbar = ({ 
  onLoadBefore, 
  onLoadAfter, 
  onClearStage, 
  onDownload, 
  scaleMode, 
  onScaleModeChange, 
  scaleOptions,
  hasImages,
  hasBothImages,
  isLoading 
}) => {
  const beforeInputRef = useRef(null)
  const afterInputRef = useRef(null)

  const handleBeforeClick = () => {
    beforeInputRef.current?.click()
  }

  const handleAfterClick = () => {
    afterInputRef.current?.click()
  }

  const handleBeforeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onLoadBefore(file)
    }
    // Reset input to allow selecting the same file again
    e.target.value = ''
  }

  const handleAfterChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onLoadAfter(file)
    }
    // Reset input to allow selecting the same file again
    e.target.value = ''
  }

  return (
    <div className="toolbar">
      <div className="toolbar-buttons">
        <button 
          className="toolbar-button"
          onClick={handleBeforeClick}
          disabled={isLoading}
        >
          {isLoading ? 'LOADING...' : 'LOAD BEFORE'}
        </button>
        <input
          ref={beforeInputRef}
          type="file"
          accept="image/*"
          onChange={handleBeforeChange}
          style={{ display: 'none' }}
        />

        <ScaleDropdown
          value={scaleMode}
          onChange={onScaleModeChange}
          options={scaleOptions}
          disabled={!hasBothImages}
        />
        
        <button 
          className={`toolbar-button ${!hasImages ? 'toolbar-button-disabled' : ''}`}
          onClick={onClearStage}
          disabled={!hasImages || isLoading}
        >
          CLEAR STAGE
        </button>

        <button 
          className={`toolbar-button ${!hasBothImages ? 'toolbar-button-disabled' : ''}`}
          onClick={onDownload}
          disabled={!hasBothImages || isLoading}
        >
          {isLoading ? 'PROCESSING...' : 'DOWNLOAD'}
        </button>

        <button 
          className="toolbar-button"
          onClick={handleAfterClick}
          disabled={isLoading}
        >
          {isLoading ? 'LOADING...' : 'LOAD AFTER'}
        </button>
        <input
          ref={afterInputRef}
          type="file"
          accept="image/*"
          onChange={handleAfterChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default Toolbar
