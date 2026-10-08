import { useEffect, useRef, useState } from 'react'
import urbanix1 from './assets/urbanix1.jpeg'
import urbanix2 from './assets/urbanix2.jpeg'
import urbanix3 from './assets/urbanix3.jpeg'
import urbanix4 from './assets/urbanix.jpeg'
import gazom from './assets/gazom.png'

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function BlinkingCursor() {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="inline-block w-[2px] h-[0.8em] ml-1"
      style={{ backgroundColor: '#7A9A5A', opacity: on ? 1 : 0, transition: 'opacity 0.08s', verticalAlign: 'middle' }} />
  )
}

/* ── Feather quill – organic, line-art style (upright; nib tip at bottom centre) ── */
function Quill() {
  const stroke = 'var(--color-mauve-light)'
  const sw = 1.4
  return (
    <svg viewBox="0 0 60 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      {/* vane */}
      <path d="M30,196 C18,176 8,150 7,118 C6,80 18,40 37,6 C46,34 54,66 53,100 C52,136 42,166 31,184"
        stroke={stroke} strokeWidth={sw} strokeLinejoin="round" style={{ fill: 'color-mix(in srgb, var(--color-mauve) 22%, var(--color-canvas))' }} />
      {/* notches in the vane */}
      <path d="M8,132 L15,128" stroke={stroke} strokeWidth={sw * 0.8} />
      <path d="M52,112 L45,110" stroke={stroke} strokeWidth={sw * 0.8} />
      {/* barbs */}
      {[40, 58, 76, 94, 112, 130, 148, 166].map((y, i) => (
        <g key={y} strokeOpacity={0.45}>
          <path d={`M${31 + y * 0.02},${y + 6} Q${22 - i * 0.3},${y + 2} ${14 + Math.abs(i - 4) * 1.6},${y - 10}`} stroke={stroke} strokeWidth={sw * 0.5} />
          {y < 160 && <path d={`M${31 + y * 0.02},${y + 4} Q${40},${y} ${48 - Math.abs(i - 3) * 1.4},${y - 12}`} stroke={stroke} strokeWidth={sw * 0.5} />}
        </g>
      ))}
      {/* shaft */}
      <path d="M30,214 C30,160 31,90 37,6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* nib */}
      <path d="M30,240 L25.5,214 Q30,208 34.5,214 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={stroke} fillOpacity="0.25" />
      <line x1="30" y1="238" x2="30" y2="220" stroke={stroke} strokeWidth={sw * 0.6} />
      <circle cx="30" cy="219" r="1.4" stroke={stroke} strokeWidth={sw * 0.6} />
    </svg>
  )
}

/* ── the code the quill writes ── */
const SYN = {
  kw: 'var(--color-mauve-light)',
  id: 'var(--color-ink)',
  fn: 'var(--color-sage-light)',
  op: 'var(--color-sage)',
  p: 'var(--color-ink-muted)',
}
const CODE: [string, string][][] = [
  [['const ', SYN.kw], ['heart', SYN.id], [' = ', SYN.p], ['human', SYN.fn], ['();', SYN.p]],
  [['const ', SYN.kw], ['mind', SYN.id], [' = ', SYN.p], ['machine', SYN.fn], ['();', SYN.p]],
  [],
  [['while ', SYN.kw], ['(', SYN.p], ['heart ', SYN.id], ['&& ', SYN.op], ['mind', SYN.id], [') {', SYN.p]],
  [['  ', SYN.p], ['create', SYN.fn], ['(', SYN.p], ['together', SYN.id], [');', SYN.p]],
  [['}', SYN.p]],
]
const LINE_LENS = CODE.map(line => line.reduce((n, [text]) => n + text.length, 0))
const MAX_COLS = Math.max(...LINE_LENS)
// every character is one step, plus one step per line break
const TOTAL_STEPS = LINE_LENS.reduce((a, b) => a + b, 0) + CODE.length - 1

function caretAt(step: number) {
  let n = step
  for (let line = 0; line < LINE_LENS.length; line++) {
    if (n <= LINE_LENS[line]) return { line, col: n }
    n -= LINE_LENS[line] + 1
  }
  return { line: LINE_LENS.length - 1, col: LINE_LENS[LINE_LENS.length - 1] }
}

const QUILL_ANGLE = 32 // degrees, leaning right

// all scene geometry, in px, derived from the code font size —
// which scales with both width and height so the hero (text + scene) fits one screen
function getLayout(w: number, h: number, charRatio: number) {
  // desktop browsers get a larger scene; phones and tablets keep the compact sizing
  const wide = w >= 1024
  // narrow screens: also cap by width so the centred editor plus the quill
  // overhanging its right edge (~3 font-sizes) stays on screen
  const fitW = (w - 32) / (charRatio * (MAX_COLS + 4) + 2.6 + 6)
  const fs = wide
    ? Math.min(Math.max(14, Math.min(w * 0.02, h * 0.025)), 30)
    : Math.min(Math.max(11, Math.min(w * 0.036, h * 0.021, fitW)), 22)
  const cw = fs * charRatio
  const lh = fs * 1.75
  const padX = fs * 1.3
  const header = fs * 2.4
  const padY = fs * 1.1
  const gutter = cw * 3
  const codeW = padX * 2 + gutter + (MAX_COLS + 1) * cw
  // on desktop the editor spans about half the screen, wider than the code itself
  const panelW = wide ? Math.max(codeW, Math.min(w * 0.52, 1100)) : codeW
  const panelH = header + padY * 2 + CODE.length * lh
  const quillL = fs * 10
  const quillW = quillL * 0.25
  const topSpace = fs * 3 // room for the quill rising above the panel
  const frameH = Math.round(topSpace + panelH + fs)
  // the editor is centred on the screen; the quill is free to overhang it
  const panelX = (w - panelW) / 2
  const tipY = (line: number) => topSpace + header + padY + line * lh + lh * 0.78
  const caretX = (col: number) => panelX + padX + gutter + col * cw
  // where the quill rests between writing: nib tucked into the editor's bottom-right corner
  const restX = panelX + panelW - fs * 1.5
  return { restX, fs, lh, padX, header, padY, gutter, panelW, panelH, quillL, quillW, topSpace, frameH, panelX, tipY, caretX }
}

/* ── bullet text: anything before the first colon is bolded as a label ── */
function BulletText({ text }: { text: string }) {
  const colon = text.indexOf(':')
  if (colon <= 0) return <span>{text}</span>
  return (
    <span>
      <strong className="font-semibold text-[var(--color-ink)]">{text.slice(0, colon + 1)}</strong>
      {text.slice(colon + 1)}
    </span>
  )
}

const NAV_ITEMS = [
  { label: 'Work', path: '/work' },
  { label: 'Writing', path: '/writing' },
  { label: 'About', path: '/about' },
]

type PagePath = '/' | '/work' | '/writing' | '/about'

// the folder the site is served from: '' locally, '/portfolio-2026' on GitHub Pages (set by vite's `base`)
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '')
const toUrl = (path: string) => (BASE + path).replace(/\/+$/, '') || '/'

function getPagePath(): PagePath {
  let path = window.location.pathname
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length)
  path = path.replace(/\/+$/, '') || '/'
  return NAV_ITEMS.some(item => item.path === path) ? path as PagePath : '/'
}

function SiteHeader({
  menuOpen,
  setMenuOpen,
  onNavigate,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  onNavigate: (path: PagePath) => void
}) {
  return (
    <>
      <nav className="relative z-50 flex items-center justify-between px-6 pt-7 sm:px-10 md:px-14">
        <a
          href={toUrl('/')}
          onClick={event => {
            event.preventDefault()
            onNavigate('/')
          }}
          className="font-handwriting text-3xl font-semibold sm:text-4xl tracking-[0.04em] text-[var(--color-ink-muted)] no-underline transition-colors hover:text-[var(--color-sage-light)]"
        >
          Raye
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(item => (
            <a
              key={item.path}
              href={toUrl(item.path)}
              onClick={event => {
                event.preventDefault()
                onNavigate(item.path as PagePath)
              }}
              className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-ink-muted)] no-underline transition-colors duration-200 hover:text-[var(--color-ink)]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-[1.5px] w-[22px] origin-center bg-[var(--color-ink-muted)] transition-[transform,opacity] duration-200"
              style={{
                transform: i === 0 && menuOpen ? 'translateY(6.5px) rotate(45deg)' : i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-canvas)] transition-opacity duration-300 md:hidden"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }}
      >
        <div className="flex flex-col items-center gap-10">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.path}
              href={toUrl(item.path)}
              onClick={event => {
                event.preventDefault()
                setMenuOpen(false)
                onNavigate(item.path as PagePath)
              }}
              className="font-display text-[clamp(2rem,8vw,3rem)] tracking-[-0.02em] text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-sage)]"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.35s ease ${0.1 + i * 0.08}s, transform 0.35s ease ${0.1 + i * 0.08}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-10 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] transition-opacity duration-300" style={{ opacity: menuOpen ? 0.3 : 0 }}>
          Raye · 2026
        </div>
      </div>
    </>
  )
}

function SiteFooter() {
  return (
    <footer className="flex items-center justify-between px-6 py-5 opacity-30 sm:px-10 md:px-14">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">Raye</span>
      <div className="mx-5 h-px flex-1 bg-[var(--color-ink-muted)]" />
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">2026</span>
    </footer>
  )
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="mx-auto flex min-h-[58svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-20 md:min-h-[72vh] md:pt-24 sm:px-10 md:px-14 md:pb-28 lg:min-h-[56vh] lg:pb-20">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-sage-light)]">{eyebrow}</p>
      <h1 className="max-w-5xl font-display text-[clamp(3.5rem,10vw,8.5rem)] font-normal leading-[0.92] lg:text-[clamp(4rem,6.5vw,6.5rem)] tracking-[-0.04em] text-[var(--color-ink)]">{title}</h1>
      <p className="mt-8 max-w-md text-sm leading-7 text-[var(--color-ink-muted)] sm:text-base">{copy}</p>
    </header>
  )
}

/* ── Project image carousel (shows placeholder slides until images are added) ── */
function ProjectCarousel({ images, title, number, tone }: { images: string[]; title: string; number: string; tone: string }) {
  const slides = images.length > 0 ? images : ['', '', '']
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-[var(--color-canvas)] lg:aspect-[2/1]"
      onTouchStart={event => { touchX.current = event.touches[0].clientX }}
      onTouchEnd={event => {
        if (touchX.current === null) return
        const dx = event.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            {src ? (
              <>
                {/* blurred copy fills the frame behind images that don't match its shape */}
                <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
                <img src={src} alt={`${title} — image ${i + 1}`} className="absolute inset-0 h-full w-full object-contain" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color:var(--color-panel)] text-[var(--color-ink-muted)]">
                <div className={`absolute inset-0 ${tone}`} style={{ opacity: 0.08 + i * 0.04 }} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="relative h-10 w-10 opacity-60">
                  <rect x="3" y="4" width="18" height="16" rx="1.5" />
                  <circle cx="9" cy="10" r="1.8" />
                  <path d="M3 17l5-5 4 4 3-3 6 6" />
                </svg>
                <span className="relative font-mono text-[0.6rem] uppercase tracking-[0.18em] opacity-60">Project {number} · Image {i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          {[-1, 1].map(dir => (
            <button
              key={dir}
              type="button"
              onClick={() => go(index + dir)}
              aria-label={dir < 0 ? 'Previous image' : 'Next image'}
              className={`absolute top-1/2 ${dir < 0 ? 'left-3' : 'right-3'} flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-canvas)_70%,transparent)] text-[var(--color-ink)] backdrop-blur-sm transition-opacity duration-200 hover:bg-[var(--color-canvas)] md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                <path d={dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-canvas)_65%,transparent)] px-3 py-2 backdrop-blur-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1}`}
                className="h-1.5 rounded-full bg-[var(--color-ink)] transition-all duration-300"
                style={{ width: i === index ? 18 : 6, opacity: i === index ? 0.9 : 0.35 }}
              />
            ))}
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-[color:color-mix(in_srgb,var(--color-canvas)_65%,transparent)] px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-[var(--color-ink)] backdrop-blur-sm">
            {index + 1} / {slides.length}
          </span>
        </>
      )}
    </div>
  )
}

// generic "SQL" has no brand logo on devicon, so draw a simple database icon
const SQL_ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#B7C396" stroke-width="3">' +
  '<ellipse cx="32" cy="14" rx="20" ry="7"/><path d="M12 14v36c0 3.9 9 7 20 7s20-3.1 20-7V14"/>' +
  '<path d="M12 26c0 3.9 9 7 20 7s20-3.1 20-7M12 38c0 3.9 9 7 20 7s20-3.1 20-7"/></svg>'
)}`

type StackItem = {
  name: string
  logo: string
  invert?: boolean // flip dark logos so they show on the dark background
  chip?: boolean // dark multi-colour logos sit on a small light tile instead
  category?: string
  tone?: string
  height?: string
}

type Project = {
  number: string
  title: string
  type: string
  introduction?: string
  description: string
  link?: string // shown under the description as a clickable link
  contribution: string[]
  outcome: string
  tone: string
  images: string[]
}

function WorkPage() {
  const experience = [
    {
      period: 'May 2026 — Sep 2026',
      role: 'Business Analyst Intern',
      company: 'PebbleRoad',
      location: 'Singapore',
      contributions: [
        'Designed and built a 0-to-1 automation pipeline with agentic AI, human-in-the-loop guardrails, and rules-based risk scoring DMN logic to flag high-risk transactions (solution adopted by the team after internship end).',
        'Conducted competitive research across 10+ companies and synthesised findings into a comparison matrix for internal leadership review.',
        'Reorganised CMS information architecture across 300+ files, aligning teams via Jira, Confluence and Slack to keep project milestones on track.'
      ],
    },
    {
      period: 'Aug 2026 — Present',
      role: 'Teaching Assistant (Interaction Design & Prototyping)',
      company: 'Singapore Management University',
      location: 'Singapore',
      contributions: [
        'Mentoring 41 students 1-1 through product ideation, usability, and UI/UX design.',
        'Partnering with professor and instructor to refine instructional materials based on student feedback.'
      ],
    },
  ]
  const projects: Project[] = [
    {
      number: '01',
      title: 'URBANIX – AI-Powered Policymaking Support Tool',
      type: 'Hackathon Top 5 Finalist | Pitched to IMDA Panel',
      description: 'An AI-powered decision-support platform that helps policymakers explore trade-offs and outcomes of urban policies. Watch the demo video below to see how it works!',
      link: 'https://youtu.be/XRJhYKgQaWw',
      contribution: [
        'Spearheaded development of a decision-support platform within 5 days, coordinating rapid prototyping and agile execution.',
        'Implemented an AI chatbot to guide users interactively through policy scenarios and outcome simulations.',
        'Built data visualisations (dashboards, radar charts) to clearly display district-level indicators and policy trade-offs.'
      ],
      outcome: 'The project was selected as a Top 5 Finalist in the SMU Hack for Cities Hackathon 2026, and my team pitched the solution to a panel of judges from IMDA.',
      tone: 'bg-[var(--color-sage-light)]',
      // carousel images: drop files in public/projects/ and list them, e.g. ['/projects/urbanix-1.png', '/projects/urbanix-2.png']
      images: [urbanix1, urbanix2, urbanix3, urbanix4],
    },
    {
      number: '02',
      title: 'GaZom Desserts Website',
      type: 'Cross-border project',
      description: 'Client-facing website for a local F&B business in Bhutan. Check out the live site below!',
      // optional: shown under the description as a clickable link
      link: 'https://gazomdesserts.com/',
      contribution: [
        'Led end-to-end development of a client-facing website for a F&B business in Bhutan under 3 weeks.',
        'Worked directly with business stakeholder to gather, clarify and document website requirements through regular feedback sessions.'
      ],
      outcome: 'The website was successfully launched and is now live, helping the business reach a wider audience and attract visitors.',
      tone: 'bg-[var(--color-mauve-light)]',
      // carousel images: drop files in public/projects/ and list them, e.g. ['/projects/urbanix-1.png', '/projects/urbanix-2.png']
      images: [gazom],
    },
  ]
  const stack: StackItem[] = [
    { name: 'React', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', tone: 'bg-[var(--color-sage-light)]', height: 'h-52' },
    { name: 'TypeScript', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', tone: 'bg-[var(--color-mauve-light)]', height: 'h-64' },
    { name: 'JavaScript', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', tone: 'bg-[var(--color-sage-pale)]', height: 'h-44' },
    { name: 'Tailwind CSS', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', tone: 'bg-[var(--color-surface)]', height: 'h-60' },
    { name: 'Node.js', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', tone: 'bg-[var(--color-sage-pale)]', height: 'h-56' },
    { name: 'Vite', category: 'Build', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', tone: 'bg-[var(--color-sage-light)]', height: 'h-48' },
    { name: 'Figma', category: 'Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', tone: 'bg-[var(--color-mauve-light)]', height: 'h-52' },
    { name: 'Git', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', tone: 'bg-[var(--color-surface)]', height: 'h-44' },
    { name: 'GitHub', category: 'Tools', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', tone: 'bg-[var(--color-sage-pale)]', height: 'h-64', invert: true },
    { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
    { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg', chip: true },
    { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
    { name: 'scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', invert: true },
    { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    { name: 'SQL', logo: SQL_ICON },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', chip: true },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
  ]

  return (
    <main>
      <PageIntro eyebrow="01 · Experience" title="Work across domains." copy="My growing library of industry experience, shaped by the many wonderful folks I've collaborated with." />

      <section className="border-b border-[color:var(--color-line)] px-6 pb-20 sm:px-10 md:px-14 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
            {experience.map(item => (
              <article key={`${item.period}-${item.role}`} className="grid gap-8 py-12 md:grid-cols-[0.7fr_1.3fr] md:py-16">
                <div>
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-sage-light)]">{item.period}</p>
                  <p className="mt-3 text-xs text-[var(--color-ink-muted)]">{item.location}</p>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-normal leading-tight text-[var(--color-ink)] sm:text-4xl">{item.role}</h3>
                  <p className="mt-2 font-mono text-[0.80rem] uppercase tracking-[0.16em] text-[var(--color-mauve-light)]">{item.company}</p>
                  <div className="mt-8 border-l border-[var(--color-line)] pl-6">
                    <p className="mb-4 font-mono text-[0.67rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">Responsibilities</p>
                    <ul className="space-y-4">
                      {item.contributions.map(contribution => (
                        <li key={contribution} className="flex gap-4 text-sm leading-6 text-[var(--color-ink)]">
                          <span className="mt-[0.65rem] h-px w-3 shrink-0 bg-[var(--color-sage)]" />
                          <BulletText text={contribution} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[var(--color-sage-light)]">02 · Projects</p>
              <h2 className="mt-4 font-display text-6xl font-normal text-[var(--color-ink)] sm:text-7xl">Projects</h2>
            </div>
          </div>
          <div className="space-y-5 md:space-y-10 lg:mx-auto lg:max-w-5xl">
            {projects.map(project => (
              <article key={project.number} className="group overflow-hidden border border-[color:var(--color-line)]">
                <ProjectCarousel images={project.images} title={project.title} number={project.number} tone={project.tone} />
                <div className="bg-[color:var(--color-panel)] p-7 sm:p-10 md:p-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-10">
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">Project {project.number}</p>
                    <h3 className="mt-3 font-display text-3xl font-normal leading-tight text-[var(--color-ink)] sm:text-4xl">{project.title}</h3>
                    <p className="mt-5 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-sage-light)]">{project.type}</p>
                    <p className="mt-7 max-w-xl text-xl font-semibold leading-8 text-[var(--color-ink)]">{project.introduction}</p>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--color-ink-muted)]">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-sage-light)] underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:decoration-[var(--color-sage)]"
                      >
                        {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                  <div className="mt-12 grid gap-8 border-t border-[color:var(--color-line)] pt-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-1 lg:content-start lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <div>
                      <p className="font-mono text-[0.70rem] uppercase tracking-[0.16em] text-[var(--color-mauve-light)]">My contribution</p>
                      <ul className="mt-3 space-y-3">
                        {project.contribution.map(point => (
                          <li key={point} className="flex gap-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                            <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-[var(--color-sage)]" />
                            <BulletText text={point} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[0.70rem] uppercase tracking-[0.16em] text-[var(--color-mauve-light)]">Outcome</p>
                      <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">{project.outcome}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-canvas)] px-6 py-20 text-[var(--color-ink)] sm:px-10 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] opacity-60">03 · Tech stack</p>
            <div>
              <h2 className="font-display text-6xl font-normal sm:text-7xl">My repertoire.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 opacity-60">Technologies and tools I use to turn ideas into thoughtful, working experiences.</p>
            </div>
          </div>
          <div className="mt-14 flex max-w-3xl flex-wrap items-center gap-4 md:ml-[29%] sm:gap-6">
            {stack.map(item => (
              <img
                key={item.name}
                src={item.logo}
                alt={item.name}
                className={`h-9 w-9 object-contain opacity-85 transition-[transform,opacity] duration-300 hover:-translate-y-1 hover:scale-110 hover:opacity-100 sm:h-11 sm:w-11 ${item.invert ? 'invert' : ''} ${item.chip ? 'rounded-lg bg-[var(--color-ink)] p-1' : ''}`}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  const timelineRef = useRef<HTMLElement>(null)
  const [timelineProgress, setTimelineProgress] = useState(0)
  const education = [
    {
      year: '2024 - Present',
      title: 'BSc (Information Systems)',
      copy: 'Singapore Management University',
      // bullet points shown under the school — replace these placeholders
      points: [
        'Double major in Business Analytics & Artificial Intelligence',
        'Module distinctions: Computing Fundamentals, Interaction Design & Prototyping, Business Process Analysis & Solutioning, Management Communication, Big Questions',
        'CCAs: SMU-AI, Women in Tech'
      ],
    },
    {
      year: '2022 - 2023',
      title: 'Arts Stream',
      copy: 'Anglo-Chinese Junior College',
      points: [
        'Module distinctions: English Literature, General Paper, Project Work',
        'Vice President of AC Press, competitive debator in Debate & Oratorical Society',
      ],
    },
  ]

  useEffect(() => {
    const update = () => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const start = window.innerHeight * 0.72
      const distance = rect.height + window.innerHeight * 0.2
      setTimelineProgress(Math.max(0, Math.min(1, (start - rect.top) / distance)))
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <main>
      <PageIntro eyebrow="The person between" title="Humanities, meet technology." copy="I care about the space where different ways of thinking overlap, and what becomes possible there." />

      <section className="px-6 py-20 sm:px-10 md:px-14 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[var(--color-mauve-light)]">01 · About me</p>
          <div>
            <p className="max-w-5xl font-display text-5xl leading-snug text-[var(--color-ink)] sm:text-5xl lg:text-6xl">Moving between stories and systems</p>
            <div className="mt-10 grid gap-6 text-m leading-7 text-[var(--color-ink-muted)] sm:grid-cols-2">
              <p>My roots are in literature and the arts. They taught me empathy, critical thinking, and how to deliver a well-shaped idea that gets somewhere.</p>
              <p>I took this in my stride and entered the world of technology, where I gained a new medium to turn ideas into real-world products, building with and for the people.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={timelineRef} className="border-t border-[color:var(--color-line)] px-6 py-20 sm:px-10 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[var(--color-sage-light)]">02 · Education</p>
            <h2 className="font-display text-4xl font-normal text-[var(--color-ink)] sm:text-6xl">My education journey.</h2>
          </div>
          <div className="relative md:ml-[29%]">
            <div className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--color-line)]">
              <div className="w-full origin-top bg-[var(--color-sage)]" style={{ height: `${timelineProgress * 100}%` }} />
            </div>
            {education.map((item, index) => {
              const reveal = Math.max(0, Math.min(1, (timelineProgress - index * 0.22) / 0.2))
              return (
                <article
                  key={item.year}
                  className="relative grid min-h-56 gap-5 pb-14 pl-10 sm:grid-cols-[9rem_1fr]"
                  style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 24}px)` }}
                >
                  <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-[var(--color-sage)] bg-[var(--color-canvas)]" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">{item.year}</span>
                  <div>
                    <h3 className="font-display text-3xl font-normal text-[var(--color-ink)]">{item.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg">{item.copy}</p>
                    {item.points.length > 0 && (
                      <ul className="mt-5 max-w-xl space-y-3">
                        {item.points.map(point => (
                          <li key={point} className="flex gap-3 text-[0.95rem] leading-7 text-[var(--color-ink)] sm:text-base">
                            <span className="mt-[0.85rem] h-px w-3 shrink-0 bg-[var(--color-sage)]" />
                            <BulletText text={point} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function WritingPage() {
  return (
    <main>
      <PageIntro eyebrow="Notes in progress" title="Writing, soon." copy="Short observations on technology, culture, and the useful space between them." />
      <div className="mx-auto min-h-[35vh] max-w-6xl px-6 sm:px-10 md:px-14">
        <div className="border-t border-[color:var(--color-line)] py-10 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">The first dispatch is taking shape.</div>
      </div>
    </main>
  )
}

type Phase = 'idle' | 'writing' | 'done' | 'erasing'

function HomePage() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const [charRatio, setCharRatio] = useState(0.6)
  const [scene, setScene] = useState({ typed: 0, line: 0, col: 0, wobble: 0, lift: 0, rest: 1 })

  // measure the real monospace advance so the nib lands exactly on the caret
  useEffect(() => {
    const measure = () => {
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      ctx.font = "100px 'DM Mono'"
      setCharRatio(ctx.measureText('0000000000').width / 1000)
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [])

  useEffect(() => {
    const handleResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
  // idle → writing → done; scrolling up (or coming back into view) erases and writes again
  let phase: Phase = 'idle'
  let visible = false
  let typed = 0
  let line = 0
  let col = 0
  let rest = 1 // 1 = quill resting beside the editor, 0 = nib on the caret
  let last = performance.now()
  let stepClock = 0
  let lastY = window.scrollY
  let upDistance = 0
  let rafId: number
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const replay = () => {
    if (phase === 'done') phase = 'erasing'
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) {
      if (phase === 'idle') phase = 'writing'
      else replay()
    } else {
      // reset off-screen so it writes fresh on return
      phase = 'idle'
      typed = 0
      rest = 1
    }
  }, { threshold: 0.35 })
  if (sceneRef.current) observer.observe(sceneRef.current)

  const handleScroll = () => {
    const y = window.scrollY
    upDistance = y < lastY ? upDistance + (lastY - y) : 0
    lastY = y
    // a deliberate scroll up replays the writing
    if (upDistance > 40) {
      upDistance = 0
      replay()
    }
  }

  // the hero usually fits one screen, so also catch an upward wheel / swipe that doesn't move the page
  const handleWheel = (event: WheelEvent) => {
    if (event.deltaY >= 0 || window.scrollY > 0) return
    upDistance += -event.deltaY
    if (upDistance > 40) {
      upDistance = 0
      replay()
    }
  }
  let touchY = 0
  const handleTouchStart = (event: TouchEvent) => { touchY = event.touches[0].clientY }
  const handleTouchMove = (event: TouchEvent) => {
    // finger dragging down = scrolling up
    if (window.scrollY <= 0 && event.touches[0].clientY - touchY > 40) {
      touchY = event.touches[0].clientY
      replay()
    }
  }

  const tick = (now: number) => {
    const dt = Math.min(64, now - last)
    last = now

    if (reduceMotion) {
      if (phase !== 'idle') { phase = 'done'; typed = TOTAL_STEPS }
    } else {
      stepClock += dt
      if (phase === 'writing' && rest < 0.05) {
        // ms per character; pause a beat at each line break
        const c = caretAt(typed)
        const interval = c.col === LINE_LENS[c.line] ? 200 : 36
        while (stepClock >= interval && typed < TOTAL_STEPS) {
          stepClock -= interval
          typed++
        }
        if (typed === TOTAL_STEPS) phase = 'done'
      } else if (phase === 'erasing') {
        while (stepClock >= 12 && typed > 0) {
          stepClock -= 12
          typed--
        }
        if (typed === 0) phase = visible ? 'writing' : 'idle'
      } else {
        stepClock = 0
      }
    }

    // quill flies to the caret to write, and back to rest otherwise
    const restTarget = phase === 'writing' ? 0 : 1
    rest += (restTarget - rest) * (reduceMotion ? 1 : 0.07)

    // nib glides after the caret (sweeps back across on a new line)
    const caret = caretAt(typed)
    line += (caret.line - line) * 0.3
    col += (caret.col - col) * 0.3

    const isWriting = phase === 'writing' && rest < 0.05 && !reduceMotion
    setScene({
      typed,
      line,
      col,
      wobble: isWriting ? Math.sin(now / 55) * 2.5 : 0,
      lift: isWriting ? Math.abs(Math.sin(now / 90)) : 0,
      rest,
    })

    rafId = requestAnimationFrame(tick)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('wheel', handleWheel, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchmove', handleTouchMove, { passive: true })
  rafId = requestAnimationFrame(tick)

  return () => {
    observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    cancelAnimationFrame(rafId)
  }
}, [])

  const L = getLayout(viewport.w, viewport.h, charRatio)
  const isDone = scene.typed === TOTAL_STEPS
  const caret = caretAt(scene.typed)

  // nib on the caret while writing, eased to its resting spot (with a little arc) otherwise
  const writeX = L.caretX(scene.col)
  const writeY = L.tipY(scene.line) - scene.lift * L.fs * 0.35
  const r = easeInOutCubic(Math.min(1, Math.max(0, scene.rest)))
  const nibX = writeX + (L.restX - writeX) * r
  const nibY = writeY + (L.tipY(CODE.length - 1) - writeY) * r - Math.sin(r * Math.PI) * L.fs * 2
  const quillAngle = QUILL_ANGLE + scene.wobble - r * 12

  // reveal the typed characters, line by line
  let remaining = scene.typed
  const lines = CODE.map((tokens, i) => {
    const take = Math.max(0, Math.min(LINE_LENS[i], remaining))
    remaining -= LINE_LENS[i] + 1
    let left = take
    return tokens.map(([text, color], j) => {
      const part = text.slice(0, Math.max(0, left))
      left -= text.length
      return part ? <span key={j} style={{ color }}>{part}</span> : null
    })
  })

  return (
    // hero fills the screen below the nav: text on top, scene centred beneath
    <main className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center pb-5 pt-8 sm:pt-4">
      <div className="flex flex-col items-center text-center px-5 sm:px-10 md:px-14">
          <div className="flex items-center gap-2 mb-5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.74rem, 1vw, 0.8rem)', color: 'var(--color-ink-muted)' }}>
            <span style={{ color: 'var(--color-sage)' }}>{'>'}</span>
            <span>bridging_code_and_culture</span>
            <BlinkingCursor />
          </div>

          <h1 style={{
  fontFamily: 'var(--font-display)', fontWeight: 400,
  fontSize: 'clamp(3.5rem, min(15vw, 13vh), 9rem)', color: 'var(--color-ink)',
  letterSpacing: '-0.03em', lineHeight: 1.02,
  marginBottom: 'clamp(1.2rem, 3vh, 2.2rem)',
}}>
  Hi, I'm <span style={{ color: 'var(--color-sage)' }}>Raye.</span>
</h1>

<p style={{
  fontFamily: 'var(--font-sans)', fontWeight: 600,
  fontSize: 'clamp(1.25rem, 2.2vw, 1.4rem)', color: 'var(--color-ink)',
  maxWidth: '32ch', lineHeight: 1.45, letterSpacing: '-0.01em',
  marginBottom: '0.5rem',
}}>
  I build cross-border digital products with people at the center.
</p>

<p style={{
  fontFamily: 'var(--font-sans)', fontWeight: 300,
  fontSize: 'clamp(1rem, 1.1vw, 1.05rem)', color: 'var(--color-ink-muted)',
  maxWidth: '30ch', lineHeight: 1.7,
}}>
  Bridging technology and humanity in all I do.
</p>
      </div>

      {/* ── code + quill: tech and human, writing together ── */}
      <div ref={sceneRef} style={{ position: 'relative', width: '100%', height: L.frameH, marginTop: 'clamp(0.5rem, 2vh, 1.5rem)' }}>
          <style>{`
            @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
            @keyframes caret-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
          `}</style>

          <div style={{
            position: 'absolute', inset: 0,
            animation: isDone ? 'float 4s ease-in-out infinite' : 'none',
          }}>
            {/* code editor — tech */}
            <div style={{
              position: 'absolute', left: L.panelX, top: L.topSpace,
              width: L.panelW, height: L.panelH,
              border: '1px solid var(--color-line)', borderRadius: L.fs * 0.6,
              background: 'color-mix(in srgb, var(--color-surface) 4%, var(--color-canvas))',
              fontFamily: 'var(--font-mono)', fontSize: L.fs,
              boxShadow: '0 24px 60px -30px rgba(0,0,0,0.6)',
            }}>
              <div style={{
                height: L.header, display: 'flex', alignItems: 'center', gap: L.fs * 0.45,
                padding: `0 ${L.padX}px`, borderBottom: '1px solid var(--color-line)',
              }}>
                {['var(--color-mauve-light)', 'var(--color-sage-light)', 'var(--color-ink-muted)'].map(c => (
                  <span key={c} style={{ width: L.fs * 0.55, height: L.fs * 0.55, borderRadius: '50%', background: c, opacity: 0.55 }} />
                ))}
                <span style={{ marginLeft: 'auto', fontSize: L.fs * 0.72, letterSpacing: '0.12em', color: 'var(--color-ink-muted)', opacity: 0.7 }}>
                  together.ts
                </span>
              </div>
              <div style={{ position: 'relative', padding: `${L.padY}px ${L.padX}px` }}>
                {lines.map((content, i) => (
                  <div key={i} style={{ height: L.lh, lineHeight: `${L.lh}px`, whiteSpace: 'pre', display: 'flex' }}>
                    <span style={{ width: L.gutter, flexShrink: 0, color: 'var(--color-ink-muted)', opacity: 0.35 }}>{i + 1}</span>
                    <span>{content}</span>
                  </div>
                ))}
                {/* caret */}
                <span style={{
                  position: 'absolute',
                  left: L.caretX(caret.col) - L.panelX, top: L.padY + caret.line * L.lh + L.lh * 0.2,
                  width: 2, height: L.lh * 0.6, background: 'var(--color-sage)',
                  animation: scene.rest < 0.05 && !isDone ? 'none' : 'caret-blink 1.06s step-end infinite',
                }} />
              </div>
            </div>

            {/* feather quill — human */}
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: L.quillW, height: L.quillL,
              transformOrigin: '50% 100%',
              transform: `translate(${nibX - L.quillW / 2}px, ${nibY - L.quillL}px) rotate(${quillAngle}deg)`,
              willChange: 'transform',
              pointerEvents: 'none',
            }}>
              <Quill />
            </div>
          </div>
      </div>
    </main>
  )
}

export default function App() {
  const [path, setPath] = useState<PagePath>(getPagePath)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handlePopState = () => setPath(getPagePath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navigate = (nextPath: PagePath) => {
    if (nextPath !== path) {
      window.history.pushState({}, '', toUrl(nextPath))
      setPath(nextPath)
    }
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-canvas)] font-sans">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={navigate} />
      {path === '/' && <HomePage />}
      {path === '/work' && <WorkPage />}
      {path === '/about' && <AboutPage />}
      {path === '/writing' && <WritingPage />}
      <SiteFooter />
    </div>
  )
}
