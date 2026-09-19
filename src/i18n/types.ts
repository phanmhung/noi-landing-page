export type Locale = 'en' | 'vi'
export type Theme = 'light' | 'dark'

export interface SiteMessages {
  nav: {
    models: string
    features: string
    process: string
    docs: string
    console: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    primary: string
    secondary: string
    providerLead: string
    visualLabel: string
    appLabel: string
  }
  capabilities: Array<{ title: string; detail: string }>
  models: {
    eyebrow: string
    title: string
    description: string
    all: string
    coding: string
    reasoning: string
    fast: string
    vietnamese: string
    empty: string
    reset: string
    samplePrice: string
    input: string
    output: string
  }
  features: {
    eyebrow: string
    title: string
    description: string
    items: Array<{ title: string; description: string }>
  }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: Array<{ title: string; description: string }>
    note: string
  }
  api: {
    eyebrow: string
    title: string
    description: string
    curl: string
    javascript: string
    copy: string
    copied: string
    copyFailed: string
  }
  cta: { title: string; description: string; action: string }
  footer: { note: string; attribution: string; original: string }
  controls: { language: string; theme: string; menu: string; closeMenu: string }
}
