export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-black to-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-black/20 to-gray-600/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-2">
          Loading AI Assistant
        </h2>
        <p className="text-gray-600 text-sm sm:text-base font-medium">
          Preparing your chat experience...
        </p>
      </div>
    </div>
  )
}