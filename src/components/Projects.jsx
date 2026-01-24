import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiYoutube, FiBook, FiStar, FiGitBranch, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { SiHuggingface, SiUdemy, SiMedium } from 'react-icons/si';
import {
  fetchGitHubRepos,
  getCachedRepos,
  shouldRefreshRepos,
  getLanguageColor,
  getRepoIcon,
} from '../services/githubService';
import './Projects.css';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRepos = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Check cache first
      if (!forceRefresh) {
        const cached = getCachedRepos();
        if (cached && !shouldRefreshRepos()) {
          setRepos(cached.repos);
          setLoading(false);
          return;
        }
        if (cached) {
          setRepos(cached.repos);
          setLoading(false);
        }
      }

      const freshRepos = await fetchGitHubRepos();
      setRepos(freshRepos);
    } catch (error) {
      console.error('Failed to load repos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem('githubRepos');
    loadRepos(true);
  };

  // Get top 6 repos for display
  const displayRepos = repos.slice(0, 6);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <section id="projects" className="section projects">
      <div className="bg-gradient-blur bg-gradient-blur-2"></div>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">
              My latest work from GitHub - automatically synced
            </p>
          </div>

          <button
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh from GitHub"
          >
            <FiRefreshCw size={18} />
            {refreshing ? 'Syncing...' : 'Sync'}
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && repos.length === 0 ? (
            <motion.div
              className="loading-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-spinner"></div>
              <p>Fetching projects from GitHub...</p>
            </motion.div>
          ) : (
            <motion.div
              className="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="project-card-header">
                    <div className="project-stats">
                      <span className="stat">
                        <FiStar size={14} />
                        {repo.stars}
                      </span>
                      <span className="stat">
                        <FiGitBranch size={14} />
                        {repo.forks}
                      </span>
                    </div>
                  </div>

                  <h3 className="project-title">{repo.name}</h3>
                  <p className="project-description">{repo.description}</p>

                  <div className="project-meta">
                    {repo.language && (
                      <span className="project-language">
                        <span
                          className="language-dot"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="project-updated">
                      Updated {formatDate(repo.pushedAt)}
                    </span>
                  </div>

                  {repo.topics.length > 0 && (
                    <div className="project-tags">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="project-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-link-indicator">
                    <FiExternalLink size={16} />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {repos.length > 6 && (
          <motion.div
            className="view-more-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <a
              href="https://github.com/omaratef3221?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="view-more-btn"
            >
              <FiGithub size={18} />
              <span>View all {repos.length} repositories on GitHub</span>
              <FiArrowRight size={18} />
            </a>
          </motion.div>
        )}

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
      </div>
    </section>
  );
};

export default Projects;
