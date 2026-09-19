import { StableText } from './StableText'
import { useState, type CSSProperties } from 'react'
import * as m from 'motion/react-m'
import { usePreferences } from '../context/PreferencesContext'
import type { ModelCategory, ModelSummary } from '../data/models'
import { ProviderLogo } from './ProviderLogo'

const categories: ModelCategory[] = ['all', 'coding', 'reasoning', 'fast', 'vietnamese']

export function ModelExplorer({ models }: { models: ModelSummary[] }) {
  const { copy } = usePreferences()
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('all')
  const filteredModels = activeCategory === 'all'
    ? models
    : models.filter((model) => model.categories.includes(activeCategory))

  return (
    <section className="section models-section" id="models">
      <div className="container">
        <div className="models-heading">
          <div>
            <p className="eyebrow"><StableText text={copy.models.eyebrow} /></p>
            <h2 className="section-title"><StableText text={copy.models.title} /></h2>
          </div>
          <p className="section-copy"><StableText text={copy.models.description} /></p>
        </div>

        <div className="model-filters" aria-label={copy.models.title}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              <StableText text={copy.models[category]} />
            </button>
          ))}
        </div>

        <div className="model-results" style={{ '--rows-wide': Math.ceil(models.length / 4), '--rows-tablet': Math.ceil(models.length / 2), '--rows-mobile': models.length } as CSSProperties}>
        {filteredModels.length > 0 ? (
          <m.div className="model-grid" key={activeCategory} initial={{ opacity: 0.5, y: 5 }} animate={{ opacity: 1, y: 0 }}>
            {filteredModels.map((model) => (
              <article className={`model-card accent-${model.accent}`} key={model.id}>
                <div className="model-card-top">
                  <ProviderLogo provider={model.provider} />
                  <div><h3>{model.name}</h3><p>{model.provider}</p></div>
                </div>
                <div className="model-prices">
                  <p><span><StableText text={copy.models.input} /></span><strong>{model.inputPrice}</strong></p>
                  <p><span><StableText text={copy.models.output} /></span><strong>{model.outputPrice}</strong></p>
                </div>
                <div className="model-card-bottom">
                  <span className="sample-label"><StableText text={copy.models.samplePrice} /></span>
                  <div className="model-tags">
                    {model.categories.slice(0, 2).map((category) => <span key={category}><StableText text={copy.models[category]} /></span>)}
                  </div>
                </div>
              </article>
            ))}
          </m.div>
        ) : (
          <div className="model-empty">
            <span aria-hidden="true">○</span>
            <p><StableText text={copy.models.empty} /></p>
            <button type="button" onClick={() => setActiveCategory('all')}><StableText text={copy.models.reset} /></button>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}
