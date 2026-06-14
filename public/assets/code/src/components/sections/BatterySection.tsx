import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BatteryDashboard } from '../ui/BatteryDashboard'

gsap.registerPlugin(ScrollTrigger)

interface BatterySectionProps {
  batteryImages: HTMLImageElement[]
  isBatteryLoaded: boolean
}

export const BatterySection: React.FC<BatterySectionProps> = ({
  batteryImages,
  isBatteryLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Parallax effect on the background image
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Pinning the section to animate the text overlay and dashboard container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
        pin: pinContainerRef.current,
        pinSpacing: false,
      },
    })

    // Text fades in and stays -> Dashboard fades & slides up -> Both stay, then fade out
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 2 })
      .to(dashboardRef.current, { opacity: 1, y: 0, duration: 2 }, '-=0.5')
      .to({}, { duration: 3 }) // Pause to let user interact/read
      .to(textRef.current, { opacity: 0, y: -30, duration: 1.5 })
      .to(dashboardRef.current, { opacity: 0, y: -30, duration: 1.5 }, '<')

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="products"
      className="relative w-full h-[200vh] bg-[#050505] overflow-hidden z-20 border-t border-white/[0.02]"
    >
      {/* Parallax Background Container */}
      <div
        ref={bgRef}
        className="absolute -top-[15%] left-0 w-full h-[130%] bg-cover bg-center opacity-30 select-none pointer-events-none scale-105"
        style={{
          backgroundImage: `url('/photos/Close-up Side View Jun 12 2022.jpeg')`,
        }}
      />

      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center z-10">

          {/* Left: Large editorial serif copy */}
          <div
            ref={textRef}
            className="opacity-0 translate-y-12 transition-all duration-300 text-center md:text-left"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold-primary mb-3 block font-semibold">
              Energy Density
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-[0.05em] uppercase mb-6 leading-none">
              10,000 <span className="text-gold-primary">mAh</span>
            </h2>
            <h3 className="font-serif text-lg md:text-xl tracking-[0.2em] text-gold-light uppercase mb-6 font-medium">
              Sustained Power Supremacy
            </h3>
            <p className="text-white/60 text-xs md:text-sm tracking-wide leading-relaxed font-light max-w-md">
              A high-density lithium-cobalt formulation engineered for ultra-thin luxury form factors.
              Delivers multiple full charges for MacBook Pro, iPad, and iPhone with unmatched thermal efficiency.
            </p>
          </div>

          {/* Right: Dashboard with charge sequence canvas */}
          <div
            ref={dashboardRef}
            className="opacity-0 translate-y-16 transition-all duration-300 w-full flex justify-center"
          >
            <BatteryDashboard images={batteryImages} isLoaded={isBatteryLoaded} />
          </div>

        </div>
      </div>
    </div>
  )
}
