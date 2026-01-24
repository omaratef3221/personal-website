import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiRefreshCw, FiTrendingUp, FiAward, FiBookOpen, FiUsers, FiArrowRight } from 'react-icons/fi';
import { SiGooglescholar, SiResearchgate } from 'react-icons/si';
import { fetchScholarData, getCachedData, shouldRefreshData } from '../services/scholarService';
import './Publications.css';

const Publications = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Check cache first for instant load
      if (!forceRefresh) {
        const cached = getCachedData();
        if (cached && !shouldRefreshData()) {
          setData(cached);
          setLoading(false);
          return;
        }
        // Show cached data immediately while fetching fresh data
        if (cached) {
          setData(cached);
          setLoading(false);
        }
      }

      const freshData = await fetchScholarData();
      setData(freshData);
      setError(null);
    } catch (err) {
      setError('Failed to load publications');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem('scholarData');
    loadData(true);
  };

  const formatCitations = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getPublicationType = (venue) => {
    const venueLower = venue.toLowerCase();
    if (venueLower.includes('journal') || venueLower.includes('applications') || venueLower.includes('medicine')) {
      return { type: 'Journal', color: '#10b981' };
    }
    if (venueLower.includes('conference') || venueLower.includes('aset') || venueLower.includes('ahit')) {
      return { type: 'Conference', color: '#6366f1' };
    }
    return { type: 'Publication', color: '#8b5cf6' };
  };

  const stats = data?.stats || { totalCitations: 0, hIndex: 0, i10Index: 0 };
  const allPublications = data?.publications || [];

  // Sort by citations (highest first) and take top 4
  const topPublications = [...allPublications]
    .sort((a, b) => b.citations - a.citations)
    .slice(0, 4);

  return (
    <section id="publications" className="section publications">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="publications-header"
        >
          <div className="header-content">
            <h2 className="section-title">Research & Publications</h2>
            <p className="section-subtitle">
              Peer-reviewed contributions in AI, NLP, and healthcare
            </p>
          </div>

          <button
            className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh from Google Scholar"
          >
            <FiRefreshCw size={18} />
            {refreshing ? 'Updating...' : 'Refresh'}
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="scholar-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-card">
            <div className="stat-icon citations">
              <FiTrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">
                {loading ? '...' : formatCitations(stats.totalCitations)}
              </span>
              <span className="stat-label">Total Citations</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon h-index">
              <FiAward size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{loading ? '...' : stats.hIndex}</span>
              <span className="stat-label">h-index</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon i10">
              <FiBookOpen size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{loading ? '...' : stats.i10Index}</span>
              <span className="stat-label">i10-index</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon papers">
              <FiUsers size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{loading ? '...' : allPublications.length}</span>
              <span className="stat-label">Publications</span>
            </div>
          </div>
        </motion.div>

        {/* Publications List */}
        <div className="publications-grid">
          <AnimatePresence mode="wait">
            {loading && !data ? (
              <motion.div
                className="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner"></div>
                <p>Fetching publications from Google Scholar...</p>
              </motion.div>
            ) : error && !data ? (
              <motion.div
                className="error-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>{error}</p>
                <button onClick={() => loadData()} className="btn btn-secondary">
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="publications-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {topPublications.map((pub, index) => {
                  const pubType = getPublicationType(pub.venue);
                  return (
                    <motion.article
                      key={pub.title}
                      className="publication-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="pub-rank">#{index + 1}</div>
                      <div className="pub-citation-badge">
                        <span className="citation-count">{pub.citations}</span>
                        <span className="citation-label">citations</span>
                      </div>

                      <div className="pub-content">
                        <div className="pub-meta">
                          <span
                            className="pub-type-tag"
                            style={{ backgroundColor: `${pubType.color}20`, color: pubType.color }}
                          >
                            {pubType.type}
                          </span>
                          <span className="pub-year">{pub.year}</span>
                        </div>

                        <h3 className="pub-title">
                          {pub.link ? (
                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                              {pub.title}
                              <FiExternalLink className="title-link-icon" size={14} />
                            </a>
                          ) : (
                            pub.title
                          )}
                        </h3>

                        <p className="pub-authors">{pub.authors}</p>
                        <p className="pub-venue">{pub.venue}</p>
                      </div>
                    </motion.article>
                  );
                })}

                {/* View More Button */}
                {allPublications.length > 4 && (
                  <motion.div
                    className="view-more-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <a
                      href="https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-more-btn"
                    >
                      <span>View all publications on Google Scholar</span>
                      <FiArrowRight size={18} />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Source Notice */}
        {data?.isFallback && (
          <motion.p
            className="data-notice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing cached data. Click refresh to fetch latest from Google Scholar.
          </motion.p>
        )}

        {/* Profile Links */}
        <motion.div
          className="scholar-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="scholar-link google"
          >
            <SiGooglescholar size={20} />
            <span>View Google Scholar Profile</span>
            <FiExternalLink size={16} />
          </a>
          <a
            href="https://www.researchgate.net/profile/Omar-Elgendy-4"
            target="_blank"
            rel="noopener noreferrer"
            className="scholar-link researchgate"
          >
            <SiResearchgate size={20} />
            <span>View ResearchGate Profile</span>
            <FiExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
