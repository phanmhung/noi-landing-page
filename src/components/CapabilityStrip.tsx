import { usePreferences } from '../context/PreferencesContext'

export function CapabilityStrip() {
  const { copy } = usePreferences()

  return (
    <section className="capability-section" aria-label="Nối capabilities">
      <div className="container capability-grid">
        {copy.capabilities.map((capability, index) => (
          <article className="capability-item" key={capability.title}>
            <span className="capability-number">0{index + 1}</span>
            <div>
              <h2>{capability.title}</h2>
              <p>{capability.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
