import { useState, useCallback } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WhyMoA from './components/WhyMoA'
import Retail from './components/Retail'
import Dining from './components/Dining'
import Entertainment from './components/Entertainment'
import Events from './components/Events'
import Contact from './components/Contact'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Marquee from './components/Marquee'
import SectionDivider from './components/SectionDivider'
import SmoothScroll from './components/SmoothScroll'
import HorizontalGallery from './components/HorizontalGallery'
import BackToTop from './components/BackToTop'
import GsapPinnedStats from './components/GsapPinnedStats'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <SmoothScroll>
      <Preloader onComplete={handleLoadComplete} />
      <CustomCursor />
      <BackToTop />
      <div style={{
        background: '#0a0a0b', minHeight: '100vh',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease 0.3s',
      }}>
        <Nav />
        <Hero />

        <Marquee
          items={['40M+ Visitors', '500+ Stores', '5.6M sq ft', '$2B+ Sales', '96% Occupancy', '3.4hr Avg Visit', '85+ Countries']}
          speed={25}
        />

        <WhyMoA />

        {/* GSAP ScrollTrigger — Pinned Stats Showcase */}
        <GsapPinnedStats />

        <SectionDivider label="Scroll to explore" />
        <Retail />

        <Marquee
          items={['Coach', 'Nike', 'Apple', 'Tiffany & Co.', 'Nordstrom', 'Louis Vuitton', 'Tesla', 'Lego', 'Zara', 'Rolex']}
          speed={35}
          reverse
          separator="—"
        />

        <Dining />
        <SectionDivider label="Beyond retail" />

        {/* Three.js powered horizontal experience gallery */}
        <HorizontalGallery />

        <Entertainment />
        <SectionDivider />
        <Events />
        <Contact />
      </div>
    </SmoothScroll>
  )
}