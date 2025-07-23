import { useState } from 'react'

export default function SendMessageBar({ onSend, loading, disabled }) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim() || loading || disabled) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 p-3 sm:p-4 lg:p-6 shadow-2xl dark:bg-gray-900/95 dark:border-gray-700/50 z-10">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="relative flex-1">
          <textarea
            className="w-full border-2 border-gray-300/50 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium dark:bg-gray-800/90 dark:border-gray-600/50 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400/20 dark:focus:border-blue-400"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send)"
            disabled={loading || disabled}
            maxLength={1000}
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-medium dark:text-gray-500">
            {input.length}/1000
          </div>
        </div>
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || disabled}
          className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 disabled:transform-none font-bold text-sm sm:text-base w-full sm:w-auto min-w-[100px] sm:min-w-[120px] dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-current"></div>
              <span className="hidden sm:inline">Sending</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Send</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          )}
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="flex justify-center mt-3 sm:mt-4 gap-2 sm:gap-4">
        <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105">
          💡 Ask a question
        </button>
        <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105">
          ✨ Get creative
        </button>
        <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105">
          🔍 Analyze
        </button>
      </div>
    </div>
  )
}