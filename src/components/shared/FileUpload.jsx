import { useRef, useState } from 'react'

export default function FileUpload({ onFileSelect, accept = 'image/*', maxSizeMB = 5, label, className = '' }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be under ${maxSizeMB}MB`)
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)
    onFileSelect(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const fakeEvent = { target: { files: [file] } }
      handleChange(fakeEvent)
    }
  }

  function clear() {
    setPreview(null)
    setError(null)
    inputRef.current.value = ''
    onFileSelect(null)
  }

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</p>}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer
          ${preview ? 'border-rose-300 dark:border-rose-700' : 'border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700'}`}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clear() }}
              className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow text-gray-500 hover:text-red-500"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-rose-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">Max {maxSizeMB}MB</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
