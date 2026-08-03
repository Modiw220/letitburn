interface EmberParticlesProps {
  count?: number
  className?: string
}

const DEFAULT_POSITIONS = [
  { left: '12%', bottom: '18%', delay: '0s' },
  { left: '28%', bottom: '24%', delay: '1.4s' },
  { left: '72%', bottom: '20%', delay: '0.7s' },
  { left: '88%', bottom: '16%', delay: '2.1s' },
  { left: '50%', bottom: '12%', delay: '1.8s' },
]

export default function EmberParticles({
  count = 5,
  className = '',
}: EmberParticlesProps) {
  const positions = DEFAULT_POSITIONS.slice(0, count)

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {positions.map((ember, index) => (
        <span
          key={index}
          className="ember-particle"
          style={{
            left: ember.left,
            bottom: ember.bottom,
            animationDelay: ember.delay,
          }}
        />
      ))}
    </div>
  )
}
