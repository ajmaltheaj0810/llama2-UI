import { useState } from 'react'

export default function SessionSidebar({ sessions, currentId, onSelect, onNew }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-screen
        w-80 sm:w-96 lg:w-80 
        bg-gradient-to-b from-black to-gray-900 text-white 
        flex flex-col shadow-2xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="black" />
                </svg>
              </div>
              <h2 className="font-bold text-lg sm:text-xl">Chat Sessions</h2>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
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
            className="w-full bg-white text-black hover:bg-gray-100 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {sessions.length === 0 ? (
            <div className="p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm font-medium">No chat sessions yet</p>
              <p className="text-gray-400 text-xs mt-1">Start a new conversation to begin</p>
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  onSelect(session.id)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-800/70 border-b border-gray-700/30 transition-all duration-200 group ${
                  currentId === session.id ? "bg-gray-800 border-l-4 border-l-white" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full transition-colors ${
                    currentId === session.id ? "bg-white" : "bg-gray-600 group-hover:bg-gray-400"
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate text-sm sm:text-base">
                      {session.session_name || `Chat Session #${session.id}`}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {new Date(session.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
        
        <div className="p-4 sm:p-6 border-t border-gray-700/50">
          <div className="text-xs text-gray-400 text-center">
            <p>Powered by AI Technology</p>
            <p className="mt-1 opacity-75 font-medium">© 2025 LLM Chatbot</p>
          </div>
        </div>
      </div>
    </>
  )
}
