import { FiGithub, FiLinkedin, FiYoutube, FiMail } from 'react-icons/fi';
import { SiHuggingface, SiMedium, SiGooglescholar, SiResearchgate } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub size={20} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
    { icon: <FiYoutube size={20} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
    { icon: <SiHuggingface size={20} />, href: 'https://huggingface.co/Omaratef3221', label: 'HuggingFace' },
    { icon: <SiMedium size={20} />, href: 'https://medium.com/@omaratef3221', label: 'Medium' },
    { icon: <SiGooglescholar size={20} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
    { icon: <SiResearchgate size={20} />, href: 'https://www.researchgate.net/profile/Omar-Elgendy-4', label: 'ResearchGate' },
    { icon: <FiMail size={20} />, href: 'mailto:omaratef3221@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-text">Omar</span>
              <span className="logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              Building intelligent solutions with AI & Machine Learning
            </p>
          </div>

          <div className="footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Omar Elgendy. All rights reserved.
          </p>
          <p className="footer-made">
            Designed & Built with <span className="heart">&#10084;</span> in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
