import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BatteryDashboardProps {
  images: HTMLImageElement[]
  isLoaded: boolean
}

export const BatteryDashboard: React.FC<BatteryDashboardProps> = ({ images, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [percentage, setPercentage] = useState(0)
  const [voltage, setVoltage] = useState(5.0)
  const [current, setCurrent] = useState(0.0)
  const [temp, setTemp] = useState(22)
  const [isCharging, setIsCharging] = useState(false)
  const animationProgress = useRef({ val: 0 })

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw single frame centered in the canvas
    const drawFrame = (index: number) => {
      const img = images[index]
      if (!img) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const canvasRatio = canvasWidth / canvasHeight
      const imgRatio = img.width / img.height

      let drawWidth = canvasWidth
      let drawHeight = canvasHeight
      let offsetX = 0
      let offsetY = 0

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio
        offsetX = (canvasWidth - drawWidth) / 2
      } else {
        drawHeight = canvasWidth / imgRatio
        offsetY = (canvasHeight - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Set high-DPI canvas dimensions
    const dpr = window.devicePixelRatio || 1
    canvas.width = 280 * dpr
    canvas.height = 280 * dpr
    canvas.style.width = '280px'
    canvas.style.height = '280px'

    drawFrame(0) // Draw first frame initially

    // Setup trigger to launch charging animation once on scroll entry
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        setIsCharging(true)

        // Liquid filling frame rate interpolation (0 -> 100 over 4.5 seconds)
        gsap.to(animationProgress.current, {
          val: 1,
          duration: 4.5,
          ease: 'power2.inOut',
          onUpdate: function () {
            const progress = animationProgress.current.val
            const frameIndex = Math.min(
              images.length - 1,
              Math.floor(progress * (images.length - 1))
            )

            requestAnimationFrame(() => {
              drawFrame(frameIndex)
            })

            // Dynamic stats interpolation
            setPercentage(Math.floor(progress * 100))
            setVoltage(Number((5.0 + progress * 14.8).toFixed(1)))
            setCurrent(Number((4.2 * Math.sin(progress * Math.PI)).toFixed(1)))
            setTemp(Number((22 + progress * 9).toFixed(0)))
          },
          onComplete: () => {
            setCurrent(0.0)
          }
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [isLoaded, images])

  return (
    <div
      ref={containerRef}
      className="bg-[#050505]/70 backdrop-blur-md border border-gold-primary/15 p-8 rounded-sm max-w-sm w-full gold-glow mx-auto text-white flex flex-col items-center"
    >
      <span className="text-[9px] tracking-[0.35em] uppercase text-gold-primary font-bold mb-4">
        POWER CONSOLE V1.0
      </span>

      {/* Canvas sequence + percentage overlay */}
      <div className="relative w-[280px] h-[280px] flex items-center justify-center">
        <canvas ref={canvasRef} className="block select-none pointer-events-none opacity-90" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-[8px] tracking-[0.3em] font-semibold uppercase mt-2 px-2 py-0.5 rounded-sm ${percentage === 100
            ? 'text-green-400 bg-green-500/10'
            : isCharging
              ? 'text-gold-primary bg-gold-primary/10 animate-pulse'
              : 'text-white/30 bg-white/5'
            }`}>
            {percentage === 100 ? 'COMPLETE' : isCharging ? 'CHARGING' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Telemetry panel */}
      <div className="w-full grid grid-cols-3 gap-2 border-t border-gold-primary/10 pt-6 mt-4">
        <div className="text-center">
          <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">Voltage</div>
          <div className="font-mono text-xs font-semibold text-gold-light">{voltage} V</div>
        </div>
        <div className="text-center border-x border-gold-primary/10">
          <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">Current</div>
          <div className="font-mono text-xs font-semibold text-gold-light">{current} A</div>
        </div>
        <div className="text-center">
          <div className="text-[8px] tracking-[0.2em] text-white/30 uppercase mb-1">Temp</div>
          <div className="font-mono text-xs font-semibold text-gold-light">{temp} °C</div>
        </div>
      </div>
    </div>
  )
}
