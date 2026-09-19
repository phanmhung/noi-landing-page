import { CallToAction } from './components/CallToAction'
import { ApiExample } from './components/ApiExample'
import { CapabilityStrip } from './components/CapabilityStrip'
import { FeatureGrid } from './components/FeatureGrid'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ModelExplorer } from './components/ModelExplorer'
import { Process } from './components/Process'
import { models } from './data/models'
import './styles/sections.css'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CapabilityStrip />
        <ModelExplorer models={models} />
        <FeatureGrid />
        <Process />
        <ApiExample />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
