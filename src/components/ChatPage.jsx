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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-white">
      <SessionSidebar
        sessions={sessions}
        currentId={currentId}
        onSelect={loadSession}
        onNew={newSession}
      />
      
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">
                {currentId ? `Chat Session #${currentId}` : "AI Assistant"}
              </h1>
              <p className="text-sm text-gray-600">Powered by LLM Technology</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black mb-3">
                  Welcome to AI Chat!
                </h2>
                <p className="text-gray-700 text-lg mb-6">Start a conversation and experience the power of AI assistance</p>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                    <span className="text-black font-semibold">💡 Ask questions</span>
                    <p className="text-gray-700 mt-1">Get instant answers and explanations</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                    <span className="text-black font-semibold">🚀 Get creative</span>
                    <p className="text-gray-700 mt-1">Generate ideas, stories, and solutions</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 max-w-4xl mx-auto">
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
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-lg shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-gray-700 font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 p-6 shadow-lg">
          <div className="flex space-x-4 max-w-4xl mx-auto">
            <textarea
              className="flex-1 border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-none bg-white shadow-sm transition-all duration-200 hover:shadow-md text-black placeholder-gray-500"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Send</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
