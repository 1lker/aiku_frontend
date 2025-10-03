import { useLocation } from 'react-router-dom'

function FullPlan() {
  const location = useLocation() as { state?: { prompt?: string } }
  const prompt = location.state?.prompt

  return (
    <div className="page">
      <h2>Full Trip Plan</h2>
      <p>We will generate a complete itinerary at once: flights, stays, activities, and daily schedule.</p>
      {prompt && (
        <div className="prompt-preview" aria-label="Prompt preview">
          <strong>Your prompt:</strong>
          <div className="preview-box">{prompt}</div>
        </div>
      )}
    </div>
  )
}

export default FullPlan


