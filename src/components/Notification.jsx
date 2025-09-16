import { useEffect } from 'react'
import './Notification.css'

const Notification = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && onClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  if (!isVisible || !message) return null

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-message">{message}</span>
      {onClose && (
        <button 
          className="notification-close" 
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Notification
