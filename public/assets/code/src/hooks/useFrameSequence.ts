import { useState, useEffect, useRef } from 'react'

interface UseFrameSequenceProps {
  folder: string
  frameCount: number
  prefix?: string
  ext?: string
  autoLoad?: boolean
}

export const useFrameSequence = ({
  folder,
  frameCount,
  prefix = 'ezgif-frame-',
  ext = 'jpg',
  autoLoad = true,
}: UseFrameSequenceProps) => {
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const loadingStartedRef = useRef(false)

  useEffect(() => {
    if (!autoLoad || loadingStartedRef.current) return
    loadingStartedRef.current = true

    const loadedImages: HTMLImageElement[] = []
    let loaded = 0

    // Helper to pad numbers with leading zeros (e.g. 1 -> "001", 12 -> "012")
    const padZero = (num: number, size: number) => {
      let s = num + ''
      while (s.length < size) s = '0' + s
      return s
    }

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      const frameNum = padZero(i, 3)
      img.src = `${folder}/${prefix}${frameNum}.${ext}`
      
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === frameCount) {
          setIsLoaded(true)
        }
      }
      
      img.onerror = () => {
        console.warn(`Failed to load frame: ${img.src}`)
        loaded++
        setLoadedCount(loaded)
        if (loaded === frameCount) {
          setIsLoaded(true)
        }
      }
      
      loadedImages.push(img)
    }
    
    setImages(loadedImages)
  }, [folder, frameCount, prefix, ext, autoLoad])

  const progress = frameCount > 0 ? Math.round((loadedCount / frameCount) * 100) : 0

  return { images, isLoaded, progress }
}
