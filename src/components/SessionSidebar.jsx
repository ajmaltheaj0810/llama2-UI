import { useState } from 'react'

export default function SessionSidebar({ sessions, currentId, onSelect, onNew }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white p-3 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300 backdrop-blur-xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-screen
        w-80 sm:w-96 lg:w-80 xl:w-96
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white 
        flex flex-col shadow-2xl z-40
        transform transition-all duration-500 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        backdrop-blur-xl border-r border-gray-700/50 dark:border-gray-800/50
      `}>
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-8 w-16 h-16 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative p-6 sm:p-8 border-b border-gray-700/50 dark:border-gray-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h2 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Chat Sessions
                </h2>
                <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">{sessions.length} conversations</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              onNew()
              setIsOpen(false)
            }}
            className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Conversation</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-500 scrollbar-track-gray-800 dark:scrollbar-track-gray-900 relative">
          {sessions.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-700 to-gray-600 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-2">No conversations yet</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-relaxed">
                Start your first conversation to see it appear here
              </p>
            </div>
          ) : (
            <div className="p-2">
              {sessions.map((session, index) => (
                <button
                  key={session.id}
                  onClick={() => {
                    onSelect(session.id)
                    setIsOpen(false)
                  }}
                  className={`group block w-full text-left p-4 sm:p-5 mb-2 hover:bg-white/10 rounded-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
                    currentId === session.id 
                      ? "bg-white/15 dark:bg-white/10 border-white/30 dark:border-white/20 shadow-2xl" 
                      : "border-gray-700/30 dark:border-gray-800/30 hover:border-white/20 dark:hover:border-white/10"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentId === session.id 
                        ? "bg-blue-400 dark:bg-blue-300 shadow-lg" 
                        : "bg-gray-600 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold truncate text-base sm:text-lg group-hover:text-gray-100 transition-colors duration-200">
                        {session.session_name || `Chat Session #${session.id}`}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                          {new Date(session.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-600 font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative p-6 sm:p-8 border-t border-gray-700/50 dark:border-gray-800/50 bg-gradient-to-t from-gray-900/50 dark:from-gray-950/50 to-transparent">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 dark:text-green-300 text-sm font-bold">AI Online</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">Powered by Advanced AI Technology</p>
            <p className="text-gray-500 dark:text-gray-600 text-xs mt-1 opacity-75">© 2025 LLM Chatbot</p>
          </div>
        </div>
      </div>
    </>
  )
}