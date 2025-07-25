export default function MessageBubble({ role, text, timestamp }) {
  const isUser = role === "user"
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in group`}>
      <div className={`max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 my-1 sm:my-2 rounded-2xl sm:rounded-3xl whitespace-pre-wrap shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] text-sm sm:text-base lg:text-lg leading-relaxed ${
        isUser 
          ? "bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white ml-4 sm:ml-8 lg:ml-12 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700" 
          : "bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl text-gray-900 dark:text-white mr-4 sm:mr-8 lg:mr-12 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800"
      }`}>
        {!isUser && (
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            <div className="relative">
              <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                AI Assistant
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Just now</div>
            </div>
          </div>
        )}
        
        {isUser && (
          <div className="flex items-center justify-end space-x-3 mb-3 sm:mb-4">
            <div>
              <span className="text-sm sm:text-base font-bold text-white/90">You</span>
              <div className="text-xs text-white/70 font-medium">Just now</div>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        )}
        
        <div className="font-medium leading-relaxed">{text}</div>
        
        {timestamp && (
          <div className={`text-xs mt-3 sm:mt-4 opacity-70 font-medium ${
            isUser ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          }`}>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        )}
        
        {/* Message Actions */}
        <div className={`flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          isUser ? "border-white/20" : "border-gray-200 dark:border-gray-600"
        }`}>
          <div className="flex space-x-2">
            {!isUser && (
              <>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className={`text-xs font-medium ${isUser ? "text-white/50" : "text-gray-400 dark:text-gray-500"}`}>
            {text.length} chars
          </div>
        </div>
      </div>
    </div>
  )
}