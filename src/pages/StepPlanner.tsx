import { useEffect, useState } from 'react'
import { fetchMockQuestionnaire, mockSubmitSelection, mockLogSelectionContents, type Question } from '../utils/questionnaire'

function StepPlanner() {
  // const location = useLocation() as { state?: { prompt?: string } }
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    let mounted = true
    fetchMockQuestionnaire().then((q) => {
      if (mounted) setQuestions(q)
    })
    return () => {
      mounted = false
    }
  }, [])

  if (!questions) {
    return (
      <div className="page">
        <h2>Plan Step by Step</h2>
        <p>Loading questions…</p>
      </div>
    )
  }

  const isDone = questions ? current >= questions.length : false

  async function handleSelect(optionIndex: number) {
    const question = questions![current]
    const option = question.options[optionIndex]
    await mockLogSelectionContents(current, option, {
      day: question.day,
      startTime: question.startTime,
      endTime: question.endTime,
    })
    await mockSubmitSelection(current, option, {
      day: question.day,
      startTime: question.startTime,
      endTime: question.endTime,
    })

    setAnswers((prev) => {
      const next = [...prev]
      next[current] = optionIndex
      return next
    })
    setCurrent((c) => c + 1)
  }

  return (
    <div className="page">
      <h2>Plan Step by Step</h2>
      {answers.length > 0 && (
        <div style={{ marginTop: 12, width: '100%' }}>
          <strong>Selections so far</strong>
          <ol style={{ marginTop: 8 }}>
            {questions!.slice(0, answers.length).map((q, i) => (
              <li key={i}>
                Day {q.day} · {q.startTime}-{q.endTime}: {q.options[answers[i]].text}
              </li>
            ))}
          </ol>
        </div>
      )}

      {!isDone ? (
        <div style={{ marginTop: 16, width: '100%' }}>
          <p>
            <strong>Day {questions[current].day} · {questions[current].startTime} - {questions[current].endTime}</strong>
            <br />
            <span>Question {current + 1} of {questions.length}</span>
          </p>
          <div className="options-grid">
            {questions[current].options.map((o, i) => (
              <button
                key={i}
                className="modal-button option-card"
                onClick={() => handleSelect(i)}
              >
                <strong>{o.text}</strong>
                <span style={{ color: '#555', fontSize: '0.95rem' }}>{o.description}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          <h3>All set!</h3>
          <p>Your selections have been logged step by step. You can go back or proceed.</p>
        </div>
      )}
    </div>
  )
}

export default StepPlanner


