export default function Textarea({
  label,
  error,
  helper,
  maxLength,
  className = '',
  required,
  value,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        maxLength={maxLength}
        className={`input-field resize-none ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        {...props}
      />
      <div className="flex justify-between">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helper ? (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>
        ) : (
          <span />
        )}
        {maxLength && (
          <p className="text-xs text-gray-400">
            {(value || '').length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
}
