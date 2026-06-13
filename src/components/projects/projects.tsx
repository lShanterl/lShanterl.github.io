import './projects.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Variants } from 'framer-motion'

type DomainCategory = 'All' | 'Games' | 'Systems' | 'Web & Mobile'

type Project = {
  name:        string
  filename:    string
  langColor:   string
  description: string
  detail?:     string
  image:       string
  imgPosition?: string
  link?:       string
  tags:        string[]
  languages:   string[]
  domain:      DomainCategory
  size:        'featured' | 'wide' | 'normal'
  role?:       string
  metric?:     { label: string; value: string }
  year:        string 
}

const PROJECTS: Project[] = [
  {
    name:        'Chip-8 Emulator',
    filename:    'chip8_emulator.cpp',
    langColor:   '#2d9951',
    description: 'Complete Chip-8 emulator in C++ with an SDL2 frontend. Passes all standard test ROMs.',
    detail:      'Implements all 35 opcodes including the ambiguous shift and load behaviours, with a config flag to toggle between original COSMAC VIP and CHIP-48 behaviour.',
    image:       './chip8.png',
    imgPosition: 'center',
    link:        'https://github.com/lShanterl/chip8_emulator',
    tags:        ['SDL2', 'Low-Level', 'Emulation'],
    languages:   ['C++'],
    domain:      'Systems',
    size:        'normal',
    role:        'Emulator engineer',
    metric:      { label: 'Test ROMs', value: '100% pass' },
    year:        '2026',
  },
  {
    name:        'Vinted Scraper',
    filename:    'vinted_scraper.py',
    langColor:   '#b8a357',
    description: 'Processes Vinted API data into detailed sales insights and revenue statistics, with a TypeScript frontend for interactive visualizations.',
    detail:      'The Python backend handles rate-limiting, pagination, and deduplication automatically. Outputs feed a TypeScript dashboard with filterable charts for category, price range, and sell-through rate.',
    image:       './vinted.png',
    imgPosition: 'top',
    languages:   ['Python', 'TypeScript'],
    domain:      'Web & Mobile',
    size:        'normal',
    role:        'Data engineer',
    metric:      { label: 'Pipeline', value: 'Automated' },
    tags:        ['Web Scraping', 'Dashboard'],
    year:        '2026',
  },
  {
    name:        'Lucario Engine',
    filename:    'voxel_world.rs',
    langColor:   '#e07639',
    description: 'Procedural voxel world engine in Rust with a custom Vulkan renderer, greedy meshing, and multi-threaded chunk generation.',
    detail:      'Greedy meshing collapses coplanar faces into single quads, cutting draw calls dramatically. Chunks generate on a thread pool; distance fog hides pop-in so the world feels infinite.',
    image:       './lucario_engine.png',
    imgPosition: 'center',
    link:        'https://github.com/lShanterl/LucarioEngine',
    tags:        ['Vulkan API', 'Voxel Engine', 'Multithreading'],
    languages:   ['Rust'],
    domain:      'Systems',
    size:        'featured',
    role:        'Engine architect',
    metric:      { label: 'Mesh batching', value: 'Greedy algo' },
    year:        '2025–present',
  },
  {
    name:        'Raspberry Pico Console',
    filename:    'pico_console.c',
    langColor:   '#A8B5C2',
    description: 'Bare-metal DIY retro console on RP2040. Custom state matrix loader, low-latency display buffer routines, and live 2.5D maze rendering.',
    detail:      'No OS, no HAL - direct register writes for display, input, and audio. The 2.5D renderer uses raycasting inspired by early Wolfenstein, rewritten for the Pico\'s architecture. PCB made by a friend of mine.',
    image:       './shamino_console.jpg',
    imgPosition: 'center',        
    tags:        ['Hardware', 'Bare-Metal', 'Custom PCB'],
    languages:   ['C++'],
    domain:      'Systems',
    size:        'featured',
    role:        'Hardware & firmware engineer',
    metric:      { label: 'Modularity', value: 'High' },
    year:        '2024–2025',
    link: 'https://github.com/lShanterl/PicoConsole'
  },

  // {
  //   name:        'Real-Time Strategy',
  //   filename:    'rts.cpp',
  //   langColor:   '#3A7BD5',
  //   description: 'Unreal Engine 5 RTS with procedural map generation and village-building mechanics.',
  //   detail:      'Procedural terrain uses a layered noise approach with biome blending. The village-building system is data-driven — buildings declare their resource needs and the AI queues construction accordingly.',
  //   image:       './image2.png',
  //   imgPosition: 'center',
  //   languages:   ['C++'],
  //   domain:      'Games',
  //   size:        'normal',
  //   role:        'Gameplay programmer',
  //   metric:      { label: 'Core Engine', value: 'Functional' },
  //   year:        '2024',
  //   tags:        ['Unreal Engine', 'Procedural Generation', 'RTS'],
  // },
    {
    name:        'Stocktaking App',
    filename:    'stocktaking.kt',
    langColor:   '#F18E33',
    description: 'Android inventory management app deployed at a local hospital. Replaced a paper-based process, reducing transcription errors.',
    detail:      'Built end-to-end solo - from the Android UI to the local data layer. The hospital adopted it and continued development, which made the impact very tangible.',
    image:       './stocktaking-app.png',
    imgPosition: 'top',        
    tags:        ['Android SDK', 'Healthcare', 'B2B'],
    languages:   ['Kotlin'],
    domain:      'Web & Mobile',
    size:        'normal',
    role:        'Full-stack Android dev',
    metric:      { label: 'Deployed at', value: 'hospital' },
    year:        '2024',
  },
  {
    name:        'Gravity Assist',
    filename:    'gravity_assist.gd',
    langColor:   '#478CBF',
    description: 'GMTK 2024 game-jam entry. Use a planet-sized gravity cannon to collect canisters. Built and shipped in 96 hours.',
    detail:      'The theme was "built to scale" - the main goal was to reach a space station by adjusting adjacent planet\' gravity fields. The name comes from an actual gravity assist maneuver, which slingshots a spacecraft by using a planet\'s gravity.',
    image:       './gravity_assist.png',
    imgPosition: 'center',
    tags:        ['Godot', 'Game Jam', '2D'],
    languages:   ['GDScript'],
    domain:      'Games',
    size:        'wide',
    metric:      { label: 'Dev time', value: '96 hours' },
    year:        '2024',
    link:        'https://ghemyn.itch.io/gravity-assist',
  },
  {
    name:        '2048',
    filename:    'b2048.cpp',
    langColor:   '#F18E33',
    description: 'Classic 2048 in C++ with OpenGL rendering. Focused on clean state management and smooth tile animations.',
    detail:      'All game logic is modelled as pure state transitions with no side effects, making it trivially testable. Tile merge animations interpolate in screen-space over the render loop.',
    image:       './2048.png',
    imgPosition: 'center',
    languages:   ['C++'],
    domain:      'Games',
    size:        'normal',
    role:        'Graphics programmer',
    metric:      { label: 'Render target', value: '60 fps' },
    year:        '2023',
    tags:        ['OpenGL', 'Game Logic', '2D'],
    link:        'https://github.com/lShanterl/2048-Game'
  },
  {
    name:        '3D Model Inspector',
    filename:    'model_inspector.cpp',
    langColor:   '#659AD2',
    description: 'Custom OBJ parser with PBR shading, shadow mapping, and a fully hand-rolled shader pipeline - no asset libraries.',
    detail:      'Every vertex, normal, and face is read by hand. Working this close to the metal taught me more about the graphics stack than any tutorial - one of my first serious C++ projects.',
    image:       './image1.png',
    imgPosition: 'center',
    tags:        ['OpenGL', 'PBR Shaders', '3D Graphics'],
    languages:   ['C++'],
    domain:      'Systems',
    size:        'featured',
    role:        'Solo architect & renderer',
    metric:      { label: 'Shader pipeline', value: '100% custom' },
    year:        '2022–2023',
    link:        'https://github.com/lShanterl/3D-Model-Inspector'
  },
  {
    name:        'Flowspark',
    filename:    'cinema.php',
    langColor:   '#8892BF',
    description: 'Cinema website with admin panel, seat reservation, and movie management on a PHP/MySQL stack.',
    detail:      'Website allows users to view showtimes, reserve seats, and browse movie details. Admin panel supports adding/editing movies, managing showtimes, and viewing reservations.',
    image:       './flowspark.png',
    imgPosition: 'top',
    languages:   ['PHP'],
    domain:      'Web & Mobile',
    size:        'normal',
    role:        'Full-stack developer',
    metric:      { label: 'Seat system', value: 'Real-time' },
    year:        '2022',
    tags:        ['PHP', 'MySQL', 'Web Development'],
    link:        'https://github.com/lShanterl/School-Projects/tree/main/FlowSpark'
  },
]

const featuredVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
}
 
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }
  }),
  exit: { opacity: 0, scale: 0.95, y: -8, transition: { duration: 0.18 } }
}

const DOMAINS: DomainCategory[] = ['All', 'Games', 'Systems', 'Web & Mobile']

const getStartYear = (yearStr: string): number => {
  const match = yearStr.match(/^\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

function FeaturedCard({ p }: { p: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="pcard-featured"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
      variants={featuredVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      exit="exit"
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
    >
      <div className="featured-topbar">
        <span className="featured-dot" style={{ background: p.langColor }} />
        <span className="featured-filename">{p.filename}</span>
        <span className="featured-spacer" />
        <span className="featured-year">{p.year}</span>
        <span className="featured-badge">featured</span>
      </div>

      <div className="featured-image-wrap">
        <img
          src={p.image}
          alt={`${p.name} preview`}
          loading="lazy"
          style={{
            objectPosition: p.imgPosition ?? 'center',
            opacity: hovered ? 0.08 : 1,
            filter: 'brightness(0.62) saturate(0.85)',
          }}
        />
        {p.detail && (
          <motion.div
            className="featured-img-detail"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="featured-img-detail-text">{p.detail}</p>
          </motion.div>
        )}
      </div>

      <div className="featured-body">
        <div className="featured-meta">
          {p.role && <span className="featured-role">{p.role}</span>}
          {p.metric && (
            <span className="featured-metric">
              <span className="featured-metric-label">{p.metric.label}</span>
              <span className="featured-metric-value">{p.metric.value}</span>
            </span>
          )}
        </div>

        <h3 className="featured-name">{p.name}</h3>
        <p className="featured-desc">{p.description}</p>

        <div className="featured-footer">
          <div className="featured-tags">
            {p.tags.map(t => <span className="featured-tag" key={t}>{t}</span>)}
          </div>
          <div className="featured-right">
            <div className="featured-langs">
              {p.languages.map(l => (
                <span className="featured-lang" key={l}
                  style={{ color: p.langColor, borderColor: `${p.langColor}50`, background: `${p.langColor}12` }}>
                  {l}
                </span>
              ))}
            </div>
            {p.link && (
              <a className="featured-cta" href={p.link} target="_blank" rel="noreferrer">
                source ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const [hovered, setHovered] = useState(false)
  const isWide = p.size === 'wide'

  return (
    <motion.div
      className={`pcard-std${isWide ? ' pcard-std--wide' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      exit="exit"
      whileHover={{
        y: -3,
        borderColor: 'rgba(168, 85, 247, 0.45)',
        boxShadow: '0 8px 32px rgba(147, 51, 234, 0.15)',
        transition: { type: 'spring', stiffness: 400, damping: 24 }
      }}
    >
      <div className="std-tab">
        <span className="std-dot" style={{ background: p.langColor }} />
        <span className="std-filename">{p.filename}</span>
        <span className="std-spacer" />
        <div className="std-tab-right">
          <span className="std-year">{p.year}</span>
          {p.link && (
            <a className="std-link" href={p.link} target="_blank" rel="noreferrer">
              source ↗
            </a>
          )}
        </div>
      </div>

      <div className={`std-img-wrap${isWide ? ' std-img-wrap--wide' : ''}`}>
        <img
          src={p.image}
          alt={`${p.name} preview`}
          loading="lazy"
          style={{
            objectPosition: p.imgPosition ?? 'center',
            opacity: hovered ? 0.08 : 1,
            filter: 'brightness(0.58) saturate(0.82)',
          }}
        />
        {p.detail && (
          <motion.div
            className="std-img-detail"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="std-img-detail-text">{p.detail}</p>
          </motion.div>
        )}
      </div>

      <div className="std-body">
        <div className="std-meta">
          {p.role && <span className="std-role">{p.role}</span>}
          {p.metric && (
            <span className="std-metric">
              <span className="std-metric-label">{p.metric.label}</span>
              <span className="std-metric-value">{p.metric.value}</span>
            </span>
          )}
        </div>
        <h3 className="std-name">{p.name}</h3>
        <p className="std-desc">{p.description}</p>
      </div>

      <div className="std-footer">
        <div className="std-tags">
          {p.tags.map(t => <span className="std-tag" key={t}>{t}</span>)}
        </div>
        <div className="std-langs">
          {p.languages.map(l => (
            <span className="std-lang" key={l}
              style={{ color: p.langColor, borderColor: `${p.langColor}50`, background: `${p.langColor}12` }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeDomain, setActiveDomain] = useState<DomainCategory>('All')
  const [activeLang,   setActiveLang]   = useState<string>('All')

  const availableLanguages = ['All', ...Array.from(
    new Set(PROJECTS.flatMap(p => p.languages))
  )]

  const filteredSortedProjects = PROJECTS.filter(p => {
    const matchesDomain = activeDomain === 'All' || p.domain === activeDomain
    const matchesLang   = activeLang   === 'All' || p.languages.includes(activeLang)
    return matchesDomain && matchesLang
  }).sort((a, b) => getStartYear(b.year) - getStartYear(a.year))

  const featuredProjects = filteredSortedProjects.filter(p => p.size === 'featured')
  const normalProjects   = filteredSortedProjects.filter(p => p.size !== 'featured')

  return (
    <section className="projects-section" id="projects">

    <div className=''>
      <div className="section-centered-header">
        <p className="section-tag">projects.rs - pub mod portfolio</p>
        <h2 className="section-display-title">
          Things I've <span className="marked">shipped</span>
        </h2>
      </div>

      <div className='filters'>
        <div className="filters-container">
          <nav className="filter-row" aria-label="Category">
            {DOMAINS.map(d => (
              <button
                key={d}
                className={`chip${activeDomain === d ? ' chip--active' : ''}`}
                onClick={() => { setActiveDomain(d); setActiveLang('All') }}
              >
                {d === 'All' ? 'all' : d.toLowerCase().replace(' & ', '_')}
              </button>
            ))}
          </nav>
        </div>
        <nav className="filter-row filter-row--sub" aria-label="Language">
          {availableLanguages.map(lang => {
            const has = PROJECTS.some(p =>
              (activeDomain === 'All' || p.domain === activeDomain) && p.languages.includes(lang)
            )
            if (!has && lang !== 'All') return null
            return (
              <button
                key={lang}
                className={`chip chip--sub${activeLang === lang ? ' chip--active-sub' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang === 'All' ? 'all langs' : lang.toLowerCase()}
              </button>
            )
          })}
        </nav>
      </div>
      </div>


      <AnimatePresence mode="popLayout">
        {featuredProjects.length > 0 && (
          <motion.div
            key="featured"
            className={`featured-strip ${featuredProjects.length === 1 ? 'featured-strip--single' : 'featured-strip--double'}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {featuredProjects.map(p => <FeaturedCard key={p.name} p={p} />)}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout="position" className="bento-grid">
        <AnimatePresence mode="popLayout">
          {normalProjects.map(p => (
            <ProjectCard key={p.name} p={p} />
          ))}

          {activeDomain === 'All' && activeLang === 'All' && (
            <motion.div
              key="future"
              className="pcard-std pcard-future"
              layout
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            exit="exit"

            >
              <div className="future-inner">
                <span className="future-plus">+</span>
                <p className="future-title">more soon</p>
                <p className="future-body">Constantly building something new.<br />Check GitHub for experiments.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </section>
  )
}