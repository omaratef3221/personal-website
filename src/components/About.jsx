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
              Machine Learning Engineer and AI Researcher with <strong>6+ years</strong> building and deploying
              production ML systems across classical ML, deep learning, and LLMs.
            </p>
            <p>
              I work across the full ML spectrum — from tree-based models and ensemble methods on structured data,
              to transformer fine-tuning, RAG systems, and end-to-end MLOps pipelines on <strong>AWS</strong> and <strong>GCP</strong>.
              My focus is always on solutions that deliver measurable business impact.
            </p>
            <p>
              Strong MLOps background: reproducible pipelines, experiment tracking, model versioning, and automated
              deployment using <strong>SageMaker</strong>, <strong>MLflow</strong>, <strong>Airflow</strong>, <strong>Docker</strong>, and <strong>Lambda</strong>.
            </p>
            <p>
              Published researcher: <strong>6+ peer-reviewed papers</strong> (490+ citations, h-index 4) in Q1 journals —
              covering Arabic NLP, healthcare AI, and transformer optimization. Currently ML Engineer in travel tech
              and part-time researcher at <strong>University of Sharjah</strong>.
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
