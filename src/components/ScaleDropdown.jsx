import { useState, useRef, useEffect } from 'react'
import './ScaleDropdown.css'

const ScaleDropdown = ({ value, onChange, options, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    // Show additional options when dropdown is open or when images are loaded
    if (value === options.FIT) {
      return isOpen ? 'SCALE TO FIT' : 'SCALE TO FIT ▼'
    }
    if (value === options.RATIO) {
      return '1:1 RATIO'
    }
    if (value === options.FULLSCREEN) {
      return 'FULLSCREEN'
    }
    return 'SCALE TO FIT ▼'
  }

  return (
    <div className="scale-dropdown" ref={dropdownRef}>
      <button 
        className={`scale-dropdown-toggle ${disabled ? 'scale-dropdown-disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        {getDisplayText()}
      </button>
      
      {isOpen && (
        <div className="scale-dropdown-menu">
          <button
            className={`scale-dropdown-item ${value === options.FIT ? 'active' : ''}`}
            onClick={() => handleSelect(options.FIT)}
          >
            SCALE TO FIT
          </button>
          <button
            className={`scale-dropdown-item ${value === options.RATIO ? 'active' : ''}`}
            onClick={() => handleSelect(options.RATIO)}
          >
            1:1 RATIO
          </button>
          <button
            className={`scale-dropdown-item ${value === options.FULLSCREEN ? 'active' : ''}`}
            onClick={() => handleSelect(options.FULLSCREEN)}
          >
            FULLSCREEN
          </button>
        </div>
      )}
    </div>
  )
}

export default ScaleDropdown
