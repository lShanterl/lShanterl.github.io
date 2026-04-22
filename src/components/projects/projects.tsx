import './projects.css'
import { motion } from 'framer-motion'

type Project = {
  name:        string
  filename:    string
  langColor:   string
  description: string
  image:       string
  link?:       string
  tags:        string[]
  size:        'featured' | 'wide' | 'normal'
}

const PROJECTS: Project[] = [
  {
    name:        '3D Model Inspector',
    filename:    'model_inspector.cpp',
    langColor:   '#659AD2',
    description: 'OpenGL-based tool to import OBJ files, inspect 3D models from any angle with customizable lighting — PBR, directional, point lights.',
    image:       './image1.png',
    link:        'https://github.com/lShanterl/3D-Model-Inspector',
    tags:        ['C++', 'OpenGL', 'OBJ'],
    size:        'featured',
  },
  {
    name:        'Raspberry Pico Console',
    filename:    'pico_console.c',
    langColor:   '#A8B5C2',
    description: 'DIY gaming console on a Pi Pico — includes Flappy Bird and a modular game loader.',
    image:       './shamino_console.jpg',
    tags:        ['C', 'Embedded', 'Pico'],
    size:        'normal',
  },
  {
    name:        'Gravity Assist',
    filename:    'gravity_assist.gd',
    langColor:   '#478CBF',
    description: 'GMTK 2024 game-jam entry. Collect canisters with your PLANET-SIZE-INATOR.',
    image:       './gravity_assist.png',
    link:        'https://itch.io/jam/gmtk-2024/rate/2915526',
    tags:        ['Godot', 'GDScript', 'Jam'],
    size:        'normal',
  },
  {
    name:        'Procedural World',
    filename:    'worldgen.gd',
    langColor:   '#478CBF',
    description: 'Threaded chunk-loading 3D procedural world generator in Godot Engine.',
    image:       './procedurally-generated-world.png',
    tags:        ['Godot', '3D', 'Noise'],
    size:        'wide',
  },
  {
    name:        'Flowspark',
    filename:    'cinema.php',
    langColor:   '#8892BF',
    description: 'Full cinema website: admin panel, reservation system, movie management.',
    image:       './flowspark.png',
    tags:        ['PHP', 'Web', 'MySQL'],
    size:        'normal',
  },
  {
    name:        'Stocktaking App',
    filename:    'stocktaking.kt',
    langColor:   '#F18E33',
    description: 'Mobile inventory app for a local hospital — saves time and resources.',
    image:       './stocktaking-app.png',
    tags:        ['Kotlin', 'Android', 'Mobile'],
    size:        'normal',
  },
  {
    name:        'Real-Time Strategy',
    filename:    'rts.cpp',
    langColor:   '#3A7BD5',
    description: 'Unreal Engine 5 RTS — procedural map, village building. In progress.',
    image:       './image2.png',
    tags:        ['UE5', 'C++', 'WIP'],
    size:        'normal',
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function PCard({ p, delay }: { p: Project; delay: number }) {
  return (
    <motion.div
      className={`pcard ${p.size}`}
      {...fadeUp(delay)}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="pcard-tab">
        <span className="pcard-dot" style={{ background: p.langColor }} />
        <span className="pcard-filename">{p.filename}</span>
        <span className="pcard-spacer" />
        {p.link && (
          <a className="pcard-link-icon" href={p.link} target="_blank" rel="noreferrer">
            ↗ open
          </a>
        )}
      </div>

      <div className="pcard-img">
        <img src={p.image} alt={p.name} />
        <div className="pcard-overlay">
          <p className="pcard-desc">{p.description}</p>
          {p.link && (
            <a className="pcard-open" href={p.link} target="_blank" rel="noreferrer">
              View project ↗
            </a>
          )}
        </div>
      </div>

      <div className="pcard-footer">
        <span className="pcard-name">{p.name}</span>
        <div className="pcard-tags">
          {p.tags.map(t => (
            <span className="pcard-tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="projects section-wrapper" id="projects">
      <motion.div className="projects-header" {...fadeUp(0)}>
        <p className="projects-tag">projects.rs — pub mod portfolio</p>
        <h2 className="projects-title">
          Things I've<br />
          <span className="marked">shipped</span>
        </h2>
      </motion.div>

      <div className="bento">
        {PROJECTS.map((p, i) => (
          <PCard key={p.name} p={p} delay={0.05 + i * 0.06} />
        ))}

        <motion.div className="pcard future" {...fadeUp(0.5)}>
          <div className="future-text">
            <strong>+ more soon</strong>
            Constantly building something new.<br />
            Check GitHub for experiments.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
