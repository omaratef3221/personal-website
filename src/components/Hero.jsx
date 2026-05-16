import { FiGithub, FiLinkedin, FiYoutube, FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { SiHuggingface, SiGooglescholar } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import portrait800 from '../assets/omar_portrait_800.webp';
import portrait400 from '../assets/omar_portrait_400.webp';
import portraitJpg from '../assets/omar_portrait.jpg';
import { fetchScholarData, getCachedData } from '../services/scholarService';
import './Hero.css';

const Hero = () => {
  const [scholarStats, setScholarStats] = useState(() => {
    const cached = getCachedData();
    return cached?.stats ?? null;
  });

  useEffect(() => {
    fetchScholarData().then((data) => {
      if (data?.stats) setScholarStats(data.stats);
    });
  }, []);

  const socials = [
    { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
    { icon: <FiGithub size={18} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
    { icon: <SiGooglescholar size={18} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
    { icon: <SiHuggingface size={18} />, href: 'https://huggingface.co/Omaratef3221', label: 'Hugging Face' },
    { icon: <FiYoutube size={18} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
  ];

  const citations = scholarStats?.totalCitations ?? 490;
  const hIndex = scholarStats?.hIndex ?? 4;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow">Omar Elgendy &nbsp;·&nbsp; Dubai → Global</span>

          <h1 id="hero-title" className="hero-headline">
            Shipping ML in production. <br />
            Publishing it in <em>Q1 journals</em>.
          </h1>

          <p className="hero-lede">
            Machine Learning Engineer and AI Researcher with 6+ years building production
            ML, LLM, and RAG systems at scale on <strong>AWS</strong> and <strong>GCP</strong> —
            and {scholarStats ? `${citations}+` : '490+'} citations across {hIndex ? `h-index ${hIndex}` : '6+'}{' '}
            peer-reviewed publications in healthcare AI and NLP.
          </p>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-value">6+ yrs</span>
              <span className="hero-meta-label">Production ML</span>
            </div>
            <span className="hero-meta-divider" aria-hidden="true" />
            <div className="hero-meta-item">
              <span className="hero-meta-value">{citations}+</span>
              <span className="hero-meta-label">Citations</span>
            </div>
            <span className="hero-meta-divider" aria-hidden="true" />
            <div className="hero-meta-item">
              <span className="hero-meta-value">h-index {hIndex}</span>
              <span className="hero-meta-label">Google Scholar</span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View work <FiArrowUpRight size={16} />
            </a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Download CV
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch →
            </a>
          </div>

          <div className="hero-socials" aria-label="Social profiles">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="portrait-frame">
            <picture>
              <source
                type="image/webp"
                srcSet={`${portrait400} 400w, ${portrait800} 800w`}
                sizes="(max-width: 768px) 240px, 360px"
              />
              <img
                src={portraitJpg}
                alt="Portrait of Omar Elgendy, Machine Learning Engineer and AI Researcher"
                className="portrait-img"
                width="360"
                height="360"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </div>

          <div className="portrait-caption" aria-hidden="true">
            <div className="caption-row">
              <span className="caption-dot" />
              <span className="caption-text">Based in Dubai · UTC+4</span>
            </div>
            <div className="caption-row caption-muted">
              <span className="caption-text">ML Engineer &amp; AI Researcher</span>
            </div>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="scroll-cue-label">Scroll</span>
        <FiArrowDown size={16} />
      </a>
    </section>
  );
};

export default Hero;
