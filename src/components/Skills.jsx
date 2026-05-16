import { motion } from 'framer-motion';
import './Skills.css';

const categories = [
  {
    title: 'Machine Learning & AI',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Transformers', 'XGBoost', 'Keras', 'NumPy', 'Pandas'],
  },
  {
    title: 'LLMs & NLP',
    skills: ['LangChain', 'LangGraph', 'RAG', 'Fine-tuning (LoRA / QLoRA)', 'RLHF', 'Prompt Engineering', 'NLTK', 'Retell AI'],
  },
  {
    title: 'MLOps & Cloud',
    skills: ['AWS SageMaker', 'GCP Vertex AI', 'Docker', 'Kubernetes', 'MLflow', 'Airflow', 'TorchServe', 'AWS Lambda', 'CI/CD'],
  },
  {
    title: 'Data & Backend',
    skills: ['PostgreSQL', 'MongoDB', 'FastAPI', 'Flask', 'Apache Spark', 'Prometheus', 'Grafana', 'Git', 'Linux'],
  },
];

const stack = [
  'Python', 'PyTorch', 'TensorFlow', 'Transformers', 'LangChain', 'LangGraph',
  'AWS', 'GCP', 'Docker', 'Kubernetes', 'MLflow', 'Airflow', 'SageMaker', 'Vertex AI',
  'PostgreSQL', 'MongoDB', 'FastAPI', 'Flask', 'Apache Spark', 'Git', 'Linux',
  'Prometheus', 'Grafana', 'TorchServe', 'NumPy', 'Pandas', 'Keras',
  'XGBoost', 'Scikit-learn', 'NLTK', 'Jupyter', 'Azure',
];

const Skills = () => (
  <section id="skills" className="section skills" aria-labelledby="skills-title">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">03 — Toolkit</span>
        <h2 id="skills-title" className="section-title">
          Skills &amp; <em>stack</em>.
        </h2>
        <p className="section-subtitle">
          The tools, frameworks, and infrastructure I use to take ML from notebook to production.
        </p>
      </motion.div>

      <div className="skills-grid">
        {categories.map((cat, i) => (
          <motion.article
            key={cat.title}
            className="skill-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <div className="skill-card-head">
              <span className="skill-card-num">0{i + 1}</span>
              <h3 className="skill-card-title">{cat.title}</h3>
            </div>

            <ul className="skill-list">
              {cat.skills.map((s) => (
                <li key={s} className="skill-item">{s}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="stack-section"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <span className="eyebrow">Full stack</span>
        <div className="stack-cloud">
          {stack.map((tool) => (
            <span key={tool} className="stack-chip">{tool}</span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
