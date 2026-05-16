import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiYoutube,
  FiArrowUpRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { SiHuggingface, SiMedium, SiGooglescholar, SiResearchgate } from 'react-icons/si';
import './Contact.css';

const socials = [
  { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
  { icon: <FiGithub size={18} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
  { icon: <SiGooglescholar size={18} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
  { icon: <SiResearchgate size={18} />, href: 'https://www.researchgate.net/profile/Omar-Elgendy-4', label: 'ResearchGate' },
  { icon: <SiHuggingface size={18} />, href: 'https://huggingface.co/Omaratef3221', label: 'Hugging Face' },
  { icon: <SiMedium size={18} />, href: 'https://medium.com/@omaratef3221', label: 'Medium' },
  { icon: <FiYoutube size={18} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xovoorrv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-grid">
          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">06 — Contact</span>
            <h2 id="contact-title" className="section-title">
              Let's build <em>something serious</em>.
            </h2>
            <p className="contact-lede">
              Research collaborations, hard ML problems in production, or anything
              else worth building — drop a line.
            </p>

            <div className="contact-channels">
              <a className="channel" href="mailto:omaratef3221@gmail.com">
                <FiMail size={18} />
                <div>
                  <span className="channel-label">Email</span>
                  <span className="channel-value">omaratef3221@gmail.com</span>
                </div>
                <FiArrowUpRight size={14} />
              </a>
              <div className="channel channel-static">
                <FiMapPin size={18} />
                <div>
                  <span className="channel-label">Location</span>
                  <span className="channel-value">Dubai, United Arab Emirates</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                  placeholder="Jane Recruiter"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                required
                placeholder="Project collaboration"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                required
                placeholder="A few lines about the team and the problem."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary form-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : (
                <>
                  Send message <FiSend size={15} />
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="form-feedback form-feedback--ok">
                <FiCheckCircle size={15} /> Message sent. I'll reply within 48 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--err">
                Something went wrong. Email me directly at omaratef3221@gmail.com.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
