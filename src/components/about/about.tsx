import './about.css'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { fadeUp } from '../../utils/animations'

const STATS = [
  { value: '5+',   label: 'years_of_coding',          suffix: '+', num: 5   },
  //{ value: '19',   label: 'years_old // v2.0.07',     suffix: '',  num: 19  },
  { value: '0',    label: 'undefined_behavior',       suffix: '',  num: 0   },
  { value: '50k+', label: 'lines_of_code_debugged',   suffix: 'k+',num: 50  },
  { value: '10+', label: 'personal_projects', suffix: '+', num: 10 },
  { value: '∞',    label: 'curiosity.level',          suffix: '∞', num: -1  },
]

const INTERESTS = [
  'Embedded Systems', 'Game Dev', "3D Graphics",
  'Volleyball', 'Science', "Debugging Complexity"
]

function useCountUp(num: number, active: boolean, duration = 1300) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active || num <= 0) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      setDisplay(Math.floor(t * num))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [num, active, duration])
  return display
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="about section-wrapper" id="about" ref={ref}>
      <div className="section-centered-header">
        <p className="section-tag">about.tsx - export default About</p>
        <h2 className="section-display-title">About <span className="marked">Me</span></h2>
      </div>

      <div className="about-layout-container">
        <div className="about-stats-row">
          {STATS.map((stat, i) => {
            const count = useCountUp(stat.num, isInView)
            return (
              <div className="stat-node" key={stat.label}>
                <span className="stat-node-val">
                  {stat.num === -1 ? stat.value : `${count}${stat.suffix}`}
                </span>
                <span className="stat-node-lbl">{stat.label}</span>
              </div>
            )
          })}
        </div>

        <div className="about-text-grid">
          <motion.div className="about-card" {...fadeUp(0.1)}>
            <p className="card-comment-tag">/** background **/</p>
            <p className="card-body-text">
              I specialize in writing close-to-the-metal software where memory safety and execution speed 
              are non-negotiable—primarily in <strong>C++</strong> and <strong>Rust</strong>.
              My work centers on bare-metal development for microcontrollers, custom 3D graphics engines,
              and optimizing system components beneath traditional abstraction layers.
            </p>
          </motion.div>

          <motion.div className="about-card" {...fadeUp(0.2)}>
            <p className="card-comment-tag">/** commercial experience **/</p>
            <div className="experience-header">
              <span className="exp-role">Software & QA Intern</span>
              <span className="exp-firm">@ Digital Technology Poland</span>
            </div>
            <p className="card-body-text">
              Engineered Digital Twin solutions for the industrial energy sector. Automated end-to-end testing pipelines using <strong>Playwright </strong>
              and architected robust hardware data flows, focusing heavily on system regression metrics and fault-tolerant architectures.
            </p>
          </motion.div>

          <motion.div className="about-card span-full" {...fadeUp(0.3)}>
            <p className="card-comment-tag">/** core interests **/</p>
            <div className="interests-pill-box">
              {INTERESTS.map(tag => (
                <span className="interest-pill" key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}