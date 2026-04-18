import Nav from './components/Nav'
import Hero from './components/Hero'
import WhyMoA from './components/WhyMoA'
import Retail from './components/Retail'
import Dining from './components/Dining'
import Entertainment from './components/Entertainment'
import Events from './components/Events'
import Contact from './components/Contact'

export default function App() {
  return (
    <div style={{ background: '#0a0a0b', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <WhyMoA />
      <Retail />
      <Dining />
      <Entertainment />
      <Events />
      <Contact />
    </div>
  )
}