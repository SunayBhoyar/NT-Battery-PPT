import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CanvasSequence } from '../ui/CanvasSequence'

gsap.registerPlugin(ScrollTrigger)

interface XRaySectionProps {
  images: HTMLImageElement[]
  isLoaded: boolean
}

export const XRaySection: React.FC<XRaySectionProps> = ({ images, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !containerRef.current) return

    // ScrollTrigger timeline to reveal technical panels during X-Ray rotation/transparency
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

    // Animate panel entries and exits in sync with the x-ray frame scrubbing
    tl.to(leftPanelRef.current, { x: 0, opacity: 1, duration: 2 }, 0)
      .to(rightPanelRef.current, { x: 0, opacity: 1, duration: 2 }, 0)
      .to({}, { duration: 3 }) // Stay in place
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
      id="support"
      className="relative w-full h-[300vh] bg-[#050505] z-20 border-t border-white/[0.02]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Canvas displaying transparent circuit sequence */}
        <CanvasSequence
          images={images}
          isLoaded={isLoaded}
          triggerRef={containerRef}
          start="top top"
          end="bottom bottom"
          className="opacity-90"
        />

        {/* Technical Data Layout */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-stretch py-24 pointer-events-none z-10">
          
          {/* Left panel: Architecture overview */}
          <div className="flex items-center md:w-1/3">
            <div
              ref={leftPanelRef}
              className="opacity-0 -translate-x-16 transition-all duration-300 pointer-events-auto"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold-primary mb-3 block font-semibold">
                Engineering
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-[0.1em] leading-tight uppercase mb-6">
                Intelligent Power Management
              </h2>
              <p className="text-white/60 text-xs md:text-sm tracking-wide leading-relaxed font-light">
                An internal architecture engineered to illuminate under extreme performance. 
                Sovereign circuitry manages battery cells down to the microsecond, providing safe power delivery.
              </p>
            </div>
          </div>

          {/* Right panel: Internal spec card */}
          <div className="flex items-center justify-end md:w-1/3 mt-8 md:mt-0">
            <div
              ref={rightPanelRef}
              className="opacity-0 translate-x-16 transition-all duration-300 pointer-events-auto w-full max-w-sm"
            >
              <div className="bg-[#050505]/40 backdrop-blur-sm border border-gold-primary/15 p-6 md:p-8 rounded-sm gold-glow">
                <h3 className="font-serif text-lg tracking-[0.2em] uppercase text-gold-light border-b border-gold-primary/15 pb-4 mb-6">
                  INTERNAL MECHANICS
                </h3>
                
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div>
                    <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary mr-2.5" />
                      Smart Charging System
                    </h4>
                    <p className="text-[10px] text-white/50 mt-2 leading-relaxed uppercase">
                      Continuously negotiates voltage and current to maximize battery conversion efficiency up to 96%.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary mr-2.5" />
                      Thermal Shield Protection
                    </h4>
                    <p className="text-[10px] text-white/50 mt-2 leading-relaxed uppercase">
                      Silicon thermistors scan core cells 800 times per second, guaranteeing operational heat stays below 38°C.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <h4 className="text-xs tracking-[0.2em] font-semibold text-white uppercase flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary mr-2.5" />
                      Cell Longevity Guard
                    </h4>
                    <p className="text-[10px] text-white/50 mt-2 leading-relaxed uppercase">
                      Advanced electrolyte balancing preserves 85% original health capacity even after 1,000 deep cycles.
                    </p>
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
