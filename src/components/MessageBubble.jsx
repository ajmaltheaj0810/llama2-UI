export default function MessageBubble({ role, text, timestamp }) {
  const isUser = role === "user"
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className={`max-w-2xl px-6 py-4 my-2 rounded-2xl whitespace-pre-wrap shadow-lg transition-all duration-200 hover:shadow-xl ${
        isUser 
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-12" 
          : "bg-white/80 backdrop-blur-sm text-gray-800 mr-12 border border-gray-200/50"
      }`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">AI Assistant</span>
          </div>
        )}
        <div className="text-base leading-relaxed">{text}</div>
        {timestamp && (
          <div className={`text-xs mt-2 opacity-70 ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}>
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}
