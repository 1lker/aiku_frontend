type Mode = 'step' | 'full'

interface PlanChoiceModalProps {
  onClose: () => void
  onChoose: (mode: Mode) => void
}

function PlanChoiceModal({ onClose, onChoose }: PlanChoiceModalProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="plan-choice-title">
      <div className="modal" role="document">
        <h3 id="plan-choice-title">How would you like to plan?</h3>
        <p>
          Choose one of the following options. You can switch later.
        </p>
        <ul style={{ textAlign: 'left', marginTop: 8, marginBottom: 0 }}>
          <li><strong>Step by step</strong>: guided questions for dates, budget, interests, and pace.</li>
          <li><strong>Full plan</strong>: an immediate end-to-end itinerary you can refine afterwards.</li>
        </ul>
        <div className="modal-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <button className="modal-button primary" onClick={() => onChoose('step')}>Plan step by step</button>
          <button className="modal-button" onClick={() => onChoose('full')}>Get a full plan</button>
          <button className="modal-button ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PlanChoiceModal


