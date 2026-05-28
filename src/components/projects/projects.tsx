import './projects.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type DomainCategory = 'All' | 'Games' | 'Systems' | 'Web & Mobile'

type Project = {
  name:        string
  filename:    string
  langColor:   string
  description: string
  image:       string
  link?:       string
  tags:        string[]
  languages:   string[]
  domain:      DomainCategory
  size:        'featured' | 'wide' | 'normal' | 'tall'
}

const PROJECTS: Project[] = [
  {
    name:        '3D Model Inspector',
    filename:    'model_inspector.cpp',
    langColor:   '#659AD2',
    description: 'OpenGL-based tool to import OBJ files and inspect 3D models from any angle. Implements PBR, directional, and point lighting with a custom shader pipeline.',
    image:       './image1.png',
    link:        'https://github.com/lShanterl/3D-Model-Inspector',
    tags:        ['OpenGL', 'PBR Shaders', '3D Graphics'], 
    languages:   ['C++'],
    domain:      'Systems',
    size:        'featured',
  },
  {
    name:        'Stocktaking App',
    filename:    'stocktaking.kt',
    langColor:   '#F18E33',
    description: 'Android inventory management app deployed at a local hospital. Replaced a paper-based process - saving staff time and reducing transcription errors.',
    image:       './stocktaking-app.png',
    tags:        ['Android SDK', 'B2B Tool', 'Healthcare'],
    languages:   ['Kotlin'],
    domain:      'Web & Mobile',
    size:        'tall',
  },
  {
    name:        'Flowspark',
    filename:    'cinema.php',
    langColor:   '#8892BF',
    description: 'Full cinema website with admin panel, seat reservation system, and movie management. Built with a PHP backend and MySQL.',
    image:       './flowspark.png',
    tags:        ['MySQL', 'E-Commerce', 'Full-Stack'],
    languages:   ['PHP'],
    domain:      'Web & Mobile',
    size:        'normal',
  },
  {
    name:        'Raspberry Pico Console',
    filename:    'pico_console.c',
    langColor:   '#A8B5C2',
    description: 'DIY gaming console on a Pi Pico. Includes Flappy Bird, a 2.5D labyrinth, and a modular game loader. Custom PCB designed by a collaborator.',
    image:       './shamino_console.jpg',
    tags:        ['Hardware', 'Bare-Metal', 'Custom PCB'],
    languages:   ['C++'],
    domain:      'Systems',
    size:        'featured',
  },
  {
    name:        'Real-Time Strategy',
    filename:    'rts.cpp',
    langColor:   '#3A7BD5',
    description: 'Unreal Engine 5 RTS with procedural map generation and village-building mechanics. Paused WIP.',
    image:       './image2.png',
    tags:        ['Unreal Engine 5', 'Procedural Gen', 'WIP'],
    languages:   ['C++'],
    domain:      'Games',
    size:        'normal',
  },
  {
    name:        '2048',
    filename:    'b2048.cpp',
    langColor:   '#F18E33',
    description: 'Classic 2048 re-implemented in C++ with OpenGL rendering. Midterm project - focused on clean state management and smooth tile animations.',
    image:       './2048.png',
    tags:        ['OpenGL', 'State Machine', 'Classic Arcade'],
    languages:   ['C++'],
    domain:      'Games',
    size:        'normal',
  },
  {
    name:        'Gravity Assist',
    filename:    'gravity_assist.gd',
    langColor:   '#478CBF',
    description: 'GMTK 2024 game-jam entry. Use your planet-sized gravity cannon to collect canisters. Made in 48 hours - shipped on time, which is its own achievement.',
    image:       './gravity_assist.png',
    link:        'https://itch.io/jam/gmtk-2024/rate/2915526',
    tags:        ['Godot Engine', 'Physics Jam', '2D Gameplay'],
    languages:   ['GDScript'],
    domain:      'Games',
    size:        'wide',
  },
  {
    name:        'Lucario Engine',
    filename:    'voxel_world.rs',
    langColor:   '#e07639',
    description: 'Threaded chunk-loading 3D procedural voxel world generator with biomes and simple physics. Built in Rust with a custom Vulkan renderer.',
    image:       './lucario_engine.png',
    tags:        ['Vulkan API', 'Voxel Engine', 'Multithreading'],
    languages:   ['Rust'],
    domain:      'Systems',
    size:        'featured',
    link:        'https://github.com/lShanterl/LucarioEngine',
  },
  {
    name:        'Vinted Scraper',
    filename:    'vinted_scraper.py',
    langColor:   '#FFD43B',
    description: 'Processes Vinted API data to generate detailed sales insights and revenue statistics. Python backend with TypeScript for interactive data visualizations.',
    image:       './vinted.png',
    tags:        ['Data Scraping', 'TypeScript UI', 'Analytics'],
    languages:   ['Python', 'TypeScript'],
    domain:      'Web & Mobile',
    size:        'normal',
  },
  {
    name:        'Chip-8 Emulator',
    filename:    'chip8_emulator.cpp',
    langColor:   '#2d9951',
    description: 'A complete Chip-8 emulator in C++ with an SDL2 frontend. Passes all standard test ROMs - a classic exercise in understanding how CPUs actually work.',
    image:       './chip8.png',
    tags:        ['SDL2 Graphics', 'Low-Level Dev'],
    languages:   ['C++'],
    domain:      'Systems',
    size:        'normal',
    link:        'https://github.com/lShanterl/chip8_emulator',
  },
]

const DOMAINS: DomainCategory[] = ['All', 'Games', 'Systems', 'Web & Mobile']

export default function Projects() {
  const [activeDomain, setActiveDomain] = useState<DomainCategory>('All')
  const [activeLang, setActiveLang] = useState<string>('All')

  const availableLanguages = ['All', ...Array.from(
    new Set(PROJECTS.flatMap(p => p.languages))
  )]

  const filteredProjects = PROJECTS.filter(p => {
    const matchesDomain = activeDomain === 'All' || p.domain === activeDomain
    const matchesLang = activeLang === 'All' || p.languages.includes(activeLang)
    return matchesDomain && matchesLang
  })

  return (
    <section className="projects-section" id="projects">
      <div className="section-centered-header">
        <p className="section-tag">projects.rs — pub mod portfolio</p>
        <h2 className="section-display-title">
          Things I've <span className="marked">shipped</span>
        </h2>
      </div>

      <div className="filters-container">
        <div className="projects-filter-row">
          {DOMAINS.map(domain => (
            <button
              key={domain}
              className={`filter-chip${activeDomain === domain ? ' filter-chip--active' : ''}`}
              onClick={() => { setActiveDomain(domain); setActiveLang('All'); }}
            >
              {domain === 'All' ? 'all_categories' : domain.toLowerCase().replace(' & ', '_')}
            </button>
          ))}
        </div>

        <div className="projects-filter-row sub-row">
          {availableLanguages.map(lang => {
            const hasProjectsInCurrentDomain = PROJECTS.some(p => 
              (activeDomain === 'All' || p.domain === activeDomain) && p.languages.includes(lang)
            )
            if (!hasProjectsInCurrentDomain && lang !== 'All') return null

            return (
              <button
                key={lang}
                className={`filter-chip sub-chip${activeLang === lang ? ' filter-chip--active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang === 'All' ? 'all_src' : lang.toLowerCase()}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="bento-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div
              key={p.name}
              className={`pcard ${p.size}`}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
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

              <div className="pcard-img-container">
                <img src={p.image} alt={p.name} loading="lazy" />
                <div className="pcard-overlay">
                  <p className="pcard-desc">{p.description}</p>
                  {p.link && (
                    <a className="pcard-open-btn" href={p.link} target="_blank" rel="noreferrer">
                      src_code ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="pcard-footer">
                <div className="pcard-footer-meta">
                  <span className="pcard-name">{p.name}</span>
                </div>
                <div className="pcard-tags">
                  {p.tags.map(t => (
                    <span className="pcard-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {activeDomain === 'All' && activeLang === 'All' && (
            <motion.div layout className="pcard future-card">
              <div className="future-text">
                <strong>+ more soon</strong>
                Constantly building something new.<br />
                Check GitHub for experiments.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}