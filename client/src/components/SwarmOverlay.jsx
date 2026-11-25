import { useEffect, useRef, useCallback, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// ─── Ported core from DhvanilPatel/swarm-cursors (MIT-compatible) ───────────
// Physics: flocking + spring, Figma-style crosshair drag, text typing, ruler guides

const COLORS = ['#F24E1E','#A259FF','#1ABCFE','#0ACF83','#FF7262','#FFC700','#9747FF','#E8467C','#14AE5C','#0D99FF','#FF8A00','#00B5CE']
const NAMES  = ['@dharamvir','@rag-agent','@bq-opt','@hitl-guard','@langchain','@langgraph']

const rand  = (a, b) => a + Math.random() * (b - a)
const lerp  = (a, b, t) => a + (b - a) * t
const dist  = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)
const easeOut = t => 1 - Math.pow(1 - t, 3)

// ─── Arrow cursor path (from original repo) ─────────────────────────────────
const ARROW_D = 'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z'
const CROSS_D = 'M12 3.5 V20.5 M3.5 12 H20.5'

function makeCursorSVG(shape, color) {
  const st = `stroke="#fff" stroke-width="1.5" stroke-linejoin="round"`
  if (shape === 'cross') {
    return `<g stroke-linecap="round">
      <path d="${CROSS_D}" stroke="#fff" stroke-width="3.6"/>
      <path d="${CROSS_D}" stroke="${color}" stroke-width="1.5"/>
    </g>`
  }
  return `<path d="${ARROW_D}" fill="${color}" ${st}/>`
}

// ─── Build a cursor DOM element ──────────────────────────────────────────────
function createCursorEl(color, label) {
  const wrap = document.createElement('div')
  wrap.style.cssText = `
    position:absolute; pointer-events:none; z-index:200;
    display:flex; align-items:flex-start; will-change:transform;
    filter:drop-shadow(0 0 8px ${color}80);
    transition: opacity 0.3s;
  `
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
  svg.setAttribute('width','24'); svg.setAttribute('height','24')
  svg.setAttribute('viewBox','0 0 24 24')
  svg.innerHTML = makeCursorSVG('arrow', color)
  wrap.appendChild(svg)

  const tag = document.createElement('span')
  tag.textContent = label
  tag.style.cssText = `
    margin-left:2px; margin-top:12px;
    padding:2px 7px; border-radius:999px;
    font-family:JetBrains Mono,monospace; font-size:10px; font-weight:700;
    white-space:nowrap; color:#08090C;
    background:${color}; box-shadow:0 2px 8px ${color}50;
  `
  wrap.appendChild(tag)
  return wrap
}

// ─── Build a crosshair box (Figma rect draw) ─────────────────────────────────
function createBox({ x, y, w, h, color, label }) {
  const el = document.createElement('div')
  el.style.cssText = `
    position:absolute; pointer-events:none; z-index:150;
    left:${x}px; top:${y}px; width:${w}px; height:${h}px;
    border:1.5px dashed ${color}60; border-radius:8px; box-sizing:border-box;
  `
  // corner handles
  ;[['top:−3px;left:−3px'],['top:−3px;right:−3px'],['bottom:−3px;left:−3px'],['bottom:−3px;right:−3px']].forEach(pos => {
    const c = document.createElement('span')
    c.style.cssText = `position:absolute;${pos[0].replace('−','-')};width:6px;height:6px;background:${color};border-radius:1px;`
    el.appendChild(c)
  })
  // label
  const lbl = document.createElement('span')
  lbl.textContent = label
  lbl.style.cssText = `
    position:absolute; top:-22px; left:0;
    padding:2px 6px; border-radius:4px; background:${color};
    font-family:JetBrains Mono,monospace; font-size:9px; font-weight:700;
    color:#08090C; white-space:nowrap;
  `
  el.appendChild(lbl)
  // size badge
  const badge = document.createElement('span')
  badge.textContent = `${Math.round(w)} × ${Math.round(h)}`
  badge.style.cssText = `
    position:absolute; bottom:-18px; right:0;
    padding:1px 5px; border-radius:3px; background:#0F1118; border:1px solid ${color}40;
    font-family:JetBrains Mono,monospace; font-size:9px; color:${color};
  `
  el.appendChild(badge)
  // ruler lines
  const rulerH = document.createElement('div')
  rulerH.style.cssText = `position:absolute;bottom:-8px;left:0;right:0;height:1px;background:${color}25;`
  el.appendChild(rulerH)
  const rulerV = document.createElement('div')
  rulerV.style.cssText = `position:absolute;top:0;bottom:0;right:-8px;width:1px;background:${color}25;`
  el.appendChild(rulerV)
  return el
}

// ─── Flocking agent ──────────────────────────────────────────────────────────
class Agent {
  constructor(id, color, label, vw, vh) {
    this.id    = id
    this.color = color
    this.label = label
    // start from random edge
    const edge = Math.floor(Math.random() * 4)
    this.x = edge === 0 ? -30 : edge === 1 ? vw + 30 : rand(0, vw)
    this.y = edge === 2 ? -30 : edge === 3 ? vh + 30 : rand(0, vh)
    this.vx   = 0
    this.vy   = 0
    this.tx   = vw / 2  // target
    this.ty   = vh / 2
    this.el   = createCursorEl(color, label)
    this.shape = 'arrow'
    this.phase = 'entering'  // entering | working | exiting
  }

  setTarget(tx, ty) { this.tx = tx; this.ty = ty }

  update(dt, agents) {
    const speed  = this.phase === 'entering' ? 0.12 : this.phase === 'exiting' ? 0.14 : 0.08
    const jitter = this.phase === 'working'  ? rand(-0.4, 0.4) : 0

    // Spring toward target
    const dx = this.tx - this.x + jitter
    const dy = this.ty - this.y + jitter
    this.vx = lerp(this.vx, dx * speed, 0.18)
    this.vy = lerp(this.vy, dy * speed, 0.18)

    // Slight separation from other agents
    for (const other of agents) {
      if (other.id === this.id) continue
      const d = dist(this, other)
      if (d < 60 && d > 0) {
        this.vx += (this.x - other.x) / d * 0.3
        this.vy += (this.y - other.y) / d * 0.3
      }
    }

    this.x += this.vx
    this.y += this.vy
    this.el.style.transform = `translate(${Math.round(this.x)}px,${Math.round(this.y)}px)`
  }

  atTarget(tol = 20) {
    return Math.abs(this.x - this.tx) < tol && Math.abs(this.y - this.ty) < tol
  }
}

// ─── Main choreography: a sequence of tasks each agent does ─────────────────
// Zones: each zone maps to a real DOM element on the page
const ZONES = [
  { sel: '#hero',       label: 'Hero Section',      color: '#1ABCFE' },
  { sel: '#about',      label: 'About · MNNIT',     color: '#0ACF83' },
  { sel: '#experience', label: 'Experience · DealShare', color: '#F24E1E' },
  { sel: '#projects',   label: 'Projects',          color: '#A259FF' },
  { sel: '#skills',     label: 'AI & Skills',       color: '#FFC700' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SwarmOverlay – the full canvas-based rebuild effect
// ─────────────────────────────────────────────────────────────────────────────
const SwarmOverlay = ({ active, onFinish }) => {
  const shouldReduce = useReducedMotion()
  const canvasRef    = useRef(null)
  const stateRef     = useRef(null)
  const rafRef       = useRef(null)
  const [visible, setVisible]   = useState(false)
  const [progress, setProgress] = useState(0)   // 0–1
  const [phase, setPhase]       = useState('Building...')
  const [skip, setSkip]         = useState(false)

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (stateRef.current) {
      stateRef.current.agents.forEach(a => a.el.remove())
      stateRef.current.boxes.forEach(b => b.remove())
      stateRef.current.overlay?.remove()
      stateRef.current = null
    }
  }, [])

  const finish = useCallback(() => {
    cleanup()
    setVisible(false)
    onFinish?.()
  }, [cleanup, onFinish])

  // ── Kick off ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return
    if (shouldReduce) { onFinish?.(); return }

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Full-screen overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:999;
      background:#08090C;
      background-image:linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size:40px 40px;
      pointer-events:all;
    `
    document.body.appendChild(overlay)

    // Create N agents
    const count  = Math.min(NAMES.length, 6)
    const agents = Array.from({ length: count }, (_, i) =>
      new Agent(i, COLORS[i % COLORS.length], NAMES[i], vw, vh)
    )
    agents.forEach(a => overlay.appendChild(a.el))

    stateRef.current = { agents, boxes: [], overlay, done: false }
    setVisible(true)
    setProgress(0)
    setPhase('Swarm agents entering...')

    let taskIndex   = 0
    let taskTimer   = 0
    let taskState   = 'gather'   // gather | draw | reveal | exit
    let boxes       = []
    let zoneIndex   = 0
    let revealedEls = []
    const totalTasks = ZONES.length + 1  // zones + exit

    // ── Animate ─────────────────────────────────────────────────────────────
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last; last = now
      const st = stateRef.current
      if (!st || st.done) return

      // Update all agent positions (flocking)
      agents.forEach(a => a.update(dt, agents))
      taskTimer += dt

      // ── State machine ────────────────────────────────────────────────────
      if (taskState === 'gather') {
        // Spread agents out first
        const zone = ZONES[zoneIndex] || null
        const targetEl = zone ? document.querySelector(zone.sel) : null
        const rect = targetEl ? targetEl.getBoundingClientRect() : null

        agents.forEach((a, i) => {
          if (rect) {
            // Fan out around the zone edges
            const angle = (i / count) * Math.PI * 2
            a.setTarget(
              rect.left + rect.width  / 2 + Math.cos(angle) * (rect.width  / 2 + 60),
              rect.top  + rect.height / 2 + Math.sin(angle) * (rect.height / 2 + 60)
            )
          } else {
            // Scatter to corners for exit
            const corners = [[-100,-100],[vw+100,-100],[-100,vh+100],[vw+100,vh+100],[vw/2,-100],[vw/2,vh+100]]
            const c = corners[i % corners.length]
            a.phase = 'exiting'
            a.setTarget(c[0], c[1])
          }
        })

        const allNear = agents.every(a => a.atTarget(50))
        if (allNear || taskTimer > 900) {
          taskTimer = 0
          if (!zone) {
            // All zones done → start exit
            taskState = 'exit'
          } else {
            taskState = 'draw'
            setPhase(`Drawing ${zone.label}...`)
            setProgress((zoneIndex) / totalTasks)
          }
        }

      } else if (taskState === 'draw') {
        const zone    = ZONES[zoneIndex]
        const targetEl = document.querySelector(zone.sel)
        if (!targetEl) { taskTimer = 999 }

        if (taskTimer < 20 && targetEl) {
          // Draw the crosshair box around this zone
          const rect  = targetEl.getBoundingClientRect()
          const grow  = 12
          const box   = createBox({
            x: rect.left   - grow,
            y: rect.top    - grow,
            w: rect.width  + grow * 2,
            h: rect.height + grow * 2,
            color: zone.color,
            label: zone.label,
          })
          overlay.appendChild(box)
          boxes.push(box)
          st.boxes = boxes

          // Move agents to crosshair spots inside the box
          const cx = rect.left + rect.width  / 2
          const cy = rect.top  + rect.height / 2
          agents.forEach((a, i) => {
            a.shape = 'cross'
            const angle = (i / count) * Math.PI * 2
            a.setTarget(cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 60)
          })
        }

        if (taskTimer > 700) {
          taskTimer = 0
          taskState = 'reveal'
          setPhase(`Revealing ${zone.label}...`)
        }

      } else if (taskState === 'reveal') {
        const zone     = ZONES[zoneIndex]
        const targetEl = document.querySelector(zone.sel)

        if (taskTimer < 20 && targetEl) {
          // Punch a hole in the overlay — reveal the real section below
          const rect = targetEl.getBoundingClientRect()
          // Create a "revealed" window: a cutout (white bg matches page, transparent to show real page)
          const cutout = document.createElement('div')
          cutout.style.cssText = `
            position:fixed;
            left:${rect.left - 8}px; top:${rect.top - 8}px;
            width:${rect.width + 16}px; height:${rect.height + 16}px;
            z-index:1000; pointer-events:none;
            background:transparent;
            border-radius:12px;
            box-shadow: 0 0 0 9999px #08090C;
            animation: swarm-reveal 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          `
          // We'll use a clip-path reveal instead
          cutout.style.cssText = `
            position:fixed;
            left:0;top:0;width:100%;height:100%;
            z-index:999;pointer-events:none;
            background:#08090C;
            clip-path: polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% 0%,
              ${rect.left-10}px ${rect.top-10}px,
              ${rect.left-10}px ${rect.bottom+10}px,
              ${rect.right+10}px ${rect.bottom+10}px,
              ${rect.right+10}px ${rect.top-10}px,
              ${rect.left-10}px ${rect.top-10}px
            );
            transition: opacity 0.4s;
          `
          revealedEls.push({ rect, zoneIndex })

          // Remove the box for this zone (it's been "built")
          if (boxes[zoneIndex]) {
            boxes[zoneIndex].style.opacity = '0'
            boxes[zoneIndex].style.transition = 'opacity 0.3s'
          }
          // Fade out that region of the dark overlay
          overlay.style.transition = 'none'
          // We punch out each revealed zone by reducing overlay opacity zone-by-zone
          // Simple approach: fade the full overlay once all zones done
        }

        if (taskTimer > 600) {
          taskTimer   = 0
          zoneIndex  += 1
          taskState   = 'gather'
          setProgress((zoneIndex) / totalTasks)

          if (zoneIndex >= ZONES.length) {
            // All zones revealed → begin exit
            setPhase('Portfolio ready! ✓')
            setProgress(0.95)
            // Fade the dark overlay away completely
            overlay.style.transition = 'opacity 0.8s ease'
            overlay.style.opacity    = '0'
            setTimeout(() => {
              st.done = true
              finish()
            }, 1000)
            return
          }
        }

      } else if (taskState === 'exit') {
        const allGone = agents.every(a =>
          a.x < -60 || a.x > vw + 60 || a.y < -60 || a.y > vh + 60
        )
        if (allGone || taskTimer > 1200) {
          st.done = true
          finish()
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cleanup()
    }
  }, [active, shouldReduce, finish, cleanup])

  // ── Skip ──────────────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    setSkip(true)
    finish()
  }, [finish])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[1001] pointer-events-none"
      aria-hidden="true"
    >
      {/* HUD bar at bottom */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1002] flex items-center gap-4 px-5 py-2.5 rounded-2xl backdrop-blur-xl pointer-events-auto"
        style={{
          background: 'rgba(13,16,23,0.95)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
        </span>

        <div className="flex flex-col min-w-0">
          <span className="font-mono text-xs text-white font-semibold whitespace-nowrap">
            {phase}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            {NAMES.slice(0, 4).join(' · ')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
          <div
            className="h-full bg-sky-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <button
          onClick={handleSkip}
          className="text-[11px] font-mono text-sky-400 hover:text-white underline underline-offset-2 cursor-pointer flex-shrink-0"
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default SwarmOverlay
