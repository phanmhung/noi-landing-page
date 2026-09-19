import { CallToAction } from './components/CallToAction'
import { ApiSection } from './components/ApiSection'
import { MotionProvider } from './components/MotionProvider'
import { CapabilityStrip } from './components/CapabilityStrip'
import { FeatureGrid } from './components/FeatureGrid'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ModelExplorer } from './components/ModelExplorer'
import { Process } from './components/Process'
import { models } from './data/models'
import './styles/sections.css'
import './styles/refinements.css'

export function App() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <CapabilityStrip />
        <ModelExplorer models={models} />
        <FeatureGrid />
        <Process />
        <ApiSection />
        <CallToAction />
      </main>
      <Footer />
    </MotionProvider>
  )
}
