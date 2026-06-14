import React from 'react'

interface GoldenDividerProps {
  className?: string
}

export const GoldenDivider: React.FC<GoldenDividerProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/25 to-transparent ${className}`}
    />
  )
}
