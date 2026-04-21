export default function Input({
  label,
  error,
  helper,
  className = '',
  required,
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
      <input
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helper && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>}
    </div>
  )
}
