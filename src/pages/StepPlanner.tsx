import { useLocation } from 'react-router-dom'

function StepPlanner() {
  const location = useLocation() as { state?: { prompt?: string } }
  const prompt = location.state?.prompt

  return (
    <div className="page">
      <h2>Plan Step by Step</h2>
      <p>We guide you through each step of building your itinerary (destinations, lodging, activities, and timing).</p>
      {prompt && (
        <div className="prompt-preview" aria-label="Prompt preview">
          <strong>Your prompt:</strong>
          <div className="preview-box">{prompt}</div>
        </div>
      )}
    </div>
  )
}

export default StepPlanner


