import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiDownload, FiArrowUpRight } from 'react-icons/fi';
import './About.css';

const pillars = [
  {
    label: 'Production AI',
    body:
      'I ship — not just prototype. End-to-end ownership from problem framing to deployed services handling real traffic, real revenue, real on-call.',
  },
  {
    label: 'Applied Research',
    body:
      '6+ peer-reviewed papers in Q1 journals (490+ citations, h-index 4) across NLP, transformer optimization, and clinical ML.',
  },
  {
    label: 'MLOps & Infra',
    body:
      'AWS SageMaker, MLflow, Airflow, Docker, Lambda — reproducible pipelines, model versioning, CI/CD for ML.',
  },
  {
    label: 'LLMs & RAG',
    body:
      'Fine-tuning transformers with LoRA / QLoRA / RLHF and shipping RAG systems with LangChain & LangGraph in production.',
  },
];

const About = () => (
  <section id="about" className="section about" aria-labelledby="about-title">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">01 — About</span>
        <h2 id="about-title" className="section-title">
          The intersection of <em>engineering</em> and <em>research</em>.
        </h2>
        <p className="section-subtitle">
          A rare combination of someone who can both prove a result in a journal and run it on production
          infrastructure at scale.
        </p>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-prose"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p>
            I'm a Machine Learning Engineer with <strong>6+ years</strong> of production experience across
            classical ML, deep learning, and modern LLM systems. My focus is the unsexy parts that decide whether
            an ML feature actually ships: data, evaluation, latency, cost, observability, and the operating model
            around the model.
          </p>
          <p>
            On the research side, I authored <strong>6+ peer-reviewed papers</strong> with 490+ citations and an
            h-index of 4 — work spanning Arabic NLP, healthcare AI, and transformer optimization. I currently work
            as ML Engineer in travel tech and continue as a part-time researcher at the{' '}
            <strong>University of Sharjah</strong>.
          </p>
          <p>
            I work best where the problem is genuinely hard — where shipping it requires both a research mindset
            and engineering discipline. Comfortable embedding with product, leading technical decisions, and
            mentoring.
          </p>

          <div className="about-meta">
            <div className="about-meta-item">
              <FiMapPin size={16} />
              <span>Dubai, UAE</span>
            </div>
            <div className="about-meta-item">
              <FiMail size={16} />
              <a href="mailto:omaratef3221@gmail.com">omaratef3221@gmail.com</a>
            </div>
          </div>

          <div className="about-actions">
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FiDownload size={16} /> Download CV
            </a>
            <a href="#contact" className="btn btn-secondary">
              Start a conversation <FiArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="about-pillars"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              className="pillar"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: 0.06 * i }}
            >
              <span className="pillar-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pillar-label">{p.label}</h3>
              <p className="pillar-body">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
