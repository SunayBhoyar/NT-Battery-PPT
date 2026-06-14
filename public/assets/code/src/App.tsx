import { useState, useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import { useFrameSequence } from './hooks/useFrameSequence'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { ConnectivitySection } from './components/sections/ConnectivitySection'
import { BatterySection } from './components/sections/BatterySection'
import { XRaySection } from './components/sections/XRaySection'
import { GoldenDivider } from './components/shared/GoldenDivider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [introDone, setIntroDone] = useState(false)

  // 1. Initialize Lenis Smooth Scroll (lock scrolling during autoplay intro)
  useLenis(!introDone)

  // Refresh ScrollTrigger calculations after sections mount on intro complete
  useEffect(() => {
    if (introDone) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
  }, [introDone])

  // 2. Progressive Asset Preloader Manager
  // - Step 1: Preload Hero frames (blocks render, shows preloader)
  const heroSeq = useFrameSequence({
    folder: '/sequences/hero',
    frameCount: 165,
  })

  // - Step 2: Once Hero is ready, load Connectivity and Battery sequences in the background
  const connSeq = useFrameSequence({
    folder: '/sequences/connectivity',
    frameCount: 91,
    autoLoad: heroSeq.isLoaded,
  })

  const battSeq = useFrameSequence({
    folder: '/sequences/battery',
    frameCount: 100,
    autoLoad: heroSeq.isLoaded,
  })

  // - Step 3: Once Connectivity is ready, load the heavy X-Ray sequence in the background
  const xraySeq = useFrameSequence({
    folder: '/sequences/x-ray',
    frameCount: 300,
    autoLoad: connSeq.isLoaded,
  })

  // 3. Navbar Visibility State
  const [heroProgress, setHeroProgress] = useState(0)
  const showNavbar = heroProgress > 0.85

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-x-hidden selection:bg-gold-primary/30 selection:text-white">
      
      {/* Brand Preloader Overlay */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
          heroSeq.isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center max-w-xs text-center px-6">
          {/* Logo animation */}
          <div className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-semibold text-white mb-6 uppercase animate-pulse">
            NORTHERN TRUST
          </div>
          
          {/* Progress gauge bar */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-sm mb-4">
            <div
              className="h-full bg-gold-primary transition-all duration-300 ease-out"
              style={{ width: `${heroSeq.progress}%` }}
            />
          </div>
          
          {/* Percentage readout */}
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold-primary uppercase">
            Preloading Experience &bull; {heroSeq.progress}%
          </span>
        </div>
      </div>

      {/* Render Website Content once Hero is loaded */}
      {heroSeq.isLoaded && (
        <>
          {/* Premium Navbar */}
          <Navbar visible={showNavbar && introDone} />

          {/* Section 01: Hero Product Reveal */}
          <HeroSection
            images={heroSeq.images}
            isLoaded={heroSeq.isLoaded}
            onProgressUpdate={setHeroProgress}
            isIntroActive={!introDone}
            onIntroComplete={() => setIntroDone(true)}
          />

          {introDone && (
            <>
              <GoldenDivider />

              {/* Section 02: Connectivity Showcase */}
              <ConnectivitySection
                images={connSeq.images}
                isLoaded={connSeq.isLoaded}
              />

              <GoldenDivider />

              {/* Section 03 & 04: Battery Capacity & Telemetry Charging Simulation */}
              <BatterySection
                batteryImages={battSeq.images}
                isBatteryLoaded={battSeq.isLoaded}
              />

              <GoldenDivider />

              {/* Section 05: X-Ray Technology Showcase */}
              <XRaySection
                images={xraySeq.images}
                isLoaded={xraySeq.isLoaded}
              />

              <GoldenDivider />

              {/* Section 06: Luxury Footer */}
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
