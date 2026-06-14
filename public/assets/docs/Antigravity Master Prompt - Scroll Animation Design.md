# Northern Trust Power Bank
# Antigravity Master Prompt & Breakdown Prompts

---

# MASTER ANTIGRAVITY PROMPT

You are an award-winning creative director, luxury product designer, motion designer, frontend architect, and Apple-level product marketing specialist.

Design and build a premium cinematic product website for Northern Trust Power Banks.

The website should feel like a cross between:

- Apple product launch pages
- Bang & Olufsen
- Porsche Design
- Leica
- Luxury watch advertisements

The experience must feel expensive, minimal, elegant, cinematic, and engineered.

Avoid:

- Generic SaaS design
- Startup aesthetics
- Neon cyberpunk visuals
- Bright colors
- Overloaded UI
- Glassmorphism
- Excessive animations

The product must remain the hero throughout the entire experience.

---

# VISUAL LANGUAGE

Color Palette

Background:
#050505

Primary Gold:
#C8A66A

Highlight Gold:
#E8C78A

White:
#FFFFFF

Muted Text:
#A8A8A8

---

Typography

Headings:
Cormorant Garamond

Body:
Inter

Rules:

- Large typography
- Editorial spacing
- Premium luxury feel
- Minimal words
- High contrast

---

# WEBSITE EXPERIENCE

The website should tell a story.

The user should feel like they are watching a luxury product film instead of browsing a website.

Every section should feel calm, intentional, and premium.

Scrolling should feel smooth and cinematic.

All transitions should use easing curves inspired by Apple product launches.

---

# TECHNICAL REQUIREMENTS

Framework:
Next.js

Language:
TypeScript

Styling:
Tailwind CSS

Animation:
GSAP
ScrollTrigger

Smooth Scrolling:
Lenis

Image Sequence Rendering:
Canvas

Performance:
60 FPS

Responsive:
Desktop First
Tablet
Mobile

---

# PAGE STRUCTURE

1. Hero Product Reveal
2. Connectivity Showcase
3. Battery Capacity Showcase
4. Battery Charge Animation
5. X-Ray Technology Showcase
6. Footer

---

# MOTION DESIGN RULES

Motion should feel:

- Heavy
- Premium
- Deliberate
- Physical
- Elegant

Avoid:

- Bouncy animations
- Elastic effects
- Overshoot motion
- Fast movement

Animation timing:

0.8s
1.2s
1.6s

Preferred easing:

power2.out
power3.out
expo.out

---

# SCROLL EXPERIENCE

Use frame sequence rendering.

Images should switch according to scroll progress.

Never use GIFs.

Never use video playback.

Render image sequences using canvas.

The user should feel that they are controlling the product physically while scrolling.

---

# DESIGN PHILOSOPHY

Show less.

Reveal more.

Let lighting, spacing, typography, and motion create the premium experience.

The product should occupy most of the screen.

Content should support the product instead of competing with it.

---

# SECTION PROMPT 01
# HERO PRODUCT REVEAL

Create the hero section of a luxury product website.

Requirements:

- Full screen
- Black background
- Product centered
- No navigation visible initially
- No title visible initially
- Product floating in darkness
- Soft golden rim lighting

User scroll drives a frame sequence animation.

The product slowly rotates and reveals itself.

At the end of the sequence:

- Navbar fades in
- Northern Trust title appears
- Subtitle appears

Animation style:

Apple Vision Pro launch
Luxury watch commercial
Cinematic product reveal

Hero height:

300vh

---

# SECTION PROMPT 02
# CONNECTIVITY SHOWCASE

Create a connectivity showcase section.

Requirements:

- Black background
- Product remains center stage
- Frame sequence reveals connection side

Left Content:

Built for every device.

Right Content:

USB-C
Lightning
Micro USB
Fast Charging

Animation:

Left content enters from left.
Right content enters from right.

Subtle golden energy accents.

No glowing cyberpunk effects.

The design should feel engineered and premium.

Section height:

250vh

---

# SECTION PROMPT 03
# BATTERY CAPACITY SHOWCASE

Create a battery capacity section.

Background:

Large premium still image of the product.

Headline:

10000 mAh

Subheadline:

Power that lasts.

Description:

Short premium copy.

Animation:

Text fades in gradually.

Generous spacing.

Luxury editorial layout.

No frame sequence required.

Focus on simplicity.

---

# SECTION PROMPT 04
# BATTERY CHARGE COMPONENT

Create a standalone battery charging component.

Purpose:

Demonstrate battery charging capability.

Requirements:

- Premium appearance
- Black and gold theme
- Minimal interface

Animation:

0%
25%
50%
75%
100%

Animate once.

Do not tie to scroll.

Use smooth liquid-style filling motion.

Duration:

4-6 seconds

The component should feel like a luxury dashboard.

---

# SECTION PROMPT 05
# X-RAY TECHNOLOGY SHOWCASE

Create a cinematic X-Ray technology section.

Purpose:

Reveal the internal engineering of the power bank.

Use a frame sequence animation.

The outer shell gradually becomes transparent.

Internal battery cells appear.

Charging circuitry becomes visible.

Golden energy travels through charging paths.

Text:

Intelligent Power Management

Supporting copy:

- Smart Charging
- Thermal Protection
- Extended Cell Longevity

The effect should feel like premium engineering visualization.

Not science fiction.

Not futuristic neon.

Section height:

300vh

---

# SECTION PROMPT 06
# FOOTER

Create a minimal luxury footer.

Requirements:

Black background.

Thin gold divider.

Logo.

Navigation:

Products
Technology
Support
Contact

Small copyright text.

Elegant spacing.

Premium luxury feel.

---

# COMPONENT GENERATION PROMPT

Generate reusable React components.

Requirements:

- TypeScript
- Tailwind CSS
- Accessibility support
- Reusable architecture
- Responsive design

Naming conventions:

HeroSection
ConnectivitySection
BatterySection
XRaySection
Footer

Avoid monolithic code.

Create maintainable architecture.

---

# GSAP ANIMATION PROMPT

Implement all animations using GSAP and ScrollTrigger.

Requirements:

- Smooth scroll synchronization
- Frame sequence control
- Timeline orchestration
- Mobile optimization
- Performance optimization

Avoid:

- Scroll jank
- Layout shifts
- Excessive re-renders

Use requestAnimationFrame when appropriate.

---

# FRAME SEQUENCE PROMPT

Build a reusable frame sequence engine.

Features:

- Image preloading
- Canvas rendering
- Scroll synchronization
- Responsive resizing
- Lazy loading

Support:

Hero sequence
Connectivity sequence
X-Ray sequence

Maintain 60 FPS performance.

---

# FINAL CREATIVE DIRECTION

The final website should feel like:

A luxury product film that happens to be interactive.

The product is always the hero.

The user should remember:

The craftsmanship.
The engineering.
The premium feel.

Not the UI.
