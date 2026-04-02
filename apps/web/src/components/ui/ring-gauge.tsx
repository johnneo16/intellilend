'use client'
import React from 'react'

interface RingGaugeProps {
  value: number        // 0-100
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
  sublabel?: string
  showValue?: boolean
  animate?: boolean
}

export function RingGauge({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = '#6366f1',
  trackColor = 'rgba(255,255,255,0.06)',
  label,
  sublabel,
  showValue = true,
  animate = true,
}: RingGaugeProps) {
  const pct = Math.min(Math.max(value / max, 0), 1)
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const dash = pct * circ
  const gap  = circ - dash
  // start from top (rotate -90deg)
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          style={{
            transition: animate ? 'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)' : undefined,
            filter: `drop-shadow(0 0 6px ${color}60)`,
          }}
        />
      </svg>
      {/* Center text */}
      {(showValue || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {showValue && (
            <span className="font-black text-white leading-none" style={{ fontSize: size * 0.22 }}>
              {Math.round(value)}
            </span>
          )}
          {label && (
            <span className="text-slate-400 leading-none mt-0.5" style={{ fontSize: size * 0.13 }}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-slate-600 leading-none" style={{ fontSize: size * 0.11 }}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/* Semi-circle gauge for FOIR */
export function SemiGauge({
  value,
  max = 100,
  color = '#6366f1',
  size = 100,
  label,
}: {
  value: number
  max?: number
  color?: string
  size?: number
  label?: string
}) {
  const pct = Math.min(Math.max(value / max, 0), 1)
  const strokeWidth = 7
  const r = (size - strokeWidth) / 2
  const halfCirc = Math.PI * r
  const dash = pct * halfCirc
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size / 2 + 10 }}>
      <svg
        width={size}
        height={size / 2 + strokeWidth}
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}
        style={{ overflow: 'visible' }}
      >
        {/* Track */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${r} ${r} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${r} ${r} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${halfCirc}`}
          style={{
            filter: `drop-shadow(0 0 5px ${color}80)`,
            transition: 'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)',
          }}
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-lg font-black text-white">{value}{label || ''}</span>
      </div>
    </div>
  )
}
