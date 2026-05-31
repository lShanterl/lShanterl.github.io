import './skills.css'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

type Skill = { name: string; img: string }

const CATEGORIES: { title: string; importStr: string; skills: Skill[] }[] = [
  {
    title: 'Languages',
    importStr: "import { cpp, rust, typescript, kotlin, csharp, python, golang } from '@shanter/languages'",
    skills: [
      { name: 'C++',        img: './cpp.svg'        },
      { name: 'Rust',       img: './rust.svg'       },
      { name: 'TypeScript', img: './typescript.svg' },
      { name: 'Kotlin',     img: './kotlin.svg'     },
      { name: 'C#',         img: './csharp.svg'     },
      { name: 'Python',     img: './python.svg'     },
      { name: 'Go',         img: './golang.svg'     },
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
      { name: 'Photoshop',    img: './photoshop.svg' },
      { name: 'Fusion 360',    img: './fusion360.svg' },
      { name: 'Blender',    img: './blender.svg' },
      { name: 'Git',           img: './git.svg'        },
      { name: 'Docker',        img: './docker.svg'     },
      { name: 'Playwright',    img: './playwright.svg' },
      { name: 'Bare Metal',    img: './microchip.svg'  },
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

export default function Skills() {
  return (
    <section className="skills section-wrapper" id="skills">
      <div className="section-centered-header">
        <p className="section-tag">skills.cpp - tech_stack::config</p>
        <h2 className="section-display-title">Technical <span className="marked">Stack</span></h2>
      </div>

      <div className="skills-layout-container">
        <motion.div className="skills-focus-banner" {...fadeUp(0.1)}>
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
              {...fadeUp(0.15 + ci * 0.08)}
            >
              <div className="ide-card-header">
                <div className="ide-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="ide-tab-title"><ImportLine raw={cat.importStr} /></div>
              </div>
              <div className="ide-card-body">
                {cat.skills.map((sk, si) => (
                  <motion.div
                    className="skill-item-badge"
                    key={sk.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: si * 0.03 }}
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