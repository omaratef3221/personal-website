import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import './About.css';

const About = () => {
  const highlights = [
    {
      icon: '🎯',
      title: 'Production AI',
      description: 'Building and deploying ML solutions that drive real business outcomes',
    },
    {
      icon: '🔬',
      title: 'Research',
      description: '6+ peer-reviewed publications in healthcare AI, NLP, and deep learning',
    },
    {
      icon: '☁️',
      title: 'MLOps',
      description: 'Scalable pipelines on AWS, Docker, and modern ML infrastructure',
    },
    {
      icon: '🤖',
      title: 'LLMs & RAG',
      description: 'Fine-tuning transformers with QLoRA, LoRA, RLHF for production apps',
    },
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about building intelligent systems that make a difference
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I'm a Machine Learning Engineer and Data Scientist with <strong>5+ years</strong> of
              experience delivering production-ready AI solutions. Currently based in <strong>Dubai, UAE</strong>,
              I specialize in building scalable machine learning systems across NLP, Computer Vision,
              and deep learning domains.
            </p>
            <p>
              My journey spans from research to production — I hold an <strong>M.Sc. in Computer Engineering
              (AI)</strong> from the University of Sharjah, where I focused on optimizing Large Language Models
              for Arabic text summarization. This academic foundation, combined with hands-on industry
              experience, allows me to bridge cutting-edge research with practical business applications.
            </p>
            <p>
              I'm passionate about the entire ML lifecycle: from experimentation and model development
              to MLOps, deployment, and monitoring. I've successfully deployed LLM applications achieving
              <strong>85%+ accuracy</strong>, reduced ML deployment time by <strong>30%</strong>, and cut hosting costs by
              <strong>25%</strong> through optimized architectures.
            </p>

            <div className="about-info">
              <div className="info-item">
                <FiMapPin />
                <span>Dubai, United Arab Emirates</span>
              </div>
              <div className="info-item">
                <FiMail />
                <a href="mailto:omaratef3221@gmail.com">omaratef3221@gmail.com</a>
              </div>
              <div className="info-item">
                <FiPhone />
                <span>+971-558980116</span>
              </div>
            </div>

            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FiDownload />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="highlight-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="highlight-icon">{item.icon}</span>
                <div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
