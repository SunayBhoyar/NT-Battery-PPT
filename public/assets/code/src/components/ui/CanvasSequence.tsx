import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CanvasSequenceProps {
  images: HTMLImageElement[]
  isLoaded: boolean
  triggerRef: React.RefObject<HTMLDivElement | null>
  start?: string
  end?: string
  className?: string
  onUpdate?: (progress: number) => void
  autoplay?: boolean
  autoplayDuration?: number
  onAutoplayComplete?: () => void
  startProgress?: number
  endProgress?: number
}

export const CanvasSequence: React.FC<CanvasSequenceProps> = ({
  images,
  isLoaded,
  triggerRef,
  start = 'top top',
  end = 'bottom bottom',
  className = '',
  onUpdate,
  autoplay = false,
  autoplayDuration = 3.5,
  onAutoplayComplete,
  startProgress = 0,
  endProgress = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollProgressRef = useRef({ progress: 0 })

  // Keep latest callbacks in refs so the main animation useEffect does not re-run when parent callbacks change
  const onUpdateRef = useRef(onUpdate)
  const onAutoplayCompleteRef = useRef(onAutoplayComplete)

  useEffect(() => {
    onUpdateRef.current = onUpdate
    onAutoplayCompleteRef.current = onAutoplayComplete
  })

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !triggerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Core Draw Engine (renders single frame on the canvas with center-cover scaling)
    const drawImage = (index: number) => {
      const img = images[index]
      if (!img) return

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      // Clear the previous frame
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Calculate center-cover coordinates
      const canvasRatio = canvasWidth / canvasHeight
      const imgRatio = img.width / img.height

      let drawWidth = canvasWidth
      let drawHeight = canvasHeight
      let offsetX = 0
      let offsetY = 0

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        drawWidth = canvasHeight * imgRatio
        offsetX = (canvasWidth - drawWidth) / 2
      } else {
        // Image is taller than canvas
        drawHeight = canvasWidth / imgRatio
        offsetY = (canvasHeight - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Resize Engine (adjusts physical canvas pixels for high-DPI/Retina screens)
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Redraw current frame at new size
      const currentProgress = startProgress + scrollProgressRef.current.progress * (endProgress - startProgress)
      const frameIndex = Math.min(
        images.length - 1,
        Math.max(0, Math.floor(currentProgress * (images.length - 1)))
      )
      drawImage(frameIndex)
    }

    // Initial run
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let activeTween: gsap.core.Tween | null = null
    let activeScrollTrigger: ScrollTrigger | null = null

    if (autoplay) {
      const progressObj = { progress: 0 }

      activeTween = gsap.to(progressObj, {
        progress: 1,
        duration: autoplayDuration,
        ease: 'power1.inOut',
        onUpdate: () => {
          const mappedProgress = startProgress + progressObj.progress * (endProgress - startProgress)
          const frameIndex = Math.min(
            images.length - 1,
            Math.max(0, Math.floor(mappedProgress * (images.length - 1)))
          )
          
          requestAnimationFrame(() => {
            drawImage(frameIndex)
          })

          if (onUpdateRef.current) {
            onUpdateRef.current(mappedProgress)
          }
        },
        onComplete: () => {
          if (onAutoplayCompleteRef.current) {
            onAutoplayCompleteRef.current()
          }
        },
      })
    } else {
      // GSAP ScrollTrigger setup
      const progressObj = scrollProgressRef.current
      const tl = gsap.to(progressObj, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: start,
          end: end,
          scrub: 0.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressObj.progress = self.progress
            const mappedProgress = startProgress + self.progress * (endProgress - startProgress)
            const frameIndex = Math.min(
              images.length - 1,
              Math.max(0, Math.floor(mappedProgress * (images.length - 1)))
            )
            
            requestAnimationFrame(() => {
              drawImage(frameIndex)
            })

            if (onUpdateRef.current) {
              onUpdateRef.current(mappedProgress)
            }
          },
        },
      })
      activeTween = tl
      activeScrollTrigger = tl.scrollTrigger || null
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (activeScrollTrigger) {
        activeScrollTrigger.kill()
      }
      if (activeTween) {
        activeTween.kill()
      }
    }
  }, [images, isLoaded, triggerRef, start, end, autoplay, autoplayDuration, startProgress, endProgress])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block select-none ${className}`}
    />
  )
}
