import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiRefreshCw, FiTrendingUp, FiAward, FiBookOpen, FiFileText, FiArrowRight } from 'react-icons/fi';
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
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);

      if (!forceRefresh) {
        const cached = getCachedData();
        if (cached && !shouldRefreshData()) {
          setData(cached);
          setLoading(false);
          return;
        }
        if (cached) {
          setData(cached);
          setLoading(false);
        }
      }

      const fresh = await fetchScholarData();
      setData(fresh);
      setError(null);
    } catch (err) {
      setError('Failed to load publications');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRefresh = () => {
    localStorage.removeItem('scholarData');
    loadData(true);
  };

  const formatCitations = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

  const venueType = (venue = '') => {
    const v = venue.toLowerCase();
    if (v.includes('journal') || v.includes('applications') || v.includes('medicine')) return 'Journal';
    if (v.includes('conference') || v.includes('aset') || v.includes('ahit')) return 'Conference';
    return 'Publication';
  };

  const stats = data?.stats || { totalCitations: 0, hIndex: 0, i10Index: 0 };
  const all = data?.publications || [];
  const top = [...all].sort((a, b) => b.citations - a.citations).slice(0, 4);

  return (
    <section id="publications" className="section publications" aria-labelledby="pub-title">
      <div className="container">
        <motion.div
          className="pub-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="eyebrow">04 — Research</span>
            <h2 id="pub-title" className="section-title">
              Peer-reviewed <em>publications</em>.
            </h2>
            <p className="section-subtitle">
              Q1 journals, NLP, healthcare AI, and transformer optimization. Live numbers from Google Scholar.
            </p>
          </div>

          <button
            type="button"
            className={`pub-refresh ${refreshing ? 'is-refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh from Google Scholar"
          >
            <FiRefreshCw size={15} />
            <span>{refreshing ? 'Updating' : 'Sync'}</span>
          </button>
        </motion.div>

        {/* Stats */}
        <div className="pub-stats" role="list">
          {[
            { icon: <FiTrendingUp size={16} />, label: 'Citations', value: loading ? '…' : formatCitations(stats.totalCitations) },
            { icon: <FiAward size={16} />, label: 'h-index', value: loading ? '…' : stats.hIndex },
            { icon: <FiBookOpen size={16} />, label: 'i10-index', value: loading ? '…' : stats.i10Index },
            { icon: <FiFileText size={16} />, label: 'Papers', value: loading ? '…' : all.length || '6+' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="pub-stat"
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="pub-stat-icon">{s.icon}</div>
              <div className="pub-stat-text">
                <span className="pub-stat-value">{s.value}</span>
                <span className="pub-stat-label">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications list */}
        <div className="pub-list-wrap">
          <AnimatePresence mode="wait">
            {loading && !data ? (
              <motion.div key="loading" className="pub-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="pub-spinner" /> Fetching publications…
              </motion.div>
            ) : error && !data ? (
              <motion.div key="error" className="pub-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p>{error}</p>
                <button onClick={() => loadData()} className="btn btn-secondary">Try again</button>
              </motion.div>
            ) : (
              <motion.ol key="list" className="pub-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {top.map((pub, i) => (
                  <motion.li
                    key={pub.title}
                    className="pub-item"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <div className="pub-rank" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>

                    <div className="pub-content">
                      <div className="pub-meta">
                        <span className="pub-type">{venueType(pub.venue)}</span>
                        <span className="pub-year">{pub.year}</span>
                        <span className="pub-cites">{pub.citations} citations</span>
                      </div>

                      <h3 className="pub-title">
                        {pub.link ? (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            {pub.title}
                            <FiExternalLink size={13} />
                          </a>
                        ) : pub.title}
                      </h3>

                      <p className="pub-authors">{pub.authors}</p>
                      <p className="pub-venue">{pub.venue}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="pub-cta"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="pub-link"
          >
            <SiGooglescholar size={16} />
            <span>Google Scholar</span>
            <FiArrowRight size={14} />
          </a>
          <a
            href="https://www.researchgate.net/profile/Omar-Elgendy-4"
            target="_blank"
            rel="noopener noreferrer"
            className="pub-link"
          >
            <SiResearchgate size={16} />
            <span>ResearchGate</span>
            <FiArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
