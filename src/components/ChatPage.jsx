import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SessionSidebar from './SessionSidebar'
import MessageBubble from './MessageBubble'

export default function ChatPage() {
  const [sessions, setSessions] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    refreshSessions()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function refreshSessions() {
    try {
      const { data } = await axios.get('/api/chat/sessions/')
      setSessions(data)
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  async function loadSession(id) {
    try {
      const { data } = await axios.get(`/api/chat/history/${id}/`)
      setCurrentId(id)
      setMessages(data)
    } catch (error) {
      console.error('Failed to load session:', error)
    }
  }

  async function newSession() {
    try {
      const { data } = await axios.post('/api/chat/sessions/', { 
        session_name: `New Chat ${new Date().toLocaleDateString()}` 
      })
      await refreshSessions()
      loadSession(data.id)
    } catch (error) {
      console.error('Failed to create session:', error)
    }
  }

  async function send() {
    if (!input.trim() || loading) return
    const prompt = input.trim()
    setInput('')
    setLoading(true)
    setMessages(m => [...m, { role: 'user', message: prompt }])

    try {
      const { data } = await axios.post('/api/chat/', { 
        session_id: currentId, 
        message: prompt 
      })
      if (!currentId) setCurrentId(data.session_id)
      setMessages(m => [...m, { role: 'bot', message: data.bot.message }])
      refreshSessions()
    } catch (error) {
      setMessages(m => [...m, { 
        role: 'bot', 
        message: '⚠️ Error contacting backend/LLM. Please ensure Django and Ollama are running.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <SessionSidebar
        sessions={sessions}
        currentId={currentId}
        onSelect={loadSession}
        onNew={newSession}
      />
      
      <div className="flex flex-col flex-1 relative">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-black rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-gray-800 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gray-600 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Header */}
        <div className="relative bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                  {currentId ? `Chat Session #${currentId}` : "AI Assistant"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Powered by Advanced AI • Online</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="px-3 py-1 bg-black/10 rounded-full text-xs font-semibold text-gray-700">
                {messages.length} messages
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 xl:p-8 bg-gradient-to-b from-gray-50/30 to-white/50 backdrop-blur-sm relative">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full animate-fade-in">
              <div className="text-center max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-black via-gray-800 to-black rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-all duration-500">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-black/20 to-gray-600/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-3 sm:mb-4">
                  Welcome to AI Chat
                </h2>
                <p className="text-gray-700 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 font-medium leading-relaxed">
                  Experience the future of conversation with our advanced AI assistant
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">💡</span>
                    </div>
                    <span className="text-black font-bold text-lg">Ask Anything</span>
                    <p className="text-gray-700 mt-2 leading-relaxed">Get instant, intelligent answers to any question</p>
                  </div>
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">🚀</span>
                    </div>
                    <span className="text-black font-bold text-lg">Create & Innovate</span>
                    <p className="text-gray-700 mt-2 leading-relaxed">Generate ideas, content, and creative solutions</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 sm:space-y-6 max-w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  role={msg.role}
                  text={msg.message}
                  timestamp={msg.timestamp}
                />
              ))}
              {loading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl px-6 sm:px-8 py-4 sm:py-6 max-w-xs sm:max-w-md shadow-2xl border border-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
                        <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-800 font-semibold">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="relative bg-white/95 backdrop-blur-xl border-t border-gray-200/50 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 max-w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <div className="relative flex-1">
              <textarea
                className="w-full border-2 border-gray-300/50 rounded-2xl sm:rounded-3xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black resize-none bg-white/90 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl text-black placeholder-gray-500 text-sm sm:text-base lg:text-lg font-medium"
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                disabled={loading}
                style={{ minHeight: '56px' }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-medium">
                {input.length}/1000
              </div>
            </div>
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-black to-gray-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl sm:rounded-3xl hover:from-gray-800 hover:to-black disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-black/25 transform hover:scale-105 disabled:transform-none font-bold text-sm sm:text-base lg:text-lg w-full sm:w-auto min-w-[120px] sm:min-w-[140px]"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Sending</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              )}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex justify-center mt-4 space-x-2 sm:space-x-4">
            <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105">
              💡 Ask a question
            </button>
            <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105">
              ✨ Get creative
            </button>
            <button className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-105">
              🔍 Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}