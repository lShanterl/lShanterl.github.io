import { useCustomCursor } from './hooks/useCustomCursor'
import { useInkSpot } from './hooks/useInkSpot'
import './App.css'
import Navbar   from './components/navbar/navbar'
import Hero     from './components/hero/hero'
import About    from './components/about/about'
import Skills   from './components/skills/skills'
import Projects from './components/projects/projects'
import Footer   from './components/footer/footer'
import { useEasterEggs } from './hooks/useEasterEggs'
import Toast from './components/toast/toast'
import Bsod from './components/bsod/bsod'

function App() {
  const { dotRef, ringRef } = useCustomCursor()
  useInkSpot(dotRef, ringRef)
  useEasterEggs()
  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />

      <div className="App">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Footer />
        <Toast />
        <Bsod />
      </div>
    </>
  )
}

export default App