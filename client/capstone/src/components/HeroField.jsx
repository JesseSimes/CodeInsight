import { useEffect, useState } from 'react'
import { Bend, FloatingParticles, Shader } from 'shaders/react'
import { useTheme } from '../lib/theme'

/*
 * Living hero background: a still field of particles the visitor can sweep.
 *
 *   FloatingParticles  a fixed number of particles at rest. Drift, wander and
 *                      twinkle are all zero, so nothing moves on its own.
 *                      The cursor pushes nearby particles; they glide to a
 *                      stop and keep that new position (the library has no
 *                      pull back to a home position for this effect).
 *   Bend               a light curve at the left and right edges, like a
 *                      curved display, so the field reads with some depth.
 *
 * The cursor's reach is fixed inside the library (0.22 of the frame), so the
 * push strength is kept low to keep the disturbed area small.
 *
 * Rendered with WebGPU by the `shaders` library, which pauses itself when the
 * canvas is off screen. If WebGPU is unavailable the canvas stays transparent
 * and the CSS grid underneath remains as the fallback. With reduced motion,
 * the particles are drawn once and ignore the cursor.
 */

// Soft white on the dark theme. On the light theme pure white would vanish
// against the ivory background, so a soft graphite takes its place.
const PARTICLE_COLOR = { dark: '#e8edf5', light: '#7d8794' }

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduce, setReduce] = useState(() => window.matchMedia?.(query).matches ?? false)
  useEffect(() => {
    const mq = window.matchMedia?.(query)
    if (!mq) return undefined
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

export default function HeroField({ onReady, onUnavailable }) {
  const theme = useTheme()
  const reduce = usePrefersReducedMotion()

  return (
    <Shader
      className="l-field-canvas"
      disableTelemetry
      onReady={onReady}
      onUnavailable={onUnavailable}
      aria-hidden="true"
    >
      <Bend strength={0.2} falloff={0.35} angle={0}>
        <FloatingParticles
          particleColor={PARTICLE_COLOR[theme] || PARTICLE_COLOR.dark}
          shape="dot"
          count={3200}
          particleSize={1.6}
          softness={0.3}
          speed={0}
          speedVariance={0}
          angleVariance={0}
          randomness={0}
          twinkle={0}
          cursorStrength={reduce ? 0 : 0.3}
        />
      </Bend>
    </Shader>
  )
}
