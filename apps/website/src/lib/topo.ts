// Deterministic contour field: distorted concentric rings around a few summits,
// drawn in a 1440x760 viewBox.

export interface Peak {
  readonly x: number
  readonly y: number
  readonly rings: number
  /** Radius gained per ring, in viewBox units. */
  readonly step: number
  /** Phase offset that gives each peak its own wobble. */
  readonly seed: number
}

export interface ContourLine {
  readonly d: string
  /** Every fifth ring is drawn heavier, like an index contour on a survey map. */
  readonly isIndex: boolean
}

type Point = readonly [number, number]

export const PEAKS: readonly Peak[] = [
  { x: 1080, y: 210, rings: 16, step: 34, seed: 1.3 },
  { x: 360, y: 520, rings: 11, step: 30, seed: 4.1 },
  { x: 1380, y: 640, rings: 8, step: 28, seed: 2.7 },
]

/** The highest peak, where the hero trail ends. */
export const SUMMIT: Peak = PEAKS[0]

const SAMPLES = 72

function ringPoints(peak: Peak, ring: number): Point[] {
  return Array.from({ length: SAMPLES }, (_, i) => {
    const t = (i / SAMPLES) * Math.PI * 2
    const wobble =
      1 +
      0.16 * Math.sin(3 * t + peak.seed + ring * 0.11) +
      0.08 * Math.sin(5 * t - peak.seed * 2 + ring * 0.23) +
      0.05 * Math.sin(9 * t + ring * 0.4)
    const r = peak.step * ring * wobble * (1 + 0.012 * ring)
    return [peak.x + Math.cos(t) * r * 1.25, peak.y + Math.sin(t) * r * 0.85]
  })
}

const fmt = (n: number): string => n.toFixed(1)

/** Closed Catmull-Rom spline through the points, as cubic bezier path data. */
function closedSpline(pts: readonly Point[]): string {
  const n = pts.length
  const segments = pts.map((p1, i) => {
    const p0 = pts[(i - 1 + n) % n]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    return `C${fmt(c1x)},${fmt(c1y)} ${fmt(c2x)},${fmt(c2y)} ${fmt(p2[0])},${fmt(p2[1])}`
  })
  return `M${fmt(pts[0][0])},${fmt(pts[0][1])}${segments.join('')}Z`
}

export function contourLines(peaks: readonly Peak[] = PEAKS): readonly ContourLine[] {
  return peaks.flatMap((peak) =>
    Array.from({ length: peak.rings }, (_, i) => {
      const ring = i + 1
      return { d: closedSpline(ringPoints(peak, ring)), isIndex: ring % 5 === 0 }
    }),
  )
}
