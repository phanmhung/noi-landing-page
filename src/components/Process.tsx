import { StableText } from './StableText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { usePreferences } from '../context/PreferencesContext'

export function Process() {
  const { copy } = usePreferences()

  return (
    <section className="section process-section" id="process">
      <div className="container process-layout">
        <div className="process-intro">
          <p className="eyebrow"><StableText text={copy.process.eyebrow} /></p>
          <h2 className="section-title"><StableText text={copy.process.title} /></h2>
          <p className="section-copy"><StableText text={copy.process.description} /></p>
          <p className="process-note"><FontAwesomeIcon icon={faCheck} aria-hidden="true" /><StableText text={copy.process.note} /></p>
        </div>
        <ol className="process-list">
          {copy.process.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h3><StableText text={step.title} /></h3><p><StableText text={step.description} /></p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
