import { useEffect, useRef, useState } from 'react';
import '../styles.css';

const projects = [
  { number: '01', title: 'Field Notes', details: 'Identity / Editorial / 2024', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85', alt: 'Editorial design layouts on a desk', className: 'project-featured' },
  { number: '02', title: 'Common Ground', details: 'Product / Strategy / 2023', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85', alt: 'Mobile product interface prototypes' },
  { number: '03', title: 'Good Goods', details: 'Art direction / Digital / 2022', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85', alt: 'Warmly lit retail space', className: 'project-wide' },
];

const interests = [
  { number: '01', title: 'Long walks', details: 'Fresh air, big landscapes.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85', alt: 'Snowy mountain landscape' },
  { number: '02', title: 'Good coffee', details: 'The fuel behind the pixels.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85', alt: 'Coffee and notebook on a table' },
  { number: '03', title: 'Loud music', details: 'Quietly collecting records.', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85', alt: 'Concert crowd under red lights' },
];

function useReveal() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      setVisibleItems((current) => {
        const next = new Set(current);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            next.add(entry.target.dataset.revealId);
            observerRef.current.unobserve(entry.target);
          }
        });
        return next;
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal-id]').forEach((item) => observerRef.current.observe(item));
    return () => observerRef.current?.disconnect();
  }, []);

  return visibleItems;
}

function Header({ menuOpen, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false);

  return <header className="site-header">
    <a className="wordmark" href="#top" aria-label="Aarav Mehta home">AM<span className="dot">.</span></a>
    <div className="header-meta"><span className="status-dot" /> Available for select projects</div>
    <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}><span>Menu</span><span className="menu-icon"><i /><i /></span></button>
    <nav className={`site-nav${menuOpen ? ' open' : ''}`} id="site-nav" aria-label="Main navigation">
      <a href="#work" onClick={closeMenu}>Selected work <span>01</span></a>
      <a href="#about" onClick={closeMenu}>About me <span>02</span></a>
      <a href="#contact" onClick={closeMenu}>Let's talk <span>03</span></a>
    </nav>
  </header>;
}

function ProjectCard({ project, index, visibleItems }) {
  const revealId = `project-${index}`;
  return <a className={`project ${project.className || ''} ${visibleItems.has(revealId) ? 'is-visible' : ''}`} data-reveal-id={revealId} href="#contact">
    <div className="project-image"><img src={project.image} alt={project.alt} /></div>
    <div className="project-info"><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.details}</p><span className="arrow">↗</span></div>
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleItems = useReveal();

  return <>
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main id="top">
      <section className="intro" aria-labelledby="intro-title"><p className="eyebrow">Independent designer / developer<br />London — 2025</p><h1 id="intro-title">I make<br /><em>useful</em> things<br />feel <span className="outlined">alive</span><span className="red">.</span></h1><div className="intro-bottom"><p className="intro-note">Digital products, identities<br />and little experiments.</p><a className="scroll-cue" href="#work">Scroll to explore <span>↓</span></a></div></section>
      <section className="work-section" id="work" aria-labelledby="work-title"><div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2 id="work-title">A few things<br /><em>in the world.</em></h2></div><div className="project-list">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} visibleItems={visibleItems} />)}</div></section>
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="section-heading"><p className="eyebrow">02 / A little about me</p><h2 id="about-title">The person<br />behind the <em>pixels.</em></h2></div><div className="about-grid"><div className="portrait-wrap"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=85" alt="Portrait of Aarav Mehta" /><span className="portrait-label">That's me, usually<br />thinking too much.</span></div><div className={`about-copy ${visibleItems.has('about') ? 'is-visible' : ''}`} data-reveal-id="about"><p className="lead">I’m Aarav, a designer and creative developer who likes working where a good idea meets a good cup of coffee.</p><p>I help ambitious teams turn complicated things into clear, human experiences. When I’m away from my screen, I’m probably taking photos, hunting down the city’s best noodles, or trying to make a record in my bedroom.</p><div className="facts"><div><span>Based in</span><strong>London, UK</strong></div><div><span>Currently</span><strong>Making digital things</strong></div><div><span>Say hello</span><strong>hello@aarav.studio</strong></div></div></div></div></section>
      <section className="interests" aria-label="Things that inspire me"><div className="interest-intro"><p className="eyebrow">03 / Outside of work</p><p>Small obsessions that<br />make the work better.</p></div><div className="interest-track">{interests.map((interest, index) => { const revealId = `interest-${index}`; return <article className={`interest-card ${visibleItems.has(revealId) ? 'is-visible' : ''}`} data-reveal-id={revealId} key={interest.number}><img src={interest.image} alt={interest.alt} /><div><span>{interest.number}</span><h3>{interest.title}</h3><p>{interest.details}</p></div></article>; })}</div></section>
      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="eyebrow">04 / Have a good one?</p><h2 id="contact-title">Let’s make<br /><em>something</em><br />together<span className="red">.</span></h2><a className="contact-link" href="mailto:hello@aarav.studio">hello@aarav.studio <span>↗</span></a></section>
    </main>
    <footer><span>© 2025 Aarav Mehta</span><span>London / UK</span><a href="#top">Back to top ↑</a></footer>
  </>;
}

export default App;
