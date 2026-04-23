import './skills.css'
import { motion } from 'framer-motion'

type Skill = { name: string; img: string }

const CATEGORIES: { title: string; importStr: string; skills: Skill[] }[] = [
  {
    title: 'Languages',
    importStr: 'import { cpp, rust, typescript, kotlin, csharp, python } from \'@shanter/languages\'',
    skills: [
      { name: 'C++',        img: './cpp.svg'        },
      { name: 'Rust',       img: './rust.svg'       },
      { name: 'TypeScript', img: './typescript.svg' },
      { name: 'C#',         img: './csharp.svg'     },
      { name: 'Kotlin',     img: './kotlin.svg'     },
      { name: 'JavaScript', img: './javascript.svg' },
      { name: 'Python',     img: './python.svg'     },
    ],
  },
  {
    title: 'Graphics & Game Dev',
    importStr: 'import { opengl, unity, godot, unreal, blender } from \'@shanter/gamedev\'',
    skills: [
      { name: 'OpenGL',        img: './opengl.svg'  },
      { name: 'Unity',         img: './unity.svg'   },
      { name: 'Godot',         img: './godot.svg'   },
      { name: 'Unreal Engine', img: './unreal.svg'  },
      { name: 'Blender',       img: './blender.svg' },
    ],
  },
  {
    title: 'Tools & Frameworks',
    importStr: 'import { react, git, figma, photoshop } from \'@shanter/tools\'',
    skills: [
      { name: 'React',      img: './react.svg'      },
      { name: 'Git',        img: './git.svg'        },
      { name: 'Figma',      img: './figma.svg'      },
      { name: 'Photoshop',  img: './photoshop.svg'  },
    ],
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function ImportLine({ raw }: { raw: string }) {
  const match = raw.match(/^import \{ (.+) \} from ('.*')$/)
  if (!match) return <span className="skill-import">{raw}</span>

  const names = match[1].split(', ')
  const path  = match[2]

  return (
    <div className="skill-import">
      <span className="si-kw">import</span>
      <span className="si-brace"> {'{ '}</span>
      {names.map((n, i) => (
        <span key={n}>
          <span className="si-name">{n}</span>
          {i < names.length - 1 && <span className="si-brace">, </span>}
        </span>
      ))}
      <span className="si-brace">{' }'}</span>
      <span className="si-kw"> from </span>
      <span className="si-path">{path}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="skills section-wrapper" id="skills">
      <motion.div {...fadeUp(0)}>
        <p className="skills-tag">skills.cpp - tech_stack::config</p>
        <h2 className="skills-title">
          What I work<br />
          <span className="marked">with</span>
        </h2>
      </motion.div>

      <motion.div className="skills-desc" {...fadeUp(0.1)}>
        I specialize in Memory-Safe Systems <strong>Rust</strong> and High-Performance <strong>C++</strong>. 
        From understanding of the graphics pipeline to architecting complex game logic in Godot and Unreal Engine. 
        My experience in <strong>Industry 4.0 Digital Twins and Healthcare IT</strong> has taught me to write code where <strong>"it works on my machine"</strong> isn't an acceptable answer.
      </motion.div>

      {CATEGORIES.map((cat, ci) => (
        <motion.div className="skill-category" key={cat.title} {...fadeUp(0.1 + ci * 0.1)}>
          <ImportLine raw={cat.importStr} />
          <div className="skill-icons">
            {cat.skills.map((sk, si) => (
              <motion.div
                className="skill-chip"
                key={sk.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 + si * 0.05 }}
              >
                <img src={sk.img} alt={sk.name} />
                {sk.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  )
}
