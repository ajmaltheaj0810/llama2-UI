export default function MessageBubble({ role, text, timestamp }) {
  const bubble = role === "user" 
    ? "self-end bg-blue-500 text-white" 
    : "self-start bg-gray-200 text-gray-900"
  
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-lg px-4 py-2 my-1 rounded-lg whitespace-pre-wrap ${bubble}`}>
        <div className="text-sm mb-1">{text}</div>
        {timestamp && (
          <div className={`text-xs opacity-70 ${
            role === "user" ? "text-blue-100" : "text-gray-500"
          }`}>
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
}
