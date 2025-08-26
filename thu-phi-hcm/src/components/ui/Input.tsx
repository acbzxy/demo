import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  icon,
  fullWidth = true,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={clsx('form-group', { 'w-full': fullWidth })}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="form-label"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          className={clsx(
            'form-input',
            {
              'pl-10': icon,
              'border-red-300 focus:border-red-500 focus:ring-red-500': error,
            },
            className
          )}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Help text */}
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  )
}

export default Input
