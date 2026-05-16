import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import './Experience.css';

const experiences = [
  {
    title: 'Machine Learning Specialist',
    company: 'Almosafer',
    location: 'Dubai, UAE',
    period: 'Sep 2025 — Present',
    current: true,
    bullets: [
      'Engineered and deployed a production-grade ML forecasting system for flight add-on revenue, driving a 55% increase in profits.',
      'Developed an XGBoost-based financial forecasting model that reduced MAPE error by 80%, directly improving budgeting accuracy.',
      'Designed an ML bidding strategy for Google Ads, reducing customer acquisition costs by 30% via dynamic bid optimization.',
      'Architected end-to-end MLOps pipelines on AWS SageMaker and MLflow — automating training, versioning, and deployment at scale.',
      'Built a production voice AI agent using Retell AI, tuning dialogue flow, LLM response quality, and call-handling latency.',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Virtue Therapy',
    location: 'Dubai, UAE',
    period: 'Jan 2023 — Aug 2025',
    bullets: [
      'Shipped production LLM applications — chatbots, document Q&A, intelligent assistants — using Transformers, LangChain, and RAG with 85%+ task accuracy.',
      'Deployed serverless AI APIs on Docker + AWS Lambda, cutting hosting cost 25% and maintaining sub-3s latency at 1000 RPS.',
      'Built MLOps pipelines on SageMaker, MLflow, Airflow, and TorchServe — reducing deploy time by 30% with versioning, CI/CD, and monitoring.',
      'Fine-tuned transformers with QLoRA and LoRA across tourism, agriculture, and healthcare domains — up to 18% task accuracy lift.',
      'Engineered optimized prompts and RLHF to improve summarization and multi-turn dialogue performance.',
    ],
  },
  {
    title: 'Junior Machine Learning Engineer',
    company: 'Virtue Therapy',
    location: 'Dubai, UAE',
    period: 'Feb 2021 — Jan 2023',
    bullets: [
      'Built and deployed ML models for user behavior prediction (mood analysis, psychological profiling, sentiment), improving engagement insights by 30%.',
      'Designed classic ML models (random forests, XGBoost, SVMs) on structured data, improving prediction accuracy up to 22% over baseline.',
      'Owned end-to-end ML workflows — preprocessing, EDA, training, tuning, evaluation — using Scikit-learn, TensorFlow, PyTorch (+20% precision).',
      'Implemented experiment tracking and model versioning for reproducibility and lifecycle management.',
    ],
  },
  {
    title: 'Research Assistant',
    company: 'University of Sharjah',
    location: 'Sharjah, UAE',
    period: 'Aug 2020 — Feb 2021',
    bullets: [
      'Authored 6+ peer-reviewed AI papers — 2 in Q1-ranked journals — with 490+ citations and h-index 4 (deep learning, NLP, clinical applications).',
      "Master's thesis: optimized Arabic text summarization by fine-tuning transformers with RBF Networks, reducing training time by 45%.",
      'BERT-based Arabic fake news detection at 90%+ accuracy, published in high-impact NLP journals.',
      "Designed deep learning architectures for Alzheimer's detection (MRI) and heart failure prediction (structured medical data).",
    ],
  },
];

const education = [
  {
    degree: 'M.Sc. in Computer Engineering',
    specialization: 'Artificial Intelligence',
    institution: 'University of Sharjah',
    period: 'Sep 2020 — Dec 2024',
    note: "Thesis: Optimizing LLMs for Arabic Text Summarization with RBF Networks.",
  },
  {
    degree: 'B.Sc. in Computer Engineering',
    institution: 'University of Sharjah',
    period: 'Sep 2016 — Aug 2020',
    note: 'Senior project: EEG-based computer command input for paralyzed users.',
  },
];

const Experience = () => (
  <section id="experience" className="section experience" aria-labelledby="exp-title">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">02 — Experience</span>
        <h2 id="exp-title" className="section-title">
          Built and shipped <em>at scale</em>.
        </h2>
        <p className="section-subtitle">
          Production ML across travel, healthcare, and research. Owning outcomes from data to deploy.
        </p>
      </motion.div>

      <ol className="timeline">
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.title + exp.period}
            className="timeline-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="timeline-marker" aria-hidden="true">
              <span className={`marker-dot ${exp.current ? 'is-current' : ''}`} />
              {i < experiences.length - 1 && <span className="marker-line" />}
            </div>

            <div className="timeline-body">
              <div className="timeline-head">
                <h3 className="role-title">
                  {exp.title}{' '}
                  <span className="role-company">· {exp.company}</span>
                </h3>
                {exp.current && <span className="badge-current">Current</span>}
              </div>

              <div className="role-meta">
                <span className="meta-pill">
                  <FiCalendar size={13} /> {exp.period}
                </span>
                <span className="meta-pill">
                  <FiMapPin size={13} /> {exp.location}
                </span>
              </div>

              <ul className="role-bullets">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div
        className="edu-section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <h3 className="edu-heading">
          <FiBookOpen size={18} /> Education
        </h3>

        <div className="edu-grid">
          {education.map((edu) => (
            <article key={edu.degree} className="edu-card">
              <h4 className="edu-degree">{edu.degree}</h4>
              {edu.specialization && (
                <p className="edu-spec">{edu.specialization}</p>
              )}
              <p className="edu-school">{edu.institution}</p>
              <p className="edu-period">{edu.period}</p>
              {edu.note && <p className="edu-note">{edu.note}</p>}
            </article>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Experience;
