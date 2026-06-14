import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CanvasSequence } from '../ui/CanvasSequence'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  images: HTMLImageElement[]
  isLoaded: boolean
  onProgressUpdate: (progress: number) => void
  isIntroActive?: boolean
  onIntroComplete?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  images,
  isLoaded,
  onProgressUpdate,
  isIntroActive = false,
  onIntroComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !containerRef.current) return
    if (isIntroActive) return

    // Initialize all cards and indicator
    gsap.set([text2Ref.current, text3Ref.current], { opacity: 0, y: 40 })

    // Play an automatic intro fade-in for Text 1 and scroll indicator when intro completes
    gsap.fromTo(text1Ref.current, 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
    )
    gsap.fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
    )

    // GSAP Timeline for orchestrating text overlay animations during scroll
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

    // Cinematic sequence: text1 starts visible and fades out -> Text 2 fades in/out -> Text 3 fades in
    tl.set(text1Ref.current, { opacity: 1, y: 0 })
      .to(text1Ref.current, { opacity: 0, y: -40, duration: 1.5 }, '+=1.5')
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1.5 })
      .to(text2Ref.current, { opacity: 0, y: -40, duration: 1.5 }, '+=1')
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1.5 })
      .to(scrollIndicatorRef.current, { opacity: 0, duration: 1 }, '<')

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isLoaded, images, isIntroActive])

  return (
    <div ref={containerRef} id="hero-section" className="relative w-full h-[300vh] bg-[#050505] z-10">
      {/* Pinned Viewport Container */}
      <div ref={pinContainerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Scroll Driven Canvas */}
        <CanvasSequence
          images={images}
          isLoaded={isLoaded}
          triggerRef={containerRef}
          start="top top"
          end="bottom bottom"
          onUpdate={onProgressUpdate}
          autoplay={isIntroActive}
          onAutoplayComplete={onIntroComplete}
          startProgress={isIntroActive ? 0 : 0.35}
          endProgress={isIntroActive ? 0.35 : 1.0}
        />

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6">
          {/* Card 1 */}
          <div
            ref={text1Ref}
            className="text-center opacity-0 translate-y-12 transition-transform duration-300 absolute flex flex-col items-center"
          >
            <h2 className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-primary mb-4 font-semibold">
              Northern Trust
            </h2>
            <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.15em] leading-tight max-w-4xl uppercase">
              A New Era of Power
            </h1>
          </div>

          {/* Card 2 */}
          <div
            ref={text2Ref}
            className="text-center opacity-0 translate-y-12 transition-transform duration-300 absolute flex flex-col items-center"
          >
            <h2 className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-primary mb-4 font-semibold">
              Aesthetics & Materials
            </h2>
            <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.15em] leading-tight max-w-4xl uppercase">
              Sculpted in Gold & Obsidian
            </h1>
          </div>

          {/* Card 3 */}
          <div
            ref={text3Ref}
            className="text-center opacity-0 translate-y-12 transition-transform duration-300 absolute flex flex-col items-center"
          >
            <h2 className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold-primary mb-4 font-semibold">
              Introduction
            </h2>
            <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold gold-gradient-text tracking-[0.15em] leading-tight max-w-4xl uppercase">
              The Sovereign Charger
            </h1>
            <p className="mt-6 text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/40 max-w-md">
              Scroll down to explore engineering details
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 opacity-0"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-2">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-gold-primary to-transparent" />
        </div>
      </div>
    </div>
  )
}
