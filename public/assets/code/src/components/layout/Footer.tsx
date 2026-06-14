import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-[#050505] text-white py-16 md:py-24 border-t border-gold-primary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Logo and Brand Name */}
        <div className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-semibold mb-8 md:mb-12">
          NORTHERN TRUST
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-4 mb-12 md:mb-16">
          {['Products', 'Technology', 'Support', 'Contact', 'Privacy', 'Terms'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40 hover:text-gold-primary transition-colors duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Golden Line Accent */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mb-8" />

        {/* Copyright & Info */}
        <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/30 text-center leading-relaxed">
          &copy; {new Date().getFullYear()} NORTHERN TRUST INC. ALL RIGHTS RESERVED.<br />
          CRAFTED BY MASTER ARTISANS. ENGINEERED TO LAST.
        </div>
      </div>
    </footer>
  )
}
