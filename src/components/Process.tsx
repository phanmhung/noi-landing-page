import { usePreferences } from '../context/PreferencesContext'

export function Process() {
  const { copy } = usePreferences()

  return (
    <section className="section process-section" id="process">
      <div className="container process-layout">
        <div className="process-intro">
          <p className="eyebrow">{copy.process.eyebrow}</p>
          <h2 className="section-title">{copy.process.title}</h2>
          <p className="section-copy">{copy.process.description}</p>
          <p className="process-note"><span aria-hidden="true">✓</span>{copy.process.note}</p>
        </div>
        <ol className="process-list">
          {copy.process.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
