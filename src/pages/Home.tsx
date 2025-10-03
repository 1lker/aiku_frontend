import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validatePrompt } from '../utils/validation'
import PlanChoiceModal from '../ui/PlanChoiceModal'

function Home() {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showChooser, setShowChooser] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const maybeError = validatePrompt(prompt)
    if (maybeError) {
      setError(maybeError)
      setShowChooser(false)
      return
    }
    setError(null)
    setShowChooser(true)
  }

  return (
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
        <button className="prompt-button" type="submit">Plan Your Trip</button>
      </form>
      {error && <div role="alert" className="error-text">{error}</div>}

      {showChooser && (
        <PlanChoiceModal
          onClose={() => setShowChooser(false)}
          onChoose={(mode) => {
            setShowChooser(false)
            navigate(mode === 'step' ? '/plan/step' : '/plan/full', { state: { prompt } })
          }}
        />
      )}
    </div>
  )
}

export default Home


