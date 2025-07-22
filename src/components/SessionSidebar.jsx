export default function SessionSidebar({ sessions, currentId, onSelect, onNew }) {
  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="font-bold text-xl">Chat Sessions</h2>
        </div>
        <button
          onClick={onNew}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {sessions.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No chat sessions yet</p>
            <p className="text-gray-500 text-xs mt-1">Start a new conversation to begin</p>
          </div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={`block w-full text-left px-6 py-4 hover:bg-gray-700/50 border-b border-gray-700/30 transition-all duration-200 group ${
                currentId === session.id ? "bg-gray-700/70 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  currentId === session.id ? "bg-blue-500" : "bg-gray-600 group-hover:bg-gray-500"
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">
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
      
      <div className="p-6 border-t border-gray-700/50">
        <div className="text-xs text-gray-400 text-center">
          <p>Powered by AI Technology</p>
          <p className="mt-1 opacity-75">© 2025 LLM Chatbot</p>
        </div>
      </div>
    </div>
  )
}
