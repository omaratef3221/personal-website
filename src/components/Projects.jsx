import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiYoutube, FiBook, FiStar, FiGitBranch, FiRefreshCw, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { SiHuggingface, SiUdemy, SiMedium } from 'react-icons/si';
import {
  fetchGitHubRepos,
  getCachedRepos,
  shouldRefreshRepos,
  getLanguageColor,
} from '../services/githubService';
import './Projects.css';

const resources = [
  {
    title: 'Udemy Courses',
    description: 'Courses on ML, AI, and Data Science',
    icon: <SiUdemy size={20} />,
    href: 'https://www.udemy.com/user/omar-m-atef-2/',
  },
  {
    title: 'YouTube',
    description: 'Tutorials on ML, AI, and engineering',
    icon: <FiYoutube size={20} />,
    href: 'https://www.youtube.com/@OmarMAtef',
  },
  {
    title: 'Medium',
    description: 'Technical writing & deep-dives',
    icon: <SiMedium size={20} />,
    href: 'https://medium.com/@omaratef3221',
  },
  {
    title: 'Hugging Face',
    description: 'Open-source models & datasets',
    icon: <SiHuggingface size={20} />,
    href: 'https://huggingface.co/Omaratef3221',
  },
];

const formatDate = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(Math.abs(now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (force = false) => {
    try {
      if (force) setRefreshing(true);
      else setLoading(true);

      if (!force) {
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

      const fresh = await fetchGitHubRepos();
      setRepos(fresh);
    } catch (e) {
      console.error('Failed to load repos:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleRefresh = () => {
    localStorage.removeItem('githubRepos');
    load(true);
  };

  const display = repos.slice(0, 6);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="eyebrow">05 — Code</span>
            <h2 id="projects-title" className="section-title">
              Open source <em>&amp; experiments</em>.
            </h2>
            <p className="section-subtitle">
              Recent work, automatically synced from GitHub.
            </p>
          </div>

          <button
            type="button"
            className={`pub-refresh ${refreshing ? 'is-refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Sync from GitHub"
          >
            <FiRefreshCw size={15} />
            <span>{refreshing ? 'Syncing' : 'Sync'}</span>
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && repos.length === 0 ? (
            <motion.div
              key="loading"
              className="projects-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="pub-spinner" /> Fetching projects…
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {display.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <div className="project-top">
                    <div className="project-stats">
                      <span className="project-stat"><FiStar size={13} /> {repo.stars}</span>
                      <span className="project-stat"><FiGitBranch size={13} /> {repo.forks}</span>
                    </div>
                    <FiArrowUpRight size={16} className="project-arrow" />
                  </div>

                  <h3 className="project-name">{repo.name}</h3>
                  <p className="project-desc">{repo.description}</p>

                  <div className="project-foot">
                    {repo.language && (
                      <span className="project-lang">
                        <span className="lang-dot" style={{ background: getLanguageColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="project-updated">Updated {formatDate(repo.pushedAt)}</span>
                  </div>

                  {repo.topics?.length > 0 && (
                    <div className="project-topics">
                      {repo.topics.slice(0, 4).map((t) => (
                        <span key={t} className="project-topic">{t}</span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {repos.length > 6 && (
          <motion.div
            className="projects-cta"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
          >
            <a
              href="https://github.com/omaratef3221?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="pub-link"
            >
              <FiGithub size={16} />
              <span>All {repos.length} repositories</span>
              <FiArrowRight size={14} />
            </a>
          </motion.div>
        )}

        <motion.div
          className="resources"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="resources-heading">
            <FiBook size={16} /> Teaching &amp; writing
          </h3>
          <div className="resources-grid">
            {resources.map((r) => (
              <a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="resource"
              >
                <div className="resource-icon">{r.icon}</div>
                <div className="resource-body">
                  <h4 className="resource-title">{r.title}</h4>
                  <p className="resource-desc">{r.description}</p>
                </div>
                <FiExternalLink size={14} className="resource-arrow" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
