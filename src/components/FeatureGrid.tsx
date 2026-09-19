import { StableText } from './StableText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChartColumn, faDiagramProject, faKey, faRightLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { usePreferences } from '../context/PreferencesContext'
import { featureIcons } from '../data/site'

function FeatureIcon({ name }: { name: (typeof featureIcons)[number] }) {
  const icons = {
    route: faDiagramProject,
    fallback: faArrowsRotate,
    key: faKey,
    chart: faChartColumn,
    swap: faRightLeft,
    home: faShieldHalved,
  }
  return <FontAwesomeIcon icon={icons[name]} />
}

export function FeatureGrid() {
  const { copy } = usePreferences()

  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-heading split-heading">
          <div><p className="eyebrow"><StableText text={copy.features.eyebrow} /></p><h2 className="section-title"><StableText text={copy.features.title} /></h2></div>
          <p className="section-copy"><StableText text={copy.features.description} /></p>
        </div>
        <div className="feature-grid">
          {copy.features.items.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon"><FeatureIcon name={featureIcons[index]} /></div>
              <span className="feature-index">0{index + 1}</span>
              <h3><StableText text={feature.title} /></h3>
              <p><StableText text={feature.description} /></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
