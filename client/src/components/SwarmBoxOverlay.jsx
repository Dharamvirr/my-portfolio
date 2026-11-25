import { useEffect, useRef, useState, useCallback } from 'react'

/* ── Global Timing Control ─────────────────────────── */
const SPEED_MULTIPLIER = 1.0 // 1.0 ≈ 3.5s total build time

/* ── 12-Cursor Swarm Roster ────────────────────────── */
const CURSORS = [
  { name: 'UI',    color: '#3b82f6', edge: 'top' },
  { name: 'Nav',   color: '#06b6d4', edge: 'left' },
  { name: 'Type',  color: '#8b5cf6', edge: 'right' },
  { name: 'Grid',  color: '#10b981', edge: 'bottom' },
  { name: 'CTA',   color: '#f59e0b', edge: 'left' },
  { name: 'Card',  color: '#ec4899', edge: 'right' },
  { name: 'Dev',   color: '#6366f1', edge: 'top' },
  { name: 'Style', color: '#f43f5e', edge: 'bottom' },
  { name: 'QA',    color: '#14b8a6', edge: 'left' },
  { name: 'Data',  color: '#f97316', edge: 'right' },
  { name: 'AI',    color: '#a855f7', edge: 'top' },
  { name: 'Ship',  color: '#22c55e', edge: 'bottom' },
]

const SETTLE_DELAY = 500 // ms – let initial layout transforms settle while hidden

/* ── Persistent Subtle Web Audio API Snap Manager ──── */

const snapAudio = (() => {
  let ctx = null
  let lastPlayMs = -Infinity

  function getOrCreateContext() {
    if (ctx) return ctx
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        ctx = new AudioCtx()
      }
    } catch {
      ctx = null
    }
    return ctx
  }

  return {
    unlockSync() {
      try {
        const c = getOrCreateContext()
        if (c && c.state === 'suspended') {
          c.resume().catch(() => {})
        }
      } catch {
        // Ignore unlock errors
      }
    },
    playSnap(nowMs) {
      if (nowMs - lastPlayMs < 90) return
      try {
        const c = getOrCreateContext()
        if (!c || c.state !== 'running') return
        lastPlayMs = nowMs

        const t = c.currentTime
        const osc = c.createOscillator()
        const gain = c.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(650, t)
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.035)

        gain.gain.setValueAtTime(0.15, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035)

        osc.connect(gain)
        gain.connect(c.destination)

        osc.start(t)
        osc.stop(t + 0.036)
      } catch {
        // Fail silently if audio is blocked or unavailable
      }
    },
  }
})()

/* ── Math & Geometry Helpers ───────────────────────── */

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function quadBezier(p0, p1, p2, t) {
  const mt = 1 - t
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  }
}

function makeControlPoint(p0, p2, seed) {
  const dx = p2.x - p0.x
  const dy = p2.y - p0.y
  const dist = Math.hypot(dx, dy) || 1
  const sign = seed % 2 === 0 ? 1 : -1
  const amp = Math.min(160, Math.max(45, dist * 0.3)) * sign
  return {
    x: (p0.x + p2.x) * 0.5 + (-dy / dist) * amp,
    y: (p0.y + p2.y) * 0.5 + (dx / dist) * amp,
  }
}

function getEdgeSpawn(edge, index, vw, vh) {
  const frac = ((index * 37 + 13) % 100) / 100
  switch (edge) {
    case 'left':
      return { x: -36, y: vh * (0.12 + frac * 0.72) }
    case 'right':
      return { x: vw + 36, y: vh * (0.12 + frac * 0.72) }
    case 'bottom':
      return { x: vw * (0.12 + frac * 0.76), y: vh + 36 }
    case 'top':
    default:
      return { x: vw * (0.12 + frac * 0.76), y: -36 }
  }
}

function resetSwarmElements(elements) {
  elements.forEach((el) => {
    el.style.opacity = '1'
    el.style.clipPath = ''
  })
}

function shouldAutoPlay() {
  try {
    if (typeof window === 'undefined') return false
    if (window.innerWidth < 640) return false
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false
    }
    return true
  } catch {
    return false
  }
}

/* ── Task & Wave Scheduler ─────────────────────────── */

function buildSchedule(targets, vw, vh) {
  const sorted = [...targets].sort((a, b) => {
    if (Math.abs(a.rect.top - b.rect.top) > 30) return a.rect.top - b.rect.top
    return a.rect.left - b.rect.left
  })

  const waves = []
  let currentWave = []
  let waveAnchorTop = sorted[0]?.rect.top ?? 0

  sorted.forEach((item) => {
    if (
      currentWave.length > 0 &&
      (item.rect.top - waveAnchorTop > 80 || currentWave.length >= 6)
    ) {
      waves.push(currentWave)
      currentWave = [item]
      waveAnchorTop = item.rect.top
    } else {
      currentWave.push(item)
    }
  })
  if (currentWave.length > 0) waves.push(currentWave)

  const cursorTracks = CURSORS.map((c, idx) => ({
    cursorIdx: idx,
    spawn: getEdgeSpawn(c.edge, idx, vw, vh),
    tasks: [],
  }))

  const waveCount = Math.max(waves.length, 1)
  const totalBuildSpan = 2650
  const waveInterval = waveCount > 1 ? Math.min(540, totalBuildSpan / (waveCount + 0.6)) : 0

  let maxEndTime = 0
  let globalCursorPick = 0

  waves.forEach((wave, wIdx) => {
    const waveStart = wIdx * waveInterval

    wave.forEach((target, tIdx) => {
      const ci = globalCursorPick % CURSORS.length
      globalCursorPick++

      const track = cursorTracks[ci]
      const prevTask = track.tasks[track.tasks.length - 1]

      const stagger = tIdx * 55
      const travelMs = prevTask ? 360 : 420
      const buildMs = target.type === 'text' ? 620 : 520

      const travelStart = prevTask
        ? Math.max(prevTask.buildEnd, waveStart + stagger)
        : waveStart + stagger
      const buildStart = travelStart + travelMs
      const buildEnd = buildStart + buildMs

      const startPos = prevTask ? prevTask.endPos : track.spawn

      const { left, top, width, height } = target.rect
      const entryPos =
        target.type === 'text'
          ? { x: left, y: top + height * 0.5 }
          : target.type === 'media'
            ? { x: left + width * 0.5, y: top }
            : { x: left, y: top }

      const endPos =
        target.type === 'text'
          ? { x: left + width, y: top + height * 0.5 }
          : target.type === 'media'
            ? { x: left + width * 0.5, y: top + height }
            : { x: left + width, y: top + height }

      track.tasks.push({
        target,
        travelStart,
        buildStart,
        buildEnd,
        startPos,
        ctrlPos: makeControlPoint(startPos, entryPos, ci + wIdx + tIdx),
        entryPos,
        endPos,
        done: false,
      })

      if (buildEnd > maxEndTime) maxEndTime = buildEnd
    })
  })

  return { cursorTracks, maxEndTime }
}

/* ── Figma-style pointer cursor SVG ────────────────── */

const CursorSVG = ({ color }) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L1 16L5 12L8.5 19.5L11 18.5L7.5 11L14 11L1 1Z"
      fill={color}
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

/* ── Component ─────────────────────────────────────── */

const SwarmBoxOverlay = () => {
  const overlayRef = useRef(null)
  const cursorRefs = useRef([])
  const boxRefs = useRef([])
  const pillRefs = useRef([])
  const caretRefs = useRef([])
  const hGuideRefs = useRef([])
  const vGuideRefs = useRef([])

  const [playing, setPlaying] = useState(() => shouldAutoPlay())
  const [runId, setRunId] = useState(0)

  // Unlock AudioContext on first user interaction anywhere in window
  useEffect(() => {
    const handleUnlock = () => {
      snapAudio.unlockSync()
    }
    window.addEventListener('pointerdown', handleUnlock, { once: true, passive: true })
    window.addEventListener('keydown', handleUnlock, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', handleUnlock)
      window.removeEventListener('keydown', handleUnlock)
    }
  }, [])

  const stopAndRevealAll = useCallback(() => {
    const allElements = Array.from(document.querySelectorAll('[data-swarm]'))
    resetSwarmElements(allElements)
    setPlaying(false)
  }, [])

  // Allow skipping with Escape key while playing
  useEffect(() => {
    if (!playing) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        stopAndRevealAll()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playing, stopAndRevealAll])

  // Main 60fps ref-driven animation loop
  useEffect(() => {
    if (!playing) return

    let rafId = null
    let cancelled = false

    const allElements = Array.from(document.querySelectorAll('[data-swarm]'))
    if (!allElements.length) {
      setPlaying(false)
      return
    }

    // Hide all [data-swarm] elements using opacity: 0 ONLY
    allElements.forEach((el) => {
      el.style.opacity = '0'
      el.style.clipPath = ''
    })

    // Ensure overlay opacity starts at 1 on replay
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '1'
    }

    const delay = runId === 0 ? SETTLE_DELAY : 80
    const timer = setTimeout(() => {
      if (cancelled) return

      const targets = allElements
        .map((el) => {
          el.style.opacity = '0'
          const r = el.getBoundingClientRect()
          return {
            el,
            type: el.getAttribute('data-swarm') || 'box',
            rect: {
              left: r.left,
              top: r.top,
              width: r.width,
              height: r.height,
            },
          }
        })
        .filter((t) => t.rect.width > 0 && t.rect.height > 0)

      if (!targets.length) {
        resetSwarmElements(allElements)
        setPlaying(false)
        return
      }

      const vw = window.innerWidth
      const vh = window.innerHeight
      const { cursorTracks, maxEndTime } = buildSchedule(targets, vw, vh)

      const fadeStart = maxEndTime + 120
      const fadeDuration = 380
      const t0 = performance.now()

      function tick(now) {
        if (cancelled) return

        const elapsed = (now - t0) * SPEED_MULTIPLIER

        for (let ci = 0; ci < cursorTracks.length; ci++) {
          const track = cursorTracks[ci]
          const cursorEl = cursorRefs.current[ci]
          const boxEl = boxRefs.current[ci]
          const pillEl = pillRefs.current[ci]
          const caretEl = caretRefs.current[ci]
          const hGuideEl = hGuideRefs.current[ci]
          const vGuideEl = vGuideRefs.current[ci]

          if (!cursorEl || track.tasks.length === 0) continue

          let activeTask = null
          for (let ti = 0; ti < track.tasks.length; ti++) {
            const task = track.tasks[ti]
            if (!task.done && elapsed >= task.buildEnd) {
              task.done = true
              task.target.el.style.opacity = '1'
              task.target.el.style.clipPath = ''
              snapAudio.playSnap(now)
            }
            if (elapsed >= task.travelStart && elapsed <= task.buildEnd) {
              activeTask = task
              break
            }
          }

          if (!activeTask) {
            if (boxEl) boxEl.style.opacity = '0'
            if (caretEl) caretEl.style.opacity = '0'
            if (hGuideEl) hGuideEl.style.opacity = '0'
            if (vGuideEl) vGuideEl.style.opacity = '0'

            const firstTask = track.tasks[0]
            const lastTask = track.tasks[track.tasks.length - 1]
            if (elapsed < firstTask.travelStart) {
              cursorEl.style.opacity = '0'
            } else if (elapsed > lastTask.buildEnd) {
              cursorEl.style.opacity = '0.85'
              cursorEl.style.transform = `translate3d(${lastTask.endPos.x.toFixed(1)}px, ${lastTask.endPos.y.toFixed(1)}px, 0)`
            }
            continue
          }

          cursorEl.style.opacity = '1'

          if (elapsed < activeTask.buildStart) {
            /* ── Phase A: Curved Bezier flight to target ── */
            if (boxEl) boxEl.style.opacity = '0'
            if (caretEl) caretEl.style.opacity = '0'
            if (hGuideEl) hGuideEl.style.opacity = '0'
            if (vGuideEl) vGuideEl.style.opacity = '0'

            const tRaw = (elapsed - activeTask.travelStart) / (activeTask.buildStart - activeTask.travelStart)
            const t = easeInOutCubic(Math.min(Math.max(tRaw, 0), 1))
            const pos = quadBezier(activeTask.startPos, activeTask.ctrlPos, activeTask.entryPos, t)
            cursorEl.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`
          } else {
            /* ── Phase B: Live Build Reveal ── */
            const bRaw = (elapsed - activeTask.buildStart) / (activeTask.buildEnd - activeTask.buildStart)
            const p = easeInOutCubic(Math.min(Math.max(bRaw, 0), 1))
            const { rect, el, type } = activeTask.target

            if (type === 'box') {
              if (caretEl) caretEl.style.opacity = '0'

              const curW = Math.max(2, rect.width * p)
              const curH = Math.max(2, rect.height * p)
              const cx = rect.left + curW
              const cy = rect.top + curH

              cursorEl.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`

              if (boxEl) {
                boxEl.style.opacity = bRaw > 0.88 ? String(Math.max(0, (1 - bRaw) / 0.12)) : '1'
                boxEl.style.transform = `translate3d(${rect.left.toFixed(1)}px, ${rect.top.toFixed(1)}px, 0)`
                boxEl.style.width = `${curW.toFixed(1)}px`
                boxEl.style.height = `${curH.toFixed(1)}px`
              }
              if (hGuideEl) {
                hGuideEl.style.opacity = bRaw > 0.88 ? '0' : '0.45'
                hGuideEl.style.transform = `translate3d(0, ${rect.top.toFixed(1)}px, 0)`
              }
              if (vGuideEl) {
                vGuideEl.style.opacity = bRaw > 0.88 ? '0' : '0.45'
                vGuideEl.style.transform = `translate3d(${rect.left.toFixed(1)}px, 0, 0)`
              }
              if (pillEl) {
                pillEl.textContent = `${Math.round(curW)} × ${Math.round(curH)}`
              }

              if (bRaw >= 0.65) {
                const fadeIn = easeOutCubic(Math.min((bRaw - 0.65) / 0.35, 1))
                el.style.opacity = fadeIn.toFixed(3)
              }
            } else if (type === 'text') {
              if (boxEl) boxEl.style.opacity = '0'
              if (hGuideEl) hGuideEl.style.opacity = '0'
              if (vGuideEl) vGuideEl.style.opacity = '0'

              const cx = rect.left + rect.width * p
              const cy = rect.top + rect.height * 0.5
              cursorEl.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`

              el.style.opacity = '1'
              el.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`

              if (caretEl) {
                const blink = Math.floor(elapsed / 180) % 2 === 0 ? '1' : '0.2'
                const caretH = Math.min(Math.max(rect.height * 0.72, 18), 48)
                caretEl.style.opacity = blink
                caretEl.style.height = `${caretH.toFixed(0)}px`
                caretEl.style.transform = `translate3d(${cx.toFixed(1)}px, ${(cy - caretH * 0.5).toFixed(1)}px, 0)`
              }
            } else {
              if (boxEl) boxEl.style.opacity = '0'
              if (caretEl) caretEl.style.opacity = '0'
              if (hGuideEl) hGuideEl.style.opacity = '0'
              if (vGuideEl) vGuideEl.style.opacity = '0'

              const cx = rect.left + rect.width * 0.5
              const cy = rect.top + rect.height * p
              cursorEl.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`

              el.style.opacity = '1'
              el.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`
            }
          }
        }

        if (elapsed >= fadeStart) {
          const ft = Math.min((elapsed - fadeStart) / fadeDuration, 1)
          if (overlayRef.current) {
            overlayRef.current.style.opacity = String(1 - ft)
          }
          if (ft >= 1) {
            resetSwarmElements(allElements)
            setPlaying(false)
            return
          }
        }

        rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(timer)
      if (rafId !== null) cancelAnimationFrame(rafId)
      resetSwarmElements(allElements)
    }
  }, [playing, runId])

  const handleReplay = () => {
    // Synchronously resume AudioContext inside user click BEFORE starting animation
    snapAudio.unlockSync()
    if (window.scrollY > 10) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    setRunId((prev) => prev + 1)
    setPlaying(true)
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={handleReplay}
        aria-label="Replay Swarm intro animation"
        className="fixed bottom-6 right-20 z-40 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0F121A]/90 hover:bg-[#1A1F2C] border border-white/10 hover:border-sky-500/40 text-xs font-medium text-slate-300 hover:text-white shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-200 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span>Replay Swarm</span>
      </button>
    )
  }

  return (
    <div
      ref={overlayRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    >
      {/* ── Bright 1px Figma snap alignment guides (top & left edges, opacity 0.45) ── */}
      {CURSORS.map((c, i) => (
        <div key={`guides-${c.name}`}>
          <div
            ref={(el) => {
              hGuideRefs.current[i] = el
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: 1,
              opacity: 0,
              backgroundColor: c.color,
              willChange: 'transform, opacity',
            }}
          />
          <div
            ref={(el) => {
              vGuideRefs.current[i] = el
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 1,
              height: '100vh',
              opacity: 0,
              backgroundColor: c.color,
              willChange: 'transform, opacity',
            }}
          />
        </div>
      ))}

      {/* ── Live selection boxes + 6x6 white/bordered Figma corner handles + "W × H" pills ── */}
      {CURSORS.map((c, i) => (
        <div
          key={`sel-${c.name}`}
          ref={(el) => {
            boxRefs.current[i] = el
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            opacity: 0,
            border: `1.5px dashed ${c.color}`,
            backgroundColor: `${c.color}14`,
            borderRadius: 6,
            boxSizing: 'border-box',
            willChange: 'transform, width, height, opacity',
          }}
        >
          {/* 4 crisp 6x6 Figma corner handles (white fill + colored border) */}
          <span style={{ position: 'absolute', top: -3, left: -3, width: 6, height: 6, backgroundColor: '#ffffff', border: `1.5px solid ${c.color}`, boxSizing: 'border-box' }} />
          <span style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, backgroundColor: '#ffffff', border: `1.5px solid ${c.color}`, boxSizing: 'border-box' }} />
          <span style={{ position: 'absolute', bottom: -3, left: -3, width: 6, height: 6, backgroundColor: '#ffffff', border: `1.5px solid ${c.color}`, boxSizing: 'border-box' }} />
          <span style={{ position: 'absolute', bottom: -3, right: -3, width: 6, height: 6, backgroundColor: '#ffffff', border: `1.5px solid ${c.color}`, boxSizing: 'border-box' }} />

          <span
            ref={(el) => {
              pillRefs.current[i] = el
            }}
            style={{
              position: 'absolute',
              right: 0,
              bottom: -20,
              background: c.color,
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              padding: '1px 5px',
              borderRadius: 3,
              whiteSpace: 'nowrap',
              lineHeight: '14px',
              boxShadow: `0 2px 6px ${c.color}55`,
            }}
          >
            0 × 0
          </span>
        </div>
      ))}

      {/* ── Blinking text carets ── */}
      {CURSORS.map((c, i) => (
        <div
          key={`caret-${c.name}`}
          ref={(el) => {
            caretRefs.current[i] = el
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 2,
            height: 24,
            opacity: 0,
            backgroundColor: c.color,
            boxShadow: `0 0 8px ${c.color}`,
            borderRadius: 1,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* ── 12 GPU-accelerated Figma-style cursors ── */}
      {CURSORS.map((c, i) => (
        <div
          key={c.name}
          ref={(el) => {
            cursorRefs.current[i] = el
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            opacity: 0,
            willChange: 'transform',
            transform: 'translate3d(-100px, -100px, 0)',
          }}
        >
          <CursorSVG color={c.color} />
          <span
            style={{
              position: 'absolute',
              left: 15,
              top: 13,
              background: c.color,
              color: '#fff',
              fontSize: 10,
              fontWeight: 600,
              fontFamily: 'Inter, system-ui, sans-serif',
              padding: '1px 7px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              boxShadow: `0 2px 8px ${c.color}55`,
              lineHeight: '14px',
            }}
          >
            {c.name}
          </span>
        </div>
      ))}

      {/* ── Floating "Skip (Esc)" pill at bottom-center ── */}
      <button
        type="button"
        onClick={stopAndRevealAll}
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          background: 'rgba(15, 18, 26, 0.9)',
          color: '#e2e8f0',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 9999,
          padding: '6px 14px',
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'Inter, system-ui, sans-serif',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
          cursor: 'pointer',
        }}
      >
        Skip (Esc)
      </button>
    </div>
  )
}

export default SwarmBoxOverlay
