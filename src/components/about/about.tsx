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

interface Job {
  id: string,
  role: string,
  firm: string,
  description: React.ReactNode, 
  startDate: string,
  duration: string,
}

const EXPERIENCES: Job[] = [
  {
    id: 'dt-poland',
    role: 'Software & QA Intern',
    firm: 'Digital Technology Poland',
    duration: 'March 2025 - April 2025', 
    startDate: '2025-03',
    description: (
      <>
        Engineered Digital Twin solutions for the industrial energy sector. Automated end-to-end testing pipelines using <strong>Playwright</strong> and architected robust hardware data flows, focusing heavily on system regression metrics and fault-tolerant architectures.
      </>
    )
  },
  {
    id: 'zzoz-hospital',
    role: 'Mobile App Developer Intern',
    firm: 'Zespół Zakładów Opieki Zdrowotnej',
    duration: 'May 2024 - Jun 2024',
    startDate: '2024-05',
    description: (
      <>
        Architected and deployed a custom mobile application from scratch to digitalize medical equipment tracking at a local hospital. Conducted user-centric interviews with healthcare staff to optimize UX, eliminating data-entry bottlenecks and ensuring high-performance querying across thousands of inventory items.
      </>
    )
  }
]

function ExperienceItem({ job }: { job: Job }) {
  return (
    <div className="experience-item">
      <div className="experience-header">
        <div className="exp-title-row">
          <span className="exp-role">{job.role}</span>
          <span className="exp-duration">{job.duration}</span>
        </div>
        <span className="exp-firm">@ {job.firm}</span>
      </div>
      <p className="card-body-text">{job.description}</p>
    </div>
  )
}

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

  const sortedExperiences = [...EXPERIENCES].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section className="about section-wrapper" id="about" ref={ref}>
      <div className="section-centered-header">
        <p className="section-tag">about.tsx - export default About</p>
        <h2 className="section-display-title">About <span className="marked">Me</span></h2>
      </div>

      <div className="about-layout-container">
        <div className="about-stats-row">
          {STATS.map((stat, _) => {
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
            <p className="card-comment-tag">/** approach **/</p>
            <p className="card-body-text">
              I choose to work on complex optimization problems where efficiency isn't just a bonus, but a strict requirement.
              My goal is always to build clean, predictable software with a deep understanding of the underlying hardware, preferring direct control over layered abstractions.
            </p>
          </motion.div>

          <motion.div className="about-card" {...fadeUp(0.2)}>
            <p className="card-comment-tag">/** commercial experience **/</p>
            {sortedExperiences.map((job, index) => (
              <ExperienceItem key={index} job={job} />
            ))}
          </motion.div>

          <motion.div className="about-card" {...fadeUp(0.3)}>
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