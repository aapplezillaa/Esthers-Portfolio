import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const EXPERIENCE = [
  {
    company: 'Strategic Benefits Advisors',
    role: 'Pension Modeling Analyst Intern — Actuarial',
    period: 'Jan 2026 – Apr 2026',
    location: 'Peachtree Corners, GA',
    bullets: [
      'Developed a pension liability model for 900+ retirees, improving forecast accuracy using mortality tables and discounted cash flow modeling in Excel.',
      'Conducted portfolio allocation analysis (75/25, 50/50, 100/0) to quantify trade-offs between risk, return volatility, and funding requirements.',
      'Analyzed funding sensitivity under varying interest rate environments to inform long-term pension sustainability decisions.',
    ],
    tag: 'Actuarial',
  },
  {
    company: 'Abercrombie & Fitch',
    role: 'Sophomore Summit — IT',
    period: 'May 2022 – Jun 2022',
    location: 'Columbus, OH (Remote)',
    bullets: [
      'Selected 1 of 42 from 5,000+ applicants for a competitive leadership & analytics program in IT.',
      'Delivered a data-driven proposal on a retail case study by analyzing customer behavior and sales tracking systems.',
      'Analyzed internal financial technology systems and how data informs business and operational strategy.',
    ],
    tag: 'Data & Strategy',
  },
  {
    company: 'Georgia State University',
    role: 'Supplemental Instructor — Calculus Leader',
    period: 'Jan 2022 – Jan 2024',
    location: 'Atlanta, GA',
    bullets: [
      'Improved performance across 200+ students, raising average grades by ~0.5 letter through structured problem-solving sessions.',
      'Led weekly instruction sessions and 1:1 tutoring to strengthen analytical thinking and quantitative reasoning.',
      'Designed targeted review strategies for a historically high-failure-rate course.',
    ],
    tag: 'Teaching',
  },
];

const PROJECTS = [
  {
    title: 'Credit Card Data Governance Framework',
    period: 'Feb 2026',
    stack: ['Python', 'Pandas', 'Streamlit', 'Seaborn'],
    description:
      'Designed a financial data governance dashboard to improve data quality and compliance monitoring across credit card transaction datasets by visualizing key risk and validation metrics.',
    bullets: [
      'Implemented rule-based validation, PII classification, and role-based access controls.',
      'Simulated enterprise governance processes ensuring secure, accurate data handling.',
    ],
    icon: '🔐',
    accent: '#3dd9b3',
  },
  {
    title: 'Pension Benefits Plan Model',
    period: 'Jan 2026',
    stack: ['Excel', 'Tableau', 'R'],
    description:
      'Built a pension liability and forecasting model for 900+ annuitants, estimating cash flows and funded status over a 5-year horizon.',
    bullets: [
      'Integrated demographic data, IRS mortality tables, and market assumptions.',
      'Evaluated portfolio allocation and interest rate scenarios to quantify funding risk, targeting ≤105% underfunding threshold.',
    ],
    icon: '📊',
    accent: '#c9a84c',
  },
];

const SKILLS = {
  'Languages': ['Java', 'Python', 'SQL', 'R'],
  'Data & ML': ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
  'Tools & Platforms': ['Tableau', 'Git / GitHub', 'Jupyter Notebook', 'Unix / Linux', 'Microsoft Office'],
  'Finance & Math': ['DCF Modeling', 'Mortality Tables', 'Portfolio Analysis', 'Actuarial Methods'],
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#about" className="nav__logo">
        <span className="nav__logo-em">E</span>M
      </a>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className={`nav__link ${active === l.toLowerCase() ? 'nav__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter([
    'problem solver.',
    'math enthusiast.',
    'data storyteller.',
    'future actuary.',
    'code builder.',
  ]);

  return (
    <section className="hero" id="about">
      <div className="hero__grid-bg" aria-hidden="true">
        {Array.from({ length: 64 }).map((_, i) => <div key={i} className="hero__grid-cell" />)}
      </div>

      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow animate-fade-up">Mathematics & Computer Science · UGA '26</p>
        <h1 className="hero__name animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Esther<br /><span className="hero__name-em">Martinez</span>
        </h1>
        <p className="hero__typed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          I am a passionate{' '}
          <span className="hero__typed-word">
            {typed}
            <span className="hero__cursor" aria-hidden="true">|</span>
          </span>
        </p>
        <p className="hero__bio animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Bridging mathematics, finance, and code — I turn complex data into clear decisions.
          Concentrating in Financial Mathematics at UGA, working toward my actuarial credentials,
          and building systems that make numbers mean something.
        </p>
        <div className="hero__cta animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a href="#experience" className="btn btn--primary">View My Work</a>
          <a href="#contact" className="btn btn--outline">Get in Touch</a>
        </div>
        <div className="hero__stats animate-fade-up" style={{ animationDelay: '0.5s' }}>
          {[
            { val: '900+', label: 'Retirees modeled' },
            { val: '200+', label: 'Students mentored' },
            { val: '5K+', label: 'Applicant pool beaten' },
          ].map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-val">{s.val}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

function ExperienceCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={`exp-card scroll-reveal`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="exp-card__header" onClick={() => setOpen(o => !o)}>
        <div className="exp-card__meta">
          <span className="exp-card__tag">{item.tag}</span>
          <span className="exp-card__period">{item.period}</span>
        </div>
        <h3 className="exp-card__company">{item.company}</h3>
        <p className="exp-card__role">{item.role}</p>
        <p className="exp-card__location">{item.location}</p>
        <button className="exp-card__toggle" aria-label="Toggle details">
          <span className={`exp-card__chevron ${open ? 'exp-card__chevron--open' : ''}`}>›</span>
        </button>
      </div>
      <div className={`exp-card__body ${open ? 'exp-card__body--open' : ''}`}>
        <ul className="exp-card__bullets">
          {item.bullets.map((b, i) => (
            <li key={i} className="exp-card__bullet">
              <span className="exp-card__bullet-dot" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectCard({ item, index }) {
  return (
    <article
      className="proj-card scroll-reveal"
      style={{ transitionDelay: `${index * 0.15}s`, '--accent': item.accent }}
    >
      <div className="proj-card__icon">{item.icon}</div>
      <div className="proj-card__stack">
        {item.stack.map(t => <span key={t} className="proj-card__tag">{t}</span>)}
      </div>
      <h3 className="proj-card__title">{item.title}</h3>
      <p className="proj-card__desc">{item.description}</p>
      <ul className="proj-card__bullets">
        {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <span className="proj-card__period">{item.period}</span>
    </article>
  );
}

function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section__inner">
        <SectionHeader eyebrow="Toolkit" title="Skills & Technologies" />
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <div key={cat} className="skills-group scroll-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h4 className="skills-group__title">{cat}</h4>
              <div className="skills-group__items">
                {items.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ps-banner scroll-reveal">
          <div className="ps-banner__icon">∑</div>
          <div className="ps-banner__text">
            <h4>Passionate About Problem Solving</h4>
            <p>
              From reducing a 900-person pension's funding uncertainty to teaching calculus to 200+ students,
              I gravitate toward the hard questions. I believe every dataset has a story — and I love being
              the one to find it. Currently preparing for the SOA Probability (P) exam as the next step in
              my actuarial journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-header scroll-reveal">
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2 className="section-header__title">{title}</h2>
      <div className="section-header__line" />
    </div>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section__inner">
        <SectionHeader eyebrow="Let's Connect" title="Get In Touch" />
        <div className="contact-grid scroll-reveal">
          <div className="contact-card">
            <span className="contact-card__icon">✉</span>
            <p className="contact-card__label">Email</p>
            <a href="mailto:esthermartinez751@gmail.com" className="contact-card__value">
              esthermartinez751@gmail.com
            </a>
          </div>
          <div className="contact-card">
            <span className="contact-card__icon">📞</span>
            <p className="contact-card__label">Phone</p>
            <a href="tel:6789008360" className="contact-card__value">(678) 900-8360</a>
          </div>
          <div className="contact-card">
            <span className="contact-card__icon">🔗</span>
            <p className="contact-card__label">LinkedIn</p>
            <a
              href="https://linkedin.com/in/esther-martinez-6141341aa/"
              target="_blank"
              rel="noreferrer"
              className="contact-card__value"
            >
              esther-martinez
            </a>
          </div>
        </div>
        <p className="contact-note scroll-reveal">
          Open to internships, research opportunities, and actuarial roles — especially at the intersection of data, finance, and mathematics.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        <span className="footer__em">Esther Martinez</span> · UGA Mathematics & CS · Built with React
      </p>
      <p className="footer__sub">ALPFA Member · TECHNOLOchicas Ambassador · Future Actuary</p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  useScrollReveal();

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Nav active={activeSection} />
      <Hero />

      <section className="section exp-section" id="experience">
        <div className="section__inner">
          <SectionHeader eyebrow="Career" title="Professional Experience" />
          <div className="exp-list">
            {EXPERIENCE.map((item, i) => <ExperienceCard key={item.company} item={item} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section proj-section" id="projects">
        <div className="section__inner">
          <SectionHeader eyebrow="Work" title="Featured Projects" />
          <div className="proj-grid">
            {PROJECTS.map((item, i) => <ProjectCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>

      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
