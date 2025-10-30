// Form input component with validation and error display
import React from 'react'
import { AlertCircle } from 'lucide-react'

interface FormInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'select'
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  className?: string
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options,
  className = ''
}) => {
  const baseInputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  const errorStyles = error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputStyles} ${errorStyles}`}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseInputStyles} ${errorStyles}`}
          required={required}
        />
      )}
      
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default FormInput