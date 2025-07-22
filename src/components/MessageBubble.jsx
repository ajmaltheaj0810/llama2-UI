export default function MessageBubble({ role, text, timestamp }) {
  const isUser = role === "user"
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-[85%] sm:max-w-md lg:max-w-2xl px-4 sm:px-6 py-3 sm:py-4 my-1 sm:my-2 rounded-2xl whitespace-pre-wrap shadow-lg transition-all duration-200 hover:shadow-xl text-sm sm:text-base ${
        isUser 
          ? "bg-black text-white ml-4 sm:ml-8 lg:ml-12" 
          : "bg-white/90 backdrop-blur-sm text-gray-900 mr-4 sm:mr-8 lg:mr-12 border border-gray-200"
      }`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-black">AI Assistant</span>
          </div>
        )}
        <div className="leading-relaxed">{text}</div>
        {timestamp && (
          <div className={`text-xs mt-1 sm:mt-2 opacity-70 ${
            isUser ? "text-gray-300" : "text-gray-600"
          }`}>
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}