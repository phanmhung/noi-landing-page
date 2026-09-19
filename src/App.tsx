import { CallToAction } from './components/CallToAction'
import { CapabilityStrip } from './components/CapabilityStrip'
import { FeatureGrid } from './components/FeatureGrid'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import './styles/sections.css'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CapabilityStrip />
        <FeatureGrid />
        <Process />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
