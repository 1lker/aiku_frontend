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

  function parseTimeToMinutes(t: string): number {
    const [hh, mm] = t.split(':').map((v) => parseInt(v, 10))
    return hh * 60 + mm
  }

  function renderTimelines() {
    if (!answers.length) return null
    const answered = questions!.slice(0, answers.length).map((q, i) => ({ q, answerIndex: answers[i] }))
    const byDay = new Map<number, { q: Question; answerIndex: number }[]>()
    for (const item of answered) {
      const list = byDay.get(item.q.day) || []
      list.push(item)
      byDay.set(item.q.day, list)
    }
    const colors = ['#A7F3D0', '#93C5FD', '#FBCFE8', '#FDE68A', '#C7D2FE', '#FCA5A5', '#FDBA74']

    const dayKeys = Array.from(byDay.keys()).sort((a, b) => a - b)
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {dayKeys.map((day) => {
          const items = byDay.get(day)!
          const overallStart = parseTimeToMinutes(items[0].q.startTime)
          const overallEnd = parseTimeToMinutes(items[items.length - 1].q.endTime)
          const total = overallEnd - overallStart
          return (
            <div key={day} className="timeline" aria-label={`Day ${day} timeline`}>
              <div style={{ marginBottom: 8, fontWeight: 700 }}>Day {day}</div>
              <div className="timeline-track">
                {items.map((item, i) => {
                  const start = parseTimeToMinutes(item.q.startTime)
                  const end = parseTimeToMinutes(item.q.endTime)
                  const leftPct = ((start - overallStart) / total) * 100
                  const widthPct = ((end - start) / total) * 100
                  const label = `${item.q.startTime}–${item.q.endTime}`
                  const optionText = item.q.options[item.answerIndex].text
                  const bg = colors[i % colors.length]
                  return (
                    <div
                      key={i}
                      className="timeline-segment"
                      style={{ left: `${leftPct}%`, width: `${widthPct}%`, background: bg }}
                      title={`${label} · ${optionText}`}
                    >
                      <span style={{ padding: '0 8px' }}>{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

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
      {answers.length > 0 && renderTimelines()}

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


