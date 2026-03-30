import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      icon: '🤖',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Transformers', 'XGBoost', 'Keras', 'NumPy', 'Pandas'],
    },
    {
      title: 'LLMs & NLP',
      icon: '🧠',
      skills: ['LangChain', 'LangGraph', 'RAG Systems', 'Fine-tuning (LoRA/QLoRA)', 'RLHF', 'NLTK', 'Prompt Engineering', 'Retell AI'],
    },
    {
      title: 'MLOps & Cloud',
      icon: '☁️',
      skills: ['AWS SageMaker', 'Docker', 'MLflow', 'Airflow', 'CI/CD', 'Kubernetes', 'TorchServe', 'AWS Lambda', 'GCP'],
    },
    {
      title: 'Data & Backend',
      icon: '💾',
      skills: ['SQL/PostgreSQL', 'MongoDB', 'FastAPI', 'Flask', 'Apache Spark', 'Prometheus', 'Grafana', 'Git', 'Linux'],
    },
  ];

  const toolsAndTech = [
    'Python', 'TensorFlow', 'PyTorch', 'Transformers', 'LangChain', 'LangGraph',
    'AWS', 'Docker', 'Kubernetes', 'MLflow', 'Airflow', 'SageMaker',
    'PostgreSQL', 'MongoDB', 'FastAPI', 'Flask', 'Git', 'Linux',
    'Prometheus', 'Grafana', 'TorchServe', 'NumPy', 'Pandas', 'Keras',
    'NLTK', 'XGBoost', 'Scikit-learn', 'Jupyter', 'GCP', 'Azure',
  ];

  return (
    <section id="skills" className="section skills">
      <div className="bg-gradient-blur bg-gradient-blur-1"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <div className="skills-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tools-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="tools-title">Technologies I Work With</h3>
          <div className="tools-cloud">
            {toolsAndTech.map((tool, index) => (
              <motion.span
                key={tool}
                className="tool-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ scale: 1.1 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
