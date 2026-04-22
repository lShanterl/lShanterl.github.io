import './about.css'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const STATS = [
  { value: '5+',  label: 'years_of_coding' },
  { value: '19',  label: 'years_old'        },
  { value: '7+',  label: 'shipped_projects' },
  { value: '100k+',  label: 'lines_of_code_debugged' },
  { value: '∞',   label: 'curiosity.level'  },
]

const INTERESTS = [
  'C++', 'Game Dev', 'Rust', 'OpenGL', 'Godot', "Embedded Systems",
  'Unreal Engine', 'Blender', 'Volleyball', 'Science', "Seg-faults",
]

export default function About() {
  return (
    <section className="about section-wrapper" id="about">
      <motion.div className="about-header" {...fadeUp(0)}>
        <p className="about-tag">about.tsx — export default About</p>
        <h2 className="about-title">
          A bit about<br />
          <span className="marked">me</span>
        </h2>
      </motion.div>

      <div className="about-grid">
        <div className="about-stats">
          {STATS.map((s, i) => (
            <motion.div className="stat-card" key={s.label} {...fadeUp(0.1 + i * 0.07)}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="about-bio">
          <motion.div className="bio-block" {...fadeUp(0.15)}>
            <p className="bio-block-tag">intro</p>
            <p>
              I'm <strong>Bartosz Starzyk</strong>, a Software Developer focused on bridging the gap between hardware and high-performance software.
               I’ve been crafting code since 2020, evolving from simple scripts to production-ready systems for the medical and energy sectors even.
            </p>
          </motion.div>

          <motion.div className="bio-block" {...fadeUp(0.22)}>
            <p className="bio-block-tag">what I build</p>
            <p>
              My core lies in <strong>low-level systems</strong> and{' '}
              <strong>game development</strong> optimize memory management in C++, 
              and develop embedded systems on RP2040. When I'm not in the weeds of C++,
               I architect cross-platform mobile apps in Kotlin and scalable web tools..
            </p>
          </motion.div>

          <motion.div className="bio-block" {...fadeUp(0.36)}>
            <p className="bio-block-tag">industrial experience</p>
            <p><strong>Software & QA Intern @ Digital Technology Poland</strong> <br />
            Worked on Digital Twin solutions for the energy sector. I was responsible for automating E2E testing pipelines using <strong>Playwright</strong> and integrating E-CAD/CAD data flows. This role sharpened my focus on Industry 4.0 standards, regression testing, and high-reliability software architectures.
          </p>
          </motion.div>
            

          <motion.div className="bio-block" {...fadeUp(0.29)}>
            <p className="bio-block-tag">interests</p>
            <div className="about-tags">
              {INTERESTS.map(tag => (
                <span className="about-tag-pill" key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}
