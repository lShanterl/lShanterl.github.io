import './skills.css'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'


type Skill = { name: string; img: string }

const CATEGORIES: { title: string; importStr: string; skills: Skill[] }[] = [
  {
    title: 'Languages',
    importStr: "import { cpp, rust, typescript, kotlin, csharp, python } from '@shanter/languages'",
    skills: [
      { name: 'C++',        img: './cpp.svg'        },
      { name: 'Rust',       img: './rust.svg'       },
      { name: 'TypeScript', img: './typescript.svg' },
      { name: 'Kotlin',     img: './kotlin.svg'     },
      { name: 'C#',         img: './csharp.svg'     },
      { name: 'Python',     img: './python.svg'     },
    ],
  },
  {
    title: 'Graphics & Game Dev',
    importStr: "import { opengl, unity, godot, unreal, blender } from '@shanter/gamedev'",
    skills: [
      { name: 'OpenGL',        img: './opengl.svg'  },
      { name: 'Unity',         img: './unity.svg'   },
      { name: 'Godot',         img: './godot.svg'   },
      { name: 'Unreal Engine', img: './unreal.svg'  },
      { name: 'Blender',       img: './blender.svg' },
    ],
  },
  {
    title: 'Embedded & Infrastructure',
    importStr: "import { photoshop, fusion360, blender, git, docker, playwright, bare_metal } from '@shanter/tools'",
    skills: [
      { name: 'Photoshop',  img: './photoshop.svg' },
      { name: 'Fusion 360', img: './fusion360.svg' },
      { name: 'Blender',    img: './blender.svg'   },
      { name: 'Git',        img: './git.svg'        },
      { name: 'Docker',     img: './docker.svg'     },
      { name: 'Playwright', img: './playwright.svg' },
      { name: 'Bare Metal', img: './microchip.svg'  },
    ],
  },
]

function ImportLine({ raw }: { raw: string }) {
  const match = raw.match(/^(import\s+.*?from\s+)(['"].*?['"])$/)
  if (!match) return <span className="skill-import">{raw}</span>
  return (
    <span className="skill-import">
      <span className="keyword">import</span>&nbsp;
      <span className="braces">{"{"}</span>&nbsp;
      <span className="variables">{raw.substring(8, raw.indexOf('}'))}</span>
      <span className="braces">{"}"}</span>&nbsp;
      <span className="keyword">from</span>&nbsp;
      <span className="string">{match[2]}</span>
    </span>
  )
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1
    }
  })
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 360,
      damping: 22,
      delay: i * 0.04
    }
  })
}

export default function Skills() {
  return (
    <section className="skills section-wrapper" id="skills">
      <motion.div
        className="section-centered-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-tag">skills.cpp - tech_stack::config</p>
        <h2 className="section-display-title">Technical <span className="marked">Stack</span></h2>
      </motion.div>

      <div className="skills-layout-container">
        <motion.div
          className="skills-focus-banner"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <span className="banner-eyebrow">#define FOCUS</span>
          <p className="banner-text">
            Writing deterministic, low-overhead code by eliminating heavy runtimes and minimizing cache misses via data-oriented design.
            I focus on bridging the gap between strict hardware constraints and software execution to keep critical systems stable.
          </p>
        </motion.div>

        <div className="skills-modules-list">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              className="skill-ide-card"
              key={cat.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={ci}
            >
              <div className="ide-card-header">
                <div className="ide-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="ide-tab-title">
                  <ImportLine raw={cat.importStr} />
                </div>
              </div>
              <div className="ide-card-body">
                {cat.skills.map((sk, si) => (
                  <motion.div
                    className="skill-item-badge"
                    key={sk.name}
                    variants={badgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={si}
                    whileHover={{
                      y: -3,
                      scale: 1.04,
                      borderColor: 'rgba(168, 85, 247, 0.6)',
                      boxShadow: '0 4px 18px rgba(147, 51, 234, 0.2)',
                      transition: { type: 'spring', stiffness: 450, damping: 22 }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img src={sk.img} alt={sk.name} className="badge-icon" />
                    <span className="badge-name">{sk.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}