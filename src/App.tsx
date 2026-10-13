import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Download,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Network,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

type ThemeName = 'warm-sage' | 'noir-gold' | 'azure-horizon';

const themes: { name: ThemeName; label: string; dotClass: string }[] = [
  { name: 'warm-sage', label: 'Warm Sage', dotClass: 'theme-dot-sage' },
  { name: 'noir-gold', label: 'Noir & Gold', dotClass: 'theme-dot-noir' },
  { name: 'azure-horizon', label: 'Azure Horizon', dotClass: 'theme-dot-azure' },
];

type Experience = {
  period: string;
  company: string;
  role: string;
  location: string;
  current?: boolean;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    period: '2024 — Present',
    company: 'T-Mobile USA',
    role: 'Enterprise Architect',
    location: 'Bellevue, WA',
    current: true,
    bullets: [
      'Architect and own the product roadmap for customer identity and self-verification experiences across retail, digital, and assisted channels.',
      'Build platform capabilities for passwordless authentication, distributed tracing, and AI-powered application patterns.',
    ],
  },
  {
    period: '2023 — 2024',
    company: 'Ascendion (Collabera)',
    role: 'Cloud Solutions Architect, Products & Platforms Lead',
    location: 'Redmond, WA',
    bullets: [
      'Designed and built cloud-native solutions and platform prototypes for enterprise clients including Verizon, AT&T, T-Mobile, Amazon, Lexis-Nexis, and Cisco.',
      'Partnered with client engineering, product, and marketing teams to shape delivery plans, SOWs, and RFP responses.',
    ],
  },
  {
    period: '2012 — 2023',
    company: 'T-Mobile USA',
    role: 'Principal Technical Product Architect',
    location: 'Bellevue, WA',
    bullets: [
      'Owned end-to-end delivery of three internal products: real-time fraud detection, a product-health visualization platform, and microservices performance monitoring.',
      'Led the re-platforming of T-Mobile’s billing and service layer, improving scalability and performance for customer-facing applications.',
    ],
  },
  {
    period: '2009 — 2012',
    company: 'European Computer Telecoms (ECT)',
    role: 'Director of Solutions, Telephony Solutions',
    location: 'Dallas, TX',
    bullets: [
      'Built a process that reduced ring-back-to-route (RBT) system error rates to less than 5% annually.',
      'Drove a new system architecture tied to $2M in software and hardware delivery with $5M projected year-over-year licensing revenue.',
    ],
  },
];

const skillGroups = [
  { label: 'Architecture', items: ['API & Microservices', 'Cloud-native SaaS', 'Event-driven systems', 'Distributed tracing'] },
  { label: 'AI & Data', items: ['LLM application patterns', 'RAG & vector search', 'Agentic systems', 'AI evaluation & guardrails'] },
  { label: 'Platforms', items: ['AWS', 'Kubernetes', 'Docker', 'OpenTelemetry'] },
  { label: 'Leadership', items: ['Product roadmaps', 'SAFe & Agile', 'DevOps & CI/CD', 'Cross-functional teams'] },
];

const projects = [
  {
    number: '01',
    eyebrow: 'Product platform',
    title: 'Real-time fraud detection',
    description: 'A production-ready platform that brought high-speed fraud detection to the heart of the customer experience.',
    tags: ['Microservices', 'Cloud native', '80% fraud reduction'],
    icon: Network,
  },
  {
    number: '02',
    eyebrow: 'Observability',
    title: 'Product health visualization',
    description: 'A visual operating layer for product health, helping teams move from fragmented signals to confident decisions.',
    tags: ['Data platform', '40% adoption', 'OpenTelemetry'],
    icon: Sparkles,
  },
  {
    number: '03',
    eyebrow: 'Identity experience',
    title: 'Passwordless authentication',
    description: 'Federated identity and biometric-ready authentication capabilities designed to reduce customer friction at scale.',
    tags: ['SAML / OIDC', 'FIDO2', 'Security'],
    icon: Code2,
  },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [activeTheme, setActiveTheme] = useState<ThemeName>(() => {
    return (localStorage.getItem('portfolio-theme') as ThemeName) || 'warm-sage';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('portfolio-theme', activeTheme);
  }, [activeTheme]);

  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      subject: `New contact form submission from ${formData.get('name')}`,
      from_name: 'Portfolio Website',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to send message.');
      }

      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setFormStatus('error');
      setFormError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Yosef Yaaran home">
            <span className="brand-mark">Y</span>
            <span>Yosef Yaaran</span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {['about', 'experience', 'skills', 'work', 'contact'].map((item) => (
              <a href={`#${item}`} key={item} onClick={closeMenu}>{item}</a>
            ))}
            <a className="nav-cta" href="mailto:seffi@gmail.com" onClick={closeMenu}>Let’s connect <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero container reveal">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Enterprise architecture · AI · Product</p>
            <h1>Building the systems behind <em>what's next.</em></h1>
            <p className="hero-intro">Yosef (Seffi) Yaaran is an enterprise architect and technical product leader translating complex technology into products people can trust.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">View selected work <ArrowUpRight size={17} /></a>
              <a className="text-link" href="mailto:seffi@gmail.com">seffi@gmail.com <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-aside">
            <div className="orbit-card">
              <div className="orbit-line orbit-line-one" />
              <div className="orbit-line orbit-line-two" />
              <div className="orbit-core"><span>SY</span></div>
              <span className="orbit-label orbit-label-top">15+ years</span>
              <span className="orbit-label orbit-label-right">Systems thinking</span>
              <span className="orbit-label orbit-label-bottom">Human outcomes</span>
            </div>
          </div>
        </section>

        <div className="scroll-cue"><ChevronDown size={16} /> Scroll to explore</div>

        <section className="section about-section" id="about">
          <div className="container split-layout">
            <div className="section-heading reveal"><span className="section-number">01</span><h2>A breadth-first<br /><em>way of thinking.</em></h2></div>
            <div className="about-content reveal reveal-delay-1">
              <p className="lead-copy">I work where enterprise architecture, product strategy, and emerging technology meet. Over 15+ years, I’ve helped large-scale organizations move from ambitious concepts to durable, measurable platforms.</p>
              <p>My approach is equal parts systems thinking and practical delivery: connect the dots, make complexity legible, and help teams build with confidence. These days, that means shaping identity experiences, cloud-native platforms, and the responsible use of AI.</p>
              <div className="fact-row"><div><strong>Based in</strong><span>Seattle, WA</span></div><div><strong>Focus</strong><span>Architecture & product</span></div><div><strong>Languages</strong><span>English · Hebrew</span></div></div>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container">
            <div className="section-heading heading-wide reveal"><span className="section-number">02</span><div><h2>Experience that<br /><em>compounds.</em></h2><p>Selected chapters from a career spent making technical possibility real.</p></div></div>
            <div className="timeline">
              {experiences.map((experience, index) => (
                <article className={`timeline-item reveal reveal-delay-${Math.min(index + 1, 3)}`} key={`${experience.company}-${experience.period}`}>
                  <div className="timeline-marker"><span /></div>
                  <div className="timeline-meta"><span className={experience.current ? 'current-tag' : ''}>{experience.period}</span><span>{experience.location}</span></div>
                  <div className="timeline-content"><p className="company-name">{experience.company}</p><h3>{experience.role}</h3><ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container split-layout">
            <div className="section-heading reveal"><span className="section-number">03</span><h2>Tools for the<br /><em>long view.</em></h2></div>
            <div className="skills-grid reveal reveal-delay-1">
              {skillGroups.map((group) => <div className="skill-group" key={group.label}><h3>{group.label}</h3>{group.items.map((item) => <div className="skill-item" key={item}><Check size={15} />{item}</div>)}</div>)}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-heading heading-wide reveal"><span className="section-number">04</span><div><h2>Selected <em>highlights.</em></h2><p>A few examples of the problems, platforms, and possibilities I’ve helped shape.</p></div></div>
            <div className="project-grid">
              {projects.map((project, index) => { const Icon = project.icon; return <article className={`project-card project-card-${index + 1} reveal reveal-delay-${index + 1}`} key={project.number}><div className="project-top"><span className="project-number">{project.number}</span><Icon size={22} strokeWidth={1.5} /></div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href="#contact">Discuss the work <ArrowUpRight size={15} /></a></article>; })}
            </div>
          </div>
        </section>

        <section className="section education-section">
          <div className="container education-grid reveal">
            <div><p className="eyebrow">Education & certifications</p><h2>Always learning.<br /><em>Always sharing.</em></h2></div>
            <div className="education-list"><p><strong>Education</strong> Data Science / Machine Learning — University of Washington<br />Executive MBA — University of Texas at Mannheim<br />BS, Physics & Materials Engineering — Ben-Gurion University of the Negev</p><p><strong>AWS certifications</strong> AWS Certified Solutions Architect · AWS Certified Cloud Developer · AWS Certified Cloud Practitioner</p><p><strong>AI/ML certifications</strong> Machine Learning Specialization · How Transformer LLMs Work · Attention in Transformers: Concepts and Code in PyTorch · Vector Databases: from Embeddings to Applications · Building and Evaluating Advanced RAG · AI Agents Fundamentals</p><p><strong>Community</strong> Member, Israeli AI Community — a monthly peer group of AI practitioners from leading technology firms.</p></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-inner reveal">
            <div className="contact-left">
              <p className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> Open to meaningful conversations</p>
              <h2>Let’s make the<br /><em>complex clear.</em></h2>
              <p className="contact-copy-text">Have a big platform problem, a product at an inflection point, or an idea worth pressure-testing? I’d like to hear about it.</p>
              <a className="button button-light resume-btn" href="/Yosef-Yaaran-Resume.pdf" download>
                <Download size={17} /> Download résumé
              </a>
            </div>
            <div className="contact-form-wrap">
              {formStatus === 'success' ? (
                <div className="form-success">
                  <Check size={40} />
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out — I’ll get back to you shortly.</p>
                  <button className="button button-light" onClick={() => setFormStatus('idle')}>Send another <Send size={15} /></button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name" disabled={formStatus === 'submitting'} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="you@example.com" disabled={formStatus === 'submitting'} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} required placeholder="Tell me about your project, problem, or idea…" disabled={formStatus === 'submitting'} />
                  </div>
                  {formStatus === 'error' && <p className="form-error">{formError}</p>}
                  <button type="submit" className="button button-light submit-btn" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? <>Sending… <Loader2 size={16} className="spin" /></> : <>Send message <Send size={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Yosef (Seffi) Yaaran</span><div className="social-links"><a href="mailto:seffi@gmail.com" aria-label="Email Yosef"><Mail size={17} /></a><a href="https://www.linkedin.com/in/seffiyaaran" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a className="placeholder-link" href="#contact" aria-label="GitHub placeholder"><Github size={17} /><span>GitHub — add link</span></a></div><span className="footer-note"><MapPin size={14} /> Seattle, WA</span></div></footer>

      <div className="theme-switcher" role="group" aria-label="Theme switcher">
        <span className="theme-switcher-label">Theme</span>
        {themes.map((t) => (
          <button
            key={t.name}
            className={`theme-dot ${t.dotClass} ${activeTheme === t.name ? 'is-active' : ''}`}
            onClick={() => setActiveTheme(t.name)}
            aria-label={t.label}
            title={t.label}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
