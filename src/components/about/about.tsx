import './about.css'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import type { Variants } from 'framer-motion'

const STATS = [
  { value: '5+',   label: 'years_of_coding',          suffix: '+', num: 5   },
  { value: '0',    label: 'undefined_behavior',       suffix: '',  num: 0   },
  { value: '50k+', label: 'lines_of_code_debugged',   suffix: 'k+',num: 50  },
  { value: '10+',  label: 'personal_projects',        suffix: '+', num: 10  },
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

function ExperienceItem({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      className="experience-item"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <div className="experience-header">
        <div className="exp-title-row">
          <span className="exp-role">{job.role}</span>
          <span className="exp-duration">{job.duration}</span>
        </div>
        <span className="exp-firm">@ {job.firm}</span>
      </div>
      <p className="card-body-text">{job.description}</p>
    </motion.div>
  )
}

function useCountUp(num: number, active: boolean, duration = 1400) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active || num <= 0) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.floor(eased * num))
      if (t < 1) requestAnimationFrame(tick)
      else setDisplay(num)
    }
    requestAnimationFrame(tick)
  }, [num, active, duration])
  return display
}

function StatNode({ stat, index, active }: { stat: typeof STATS[0]; index: number; active: boolean }) {
  const count = useCountUp(stat.num, active)

  return (
    <motion.div
      className="stat-node"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.2, 0.64, 1],
        delay: index * 0.07
      }}
      whileHover={{
        scale: 1.04,
        borderColor: 'rgba(168, 85, 247, 0.5)',
        boxShadow: '0 0 24px rgba(147, 51, 234, 0.18)',
        transition: { type: 'spring', stiffness: 400, damping: 22 }
      }}
    >
      <motion.span
        className="stat-node-val"
        transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: 'easeInOut' }}
      >
        {stat.num === -1 ? stat.value : `${count}${stat.suffix}`}
      </motion.span>
      <span className="stat-node-lbl">{stat.label}</span>
    </motion.div>
  )
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay,
    }
  })
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sortedExperiences = [...EXPERIENCES].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section className="about section-wrapper" id="about" ref={ref}>
      <motion.div
        className="section-centered-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-tag">about.tsx - export default About</p>
        <h2 className="section-display-title">About <span className="marked">Me</span></h2>
      </motion.div>

      <div className="about-layout-container">
        <div className="about-stats-row">
          {STATS.map((stat, i) => (
            <StatNode key={stat.label} stat={stat} index={i} active={isInView} />
          ))}
        </div>

        <div className="about-text-grid">
          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.05}
            whileHover={{ borderColor: 'rgba(168, 85, 247, 0.35)', transition: { duration: 0.2 } }}
          >
            <p className="card-comment-tag">/** approach **/</p>
            <p className="card-body-text">
              I choose to work on complex optimization problems where efficiency isn't just a bonus, but a strict requirement.
              My goal is always to build clean, predictable software with a deep understanding of the underlying hardware, preferring direct control over layered abstractions.
            </p>
          </motion.div>

          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.15}
            whileHover={{ borderColor: 'rgba(168, 85, 247, 0.35)', transition: { duration: 0.2 } }}
          >
            <p className="card-comment-tag">/** commercial experience **/</p>
            {sortedExperiences.map((job, index) => (
              <ExperienceItem key={job.id} job={job} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.25}
            whileHover={{ borderColor: 'rgba(168, 85, 247, 0.35)', transition: { duration: 0.2 } }}
          >
            <p className="card-comment-tag">/** core interests **/</p>
            <motion.div
              className="interests-pill-box"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
            >
              {INTERESTS.map(tag => (
                <motion.span
                  className="interest-pill"
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 8 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 20 } }
                  }}
                  whileHover={{ 
                    borderColor: 'rgba(168, 85, 247, 0.5)', 
                    color: 'var(--purple-light)',
                    scale: 1.05,
                    transition: { duration: 0.15 }
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}