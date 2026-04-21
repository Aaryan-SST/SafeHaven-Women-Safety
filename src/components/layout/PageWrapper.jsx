export default function PageWrapper({ children, className = '' }) {
  return (
    <main className={`min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </main>
  )
}
