import './index.css'
import ChatPage from './components/ChatPage'
import DarkModeToggle from './components/DarkModeToggle'

function App() {
  return (
    <div className="w-full h-screen relative">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <ChatPage />
    </div>
  )
}

export default App
