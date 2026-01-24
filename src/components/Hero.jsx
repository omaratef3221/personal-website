import { FiGithub, FiLinkedin, FiYoutube, FiArrowDown } from 'react-icons/fi';
import { SiHuggingface, SiGooglescholar } from 'react-icons/si';
import { motion } from 'framer-motion';
import portrait from '../assets/omar_portrait.png';
import './Hero.css';

const Hero = () => {
  const socialLinks = [
    { icon: <FiGithub size={22} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
    { icon: <FiLinkedin size={22} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
    { icon: <FiYoutube size={22} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
    { icon: <SiHuggingface size={22} />, href: 'https://huggingface.co/Omaratef3221', label: 'HuggingFace' },
    { icon: <SiGooglescholar size={22} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
  ];

  return (
    <section id="home" className="hero">
      <div className="bg-gradient-blur bg-gradient-blur-1"></div>
      <div className="bg-gradient-blur bg-gradient-blur-2"></div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Available for opportunities
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Omar Elgendy</span>
          </h1>

          <h2 className="hero-subtitle">
            Machine Learning Engineer & Data Scientist
          </h2>

          <p className="hero-description">
            I build production-ready AI solutions across Machine Learning, NLP, and Computer Vision.
            Specialized in scalable MLOps, cloud deployment, and fine-tuning large-scale transformer models.
            Published researcher with 6+ papers and 350+ citations.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">Publications</span>
            </div>
            <div className="stat">
              <span className="stat-number">350+</span>
              <span className="stat-label">Citations</span>
            </div>
          </div>

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="#projects" className="btn btn-secondary">
              View My Work
            </a>
          </div>

          <div className="hero-social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero-image-container">
            <img src={portrait} alt="Omar Elgendy" className="hero-image" />
            <div className="hero-image-border"></div>
            <div className="hero-image-glow"></div>
          </div>

          <div className="floating-card floating-card-1">
            <span className="floating-icon">🤖</span>
            <span>LLMs & RAG</span>
          </div>

          <div className="floating-card floating-card-2">
            <span className="floating-icon">☁️</span>
            <span>AWS & MLOps</span>
          </div>

          <div className="floating-card floating-card-3">
            <span className="floating-icon">🧠</span>
            <span>Deep Learning</span>
          </div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-indicator">
        <FiArrowDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
