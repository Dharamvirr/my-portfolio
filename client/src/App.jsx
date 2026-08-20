import { useState, useEffect, lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'

// ─── Lazy-load heavy sections for code splitting ──────────────────────────────
const Hero         = lazy(() => import('./components/Hero'))
const About        = lazy(() => import('./components/About'))
const Experience   = lazy(() => import('./components/Experience'))
const Projects     = lazy(() => import('./components/Projects'))
const Skills       = lazy(() => import('./components/Skills'))
const Achievements = lazy(() => import('./components/Achievements'))
const Contact      = lazy(() => import('./components/Contact'))
const Footer       = lazy(() => import('./components/Footer'))

// Minimal spinner shown while a section chunk loads
const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-7 h-7 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
  </div>
)

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#4ade80', secondary: '#0a0a0a' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#0a0a0a' } },
        }}
      />
      <Navbar />

      {/* Skip to content — accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Suspense fallback={<SectionFallback />}><Hero /></Suspense>
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Achievements /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
      <BackToTop />
    </div>
  )
}

export default App
