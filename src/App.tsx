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
      </div>
    </>
  )
}

export default App