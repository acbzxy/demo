import React from 'react'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useNotification } from '../../context/NotificationContext'
import type { NotificationType } from '../../types'

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification()

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6" />
      case 'error':
        return <ExclamationCircleIcon className="w-6 h-6" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6" />
      case 'info':
      default:
        return <InformationCircleIcon className="w-6 h-6" />
    }
  }

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-gray-900'
      case 'info':
      default:
        return 'bg-blue-500 text-white'
    }
  }

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-start gap-3 p-4 rounded-lg shadow-lg
            animate-slide-in transition-all duration-300
            ${getStyles(notification.type)}
          `}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            {getIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {notification.title && (
              <h4 className="text-sm font-semibold mb-1">
                {notification.title}
              </h4>
            )}
            <p className="text-sm leading-relaxed">
              {notification.message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 p-1 rounded-md hover:bg-white/20 transition-colors duration-200"
            title="Đóng thông báo"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationContainer
