import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      icon: '🤖',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'TensorFlow', level: 90 },
        { name: 'PyTorch', level: 90 },
        { name: 'Scikit-learn', level: 92 },
        { name: 'Transformers', level: 88 },
        { name: 'XGBoost', level: 85 },
      ],
    },
    {
      title: 'LLMs & NLP',
      icon: '🧠',
      skills: [
        { name: 'LangChain', level: 90 },
        { name: 'LangGraph', level: 85 },
        { name: 'RAG Systems', level: 88 },
        { name: 'Fine-tuning (LoRA/QLoRA)', level: 88 },
        { name: 'RLHF', level: 82 },
        { name: 'NLTK', level: 85 },
      ],
    },
    {
      title: 'MLOps & Cloud',
      icon: '☁️',
      skills: [
        { name: 'AWS SageMaker', level: 88 },
        { name: 'Docker', level: 90 },
        { name: 'MLflow', level: 88 },
        { name: 'Airflow', level: 85 },
        { name: 'CI/CD', level: 85 },
        { name: 'Kubernetes', level: 75 },
      ],
    },
    {
      title: 'Data & Backend',
      icon: '💾',
      skills: [
        { name: 'SQL/PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 85 },
        { name: 'FastAPI', level: 88 },
        { name: 'Flask', level: 85 },
        { name: 'Apache Spark', level: 78 },
        { name: 'NumPy/Pandas', level: 95 },
      ],
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

              <div className="skills-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
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
