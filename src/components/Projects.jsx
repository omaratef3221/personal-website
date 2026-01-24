import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiYoutube, FiBook } from 'react-icons/fi';
import { SiHuggingface, SiUdemy, SiMedium } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'LLM Applications with RAG',
      description: 'Production-grade chatbots, document Q&A systems, and intelligent assistants using Transformers, LangChain, and RAG architecture achieving 85%+ accuracy.',
      tags: ['LangChain', 'RAG', 'Transformers', 'Python'],
      icon: '🤖',
      featured: true,
    },
    {
      title: 'SQL Query Generator',
      description: 'Intelligent SQL query generator using the Qwen2 model, enabling natural language to SQL conversion for database interactions.',
      tags: ['Qwen2', 'NLP', 'SQL', 'LLM'],
      icon: '💾',
      github: 'https://github.com/omaratef3221',
    },
    {
      title: 'Podcast Summarizer Agent',
      description: 'AI agent that summarizes podcasts using RAG architecture with MongoDB for efficient storage and retrieval of podcast transcripts.',
      tags: ['RAG', 'MongoDB', 'Agents', 'NLP'],
      icon: '🎙️',
      github: 'https://github.com/omaratef3221',
    },
    {
      title: 'MLOps Airflow RAG Pipeline',
      description: 'Scalable MLOps pipeline using Apache Airflow for orchestrating RAG-based applications with automated training and deployment.',
      tags: ['Airflow', 'MLOps', 'RAG', 'Docker'],
      icon: '⚙️',
      github: 'https://github.com/omaratef3221',
    },
    {
      title: 'Arabic Text Summarization',
      description: 'Optimized Arabic text summarization using transformer models with Radial Basis Function Neural Networks, reducing training time by 45%.',
      tags: ['NLP', 'Transformers', 'Arabic', 'RBF'],
      icon: '📝',
      featured: true,
    },
    {
      title: 'Medical AI Systems',
      description: 'Deep learning architectures for Alzheimer\'s detection using MRI images and heart failure prediction using structured medical datasets.',
      tags: ['Healthcare AI', 'Deep Learning', 'CNN', 'Classification'],
      icon: '🏥',
    },
  ];

  const resources = [
    {
      title: 'Udemy Courses',
      description: 'Courses on Machine Learning, AI, and Data Science',
      icon: <SiUdemy size={24} />,
      link: 'https://www.udemy.com/user/omar-m-atef-2/',
      color: '#a435f0',
    },
    {
      title: 'YouTube Channel',
      description: 'Video tutorials on ML, AI, and Data Science',
      icon: <FiYoutube size={24} />,
      link: 'https://www.youtube.com/@OmarMAtef',
      color: '#ff0000',
    },
    {
      title: 'Medium Blogs',
      description: 'Technical articles and tutorials',
      icon: <SiMedium size={24} />,
      link: 'https://medium.com/@omaratef3221',
      color: '#000000',
    },
    {
      title: 'HuggingFace',
      description: 'Models and datasets',
      icon: <SiHuggingface size={24} />,
      link: 'https://huggingface.co/Omaratef3221',
      color: '#ffcc00',
    },
  ];

  return (
    <section id="projects" className="section projects">
      <div className="bg-gradient-blur bg-gradient-blur-2"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Showcasing my work in AI, Machine Learning, and MLOps
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {project.github && (
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiGithub size={18} />
                    View Code
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="resources-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="resources-title">
            <FiBook />
            Learning Resources & Content
          </h3>

          <div className="resources-grid">
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="resource-icon"
                  style={{ color: resource.color }}
                >
                  {resource.icon}
                </div>
                <div className="resource-content">
                  <h4 className="resource-title">{resource.title}</h4>
                  <p className="resource-description">{resource.description}</p>
                </div>
                <FiExternalLink className="resource-arrow" size={16} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="github-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>Want to see more of my work?</p>
          <a
            href="https://github.com/omaratef3221"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FiGithub size={18} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
