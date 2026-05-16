import { FiGithub, FiLinkedin, FiYoutube, FiMail, FiArrowUp } from 'react-icons/fi';
import { SiHuggingface, SiMedium, SiGooglescholar, SiResearchgate } from 'react-icons/si';
import './Footer.css';

const socials = [
  { icon: <FiLinkedin size={16} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
  { icon: <FiGithub size={16} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
  { icon: <SiGooglescholar size={16} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
  { icon: <SiResearchgate size={16} />, href: 'https://www.researchgate.net/profile/Omar-Elgendy-4', label: 'ResearchGate' },
  { icon: <SiHuggingface size={16} />, href: 'https://huggingface.co/Omaratef3221', label: 'Hugging Face' },
  { icon: <SiMedium size={16} />, href: 'https://medium.com/@omaratef3221', label: 'Medium' },
  { icon: <FiYoutube size={16} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
  { icon: <FiMail size={16} />, href: 'mailto:omaratef3221@gmail.com', label: 'Email' },
];

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-top">
        <a href="#home" className="footer-brand">
          <span className="brand-mark" aria-hidden="true">OE</span>
          <span>Omar Elgendy</span>
        </a>

        <p className="footer-tag">
          Machine Learning Engineer &amp; AI Researcher. Production ML, LLMs, MLOps on AWS &amp; GCP.
        </p>

        <nav className="footer-nav" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#publications">Research</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </div>

      <div className="footer-socials">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="footer-social"
            aria-label={s.label}
            title={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-meta">
          © {new Date().getFullYear()} Omar Elgendy. All rights reserved.
        </p>
        <p className="footer-meta">
          <span className="footer-dot" aria-hidden="true">·</span>
          Designed &amp; built in Dubai.
        </p>
        <a href="#home" className="footer-top-link" aria-label="Back to top">
          Back to top <FiArrowUp size={13} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
