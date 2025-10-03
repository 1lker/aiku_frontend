import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = prompt.trim()
    if (!trimmed) return
    console.log('Prompt submitted:', trimmed)
  }

  return (
    <>
      <header className="topbar" role="banner">
        <div className="topbar-title large">AIKU</div>
      </header>

      <div className="app">
        <div className="tab-content">
          <p className="tab-helper">Describe your trip and preferences. We will plan it.</p>
          <form className="prompt-bar" onSubmit={handleSubmit}>
            <textarea
              className="prompt-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. I want to go from Istanbul to Berlin, I will stay for 4 days"
              aria-label="Trip planning prompt"
            />
            <button className="prompt-button" type="submit">Plan</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
