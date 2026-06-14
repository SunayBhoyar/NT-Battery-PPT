import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CanvasSequence } from '../ui/CanvasSequence'

gsap.registerPlugin(ScrollTrigger)

interface ConnectivitySectionProps {
  images: HTMLImageElement[]
  isLoaded: boolean
}

export const ConnectivitySection: React.FC<ConnectivitySectionProps> = ({
  images,
  isLoaded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !containerRef.current) return

    // GSAP ScrollTrigger timeline to slide in the panels from left and right
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

    // Panels animate into position
    tl.to(leftPanelRef.current, { x: 0, opacity: 1, duration: 2 }, 0)
      .to(rightPanelRef.current, { x: 0, opacity: 1, duration: 2 }, 0)
      // Stay in view
      .to({}, { duration: 3 })
      // Panels fade out at the very end
      .to(leftPanelRef.current, { y: -30, opacity: 0, duration: 1.5 })
      .to(rightPanelRef.current, { y: -30, opacity: 0, duration: 1.5 }, '<')

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isLoaded, images])

  return (
    <div
      ref={containerRef}
      id="technology"
      className="relative w-full h-[250vh] bg-[#050505] z-20 border-t border-white/[0.02]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Connectivity sequence canvas */}
        <CanvasSequence
          images={images}
          isLoaded={isLoaded}
          triggerRef={containerRef}
          start="top top"
          end="bottom bottom"
          className="opacity-80"
        />

        {/* Layout Grid */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-stretch py-24 pointer-events-none z-10">
          
          {/* Left Panel: Big messaging */}
          <div className="flex items-center md:w-1/3">
            <div
              ref={leftPanelRef}
              className="opacity-0 -translate-x-16 transition-all duration-300 pointer-events-auto"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold-primary mb-3 block font-semibold">
                Connectivity
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-[0.1em] leading-tight uppercase mb-6">
                Universal Architecture
              </h2>
              <p className="text-white/60 text-xs md:text-sm tracking-wide leading-relaxed font-light">
                Engineered to serve as a singular nexus for all your premium devices. 
                Equipped with intelligent protocol negotiation to deliver optimal power dynamically.
              </p>
            </div>
          </div>

          {/* Right Panel: Spec list with gold accents */}
          <div className="flex items-center justify-end md:w-1/3 mt-8 md:mt-0">
            <div
              ref={rightPanelRef}
              className="opacity-0 translate-x-16 transition-all duration-300 pointer-events-auto w-full max-w-sm"
            >
              <div className="bg-[#050505]/40 backdrop-blur-sm border border-gold-primary/10 p-6 md:p-8 rounded-sm gold-glow">
                <h3 className="font-serif text-lg tracking-[0.2em] uppercase text-gold-light border-b border-gold-primary/15 pb-4 mb-6">
                  INTERFACE SPECIFICATIONS
                </h3>
                
                <div className="space-y-6">
                  {/* Spec 1: USB-C */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase">USB-C Power Delivery</h4>
                      <p className="text-[10px] text-white/40 mt-1 uppercase">140W Bi-directional Input/Output</p>
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-gold-primary bg-gold-primary/10 px-2 py-0.5 rounded-sm uppercase">Active</span>
                  </div>

                  {/* Spec 2: Lightning */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase">Lightning Port</h4>
                      <p className="text-[10px] text-white/40 mt-1 uppercase">Apple MFi Certified Interface</p>
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-gold-primary bg-gold-primary/10 px-2 py-0.5 rounded-sm uppercase">Compatible</span>
                  </div>

                  {/* Spec 3: Micro USB */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase">Legacy Micro USB</h4>
                      <p className="text-[10px] text-white/40 mt-1 uppercase">Fallback auxiliary charge channel</p>
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-white/30 bg-white/5 px-2 py-0.5 rounded-sm uppercase">Standby</span>
                  </div>

                  {/* Spec 4: Fast Charging */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase">SuperCharge PD 3.1</h4>
                      <p className="text-[10px] text-white/40 mt-1 uppercase">0 to 50% in 18 minutes</p>
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.1em] text-gold-primary bg-gold-primary/15 border border-gold-primary/30 px-2 py-0.5 rounded-sm uppercase">Turbo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
