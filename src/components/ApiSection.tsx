import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import { StableText } from './StableText'

const CodeExample = lazy(() => import('./ApiExample').then(module => ({ default: module.ApiExample })))

class ExampleBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export function ApiSection() {
  const { copy, locale } = usePreferences()
  const section = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setReady(true); return }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setReady(true); observer.disconnect() }
    }, { rootMargin: '700px' })
    if (section.current) observer.observe(section.current)
    return () => observer.disconnect()
  }, [])
  const placeholder = <div className="code-window code-placeholder" aria-busy="true" aria-label={copy.api.title}>
    <div className="skeleton-line" /><div className="skeleton-line" /><div className="skeleton-line" />
  </div>
  return <section ref={section} className="section api-section" id="docs">
    <div className="container api-layout">
      <div className="api-copy">
        <p className="eyebrow"><StableText text={copy.api.eyebrow} /></p>
        <h2 className="section-title"><StableText text={copy.api.title} /></h2>
        <p className="section-copy"><StableText text={copy.api.description} /></p>
        <div className="endpoint-pill"><span>POST</span>/v1/chat/completions</div>
      </div>
      <ExampleBoundary fallback={<div className="code-window code-placeholder"><p>{locale === 'vi' ? 'Không tải được ví dụ.' : 'The example could not load.'}</p><button type="button" onClick={() => window.location.reload()}>{locale === 'vi' ? 'Tải lại' : 'Reload'}</button></div>}>
        {ready ? <Suspense fallback={placeholder}><CodeExample /></Suspense> : placeholder}
      </ExampleBoundary>
    </div>
  </section>
}
