import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useLenis = (isStopped: boolean = false) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like smooth deceleration curve
      infinite: false,
    })

    lenisRef.current = lenis

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Sync Lenis frame requests with GSAP's requestAnimationFrame ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)

    // Disable lag smoothing to ensure no micro-stuttering between GSAP and Lenis
    gsap.ticker.lagSmoothing(0)

    // Clean up
    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerUpdate)
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (isStopped) {
      lenis.stop()
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      lenis.start()
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isStopped])
}
