import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Machine Learning Specialist',
      company: 'Almosafer',
      location: 'Dubai, United Arab Emirates',
      period: 'Sep 2025 - Present',
      current: true,
      description: [
        'Engineered and deployed a production-grade ML forecasting system for flight add-on revenue, driving a 55% increase in profits.',
        'Developed an XGBoost-based financial forecasting model that reduced prediction MAPE error by 80%, directly improving budgeting accuracy.',
        'Designed and implemented an ML bidding strategy for Google Ads, reducing customer acquisition costs by 30% through dynamic bid optimization.',
        'Architected end-to-end MLOps pipelines on AWS SageMaker and MLflow, automating model training, versioning, and deployment at scale.',
        'Architecting a production voice AI agent using Retell AI, optimizing dialogue flow, LLM response quality, and call handling latency for real-time customer interactions.',
      ],
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Virtue Therapy',
      location: 'Dubai, United Arab Emirates',
      period: 'Jan 2023 - Aug 2025',
      description: [
        'Developed and deployed production-grade LLM applications for chatbots, document Q&A, and intelligent assistants using Transformers, LangChain, and RAG, achieving over 85% accuracy in real-world tasks.',
        'Deployed serverless AI APIs using Docker and AWS Lambda, reducing hosting costs by 25% and maintaining sub-3-second response latency under 1000 RPS.',
        'Built scalable MLOps pipelines on AWS SageMaker, MLflow, Airflow, and TorchServe, cutting deployment time by 30% and automating versioning, CI/CD, and monitoring.',
        'Fine-tuned transformer models with QLoRA and LoRA across tourism, agriculture, and healthcare, improving task accuracy by up to 18%.',
        'Engineered optimized prompts and RLHF to enhance LLM summarization and multi-turn dialogue performance.',
      ],
    },
    {
      title: 'Junior Machine Learning Engineer',
      company: 'Virtue Therapy',
      location: 'Dubai, United Arab Emirates',
      period: 'Feb 2021 - Jan 2023',
      description: [
        'Built and deployed machine learning models for user behavior prediction using mood analysis, psychological profiling, and sentiment analysis, improving engagement insights by 30%.',
        'Designed and trained classic machine learning models (random forests, XGBoost, SVMs) for structured data tasks, improving prediction accuracy by up to 22% over baseline.',
        'Led end-to-end ML workflows — data preprocessing, EDA, model training, tuning, and evaluation — using Scikit-learn, TensorFlow, and PyTorch, increasing model precision by 20%.',
        'Implemented experiment tracking and model versioning for better reproducibility and lifecycle management.',
      ],
    },
    {
      title: 'Research Assistant',
      company: 'University of Sharjah',
      location: 'Sharjah, United Arab Emirates',
      period: 'Aug 2020 - Feb 2021',
      description: [
        'Authored 6+ peer-reviewed AI research papers — including 2 in Q1-ranked journals — with 490+ total citations and h-index of 4, focusing on deep learning, NLP, and clinical applications.',
        'Developed an optimized Arabic text summarization approach in Master\'s thesis by fine-tuning transformer models with Radial Basis Function Neural Networks, reducing training time by 45%.',
        'Developed BERT-based models for Arabic fake news detection, achieving 90%+ classification accuracy and published in high-impact NLP journals.',
        'Designed and evaluated Deep Learning architectures for Alzheimer\'s detection using MRI and heart failure prediction using structured medical datasets.',
      ],
    },
  ];

  const education = [
    {
      degree: 'M.Sc. in Computer Engineering',
      specialization: 'Artificial Intelligence',
      institution: 'University of Sharjah',
      period: 'Sep 2020 - Dec 2024',
      thesis: 'Optimizing Large Language Models for Arabic Text Summarization utilizing RBF Networks',
    },
    {
      degree: 'B.Sc. in Computer Engineering',
      institution: 'University of Sharjah',
      period: 'Sep 2016 - Aug 2020',
      project: 'EEG based Computer Command Input for paralyzed people',
    },
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My professional journey building AI solutions at scale
          </p>
        </motion.div>

        <div className="experience-content">
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-marker">
                  <div className={`marker-dot ${exp.current ? 'current' : ''}`}></div>
                  {index < experiences.length - 1 && <div className="marker-line"></div>}
                </div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-title">{exp.title}</h3>
                      <p className="timeline-company">{exp.company}</p>
                    </div>
                    {exp.current && <span className="current-badge">Current</span>}
                  </div>

                  <div className="timeline-meta">
                    <span className="meta-item">
                      <FiCalendar size={14} />
                      {exp.period}
                    </span>
                    <span className="meta-item">
                      <FiMapPin size={14} />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="timeline-list">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="education-section">
            <motion.h3
              className="subsection-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FiBriefcase />
              Education
            </motion.h3>

            <div className="education-grid">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="education-icon">🎓</div>
                  <h4 className="education-degree">{edu.degree}</h4>
                  {edu.specialization && (
                    <p className="education-spec">{edu.specialization}</p>
                  )}
                  <p className="education-institution">{edu.institution}</p>
                  <p className="education-period">{edu.period}</p>
                  {edu.thesis && (
                    <p className="education-thesis">
                      <strong>Thesis:</strong> {edu.thesis}
                    </p>
                  )}
                  {edu.project && (
                    <p className="education-thesis">
                      <strong>Senior Project:</strong> {edu.project}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
