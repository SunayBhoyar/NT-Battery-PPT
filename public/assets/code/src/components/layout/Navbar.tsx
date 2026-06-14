import React from 'react'

interface NavbarProps {
  visible: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ visible }) => {
  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-out border-b border-white/[0.03] ${
        visible
          ? 'opacity-100 translate-y-0 bg-[#050505]/70 backdrop-blur-md py-4 md:py-6'
          : 'opacity-0 -translate-y-4 pointer-events-none py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#"
          className="font-serif text-lg md:text-xl tracking-[0.2em] font-semibold text-white hover:text-gold-light transition-colors duration-300"
        >
          NORTHERN TRUST
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-12">
          {['Products', 'Technology', 'Support', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs tracking-[0.25em] uppercase text-white/60 hover:text-gold-primary transition-colors duration-300 font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#order"
            id="reserve-btn"
            className="inline-block px-5 py-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-[#050505] bg-gold-primary hover:bg-gold-light rounded-sm transition-all duration-300 gold-glow hover:scale-105"
          >
            Reserve Now
          </a>
        </div>
      </div>
    </nav>
  )
}
