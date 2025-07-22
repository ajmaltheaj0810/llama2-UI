export default function SessionSidebar({ sessions, currentId, onSelect, onNew }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold text-lg">Chat Sessions</h2>
        <button
          onClick={onNew}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
        >
          + New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm">No sessions yet</div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={`block w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700 transition-colors ${
                currentId === session.id ? "bg-gray-700" : ""
              }`}
            >
              <div className="text-white font-medium">
                {session.session_name || `Session #${session.id}`}
              </div>
              <div className="text-gray-400 text-xs">
                {new Date(session.created_at).toLocaleDateString()}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
