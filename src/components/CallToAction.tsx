import { StableText } from './StableText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { usePreferences } from '../context/PreferencesContext'
import { BrandMark } from './BrandMark'

export function CallToAction() {
  const { copy } = usePreferences()

  return (
    <section className="section cta-section" id="get-started">
      <div className="container">
        <div className="cta-card">
          <BrandMark size={58} className="cta-mark" />
          <h2><StableText text={copy.cta.title} /></h2>
          <p><StableText text={copy.cta.description} /></p>
          <a className="button button-light" href="#docs"><StableText text={copy.cta.action} /><FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
