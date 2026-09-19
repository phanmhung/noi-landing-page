export const navItems = [
  { id: 'models', labelKey: 'models' },
  { id: 'features', labelKey: 'features' },
  { id: 'process', labelKey: 'process' },
  { id: 'docs', labelKey: 'docs' },
] as const

export const providerNames = ['OpenAI', 'Anthropic', 'Gemini', 'DeepSeek', 'Qwen'] as const

export const featureIcons = ['route', 'fallback', 'key', 'chart', 'swap', 'home'] as const
