import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiYoutube,
} from 'react-icons/fi';
import { SiHuggingface, SiMedium, SiGooglescholar, SiResearchgate } from 'react-icons/si';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:omaratef3221@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      label: 'Email',
      value: 'omaratef3221@gmail.com',
      href: 'mailto:omaratef3221@gmail.com',
    },
    {
      icon: <FiPhone size={24} />,
      label: 'Phone',
      value: '+971-558980116',
      href: 'tel:+971558980116',
    },
    {
      icon: <FiMapPin size={24} />,
      label: 'Location',
      value: 'Dubai, United Arab Emirates',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: <FiGithub size={20} />, href: 'https://github.com/omaratef3221', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/omaratef3221/', label: 'LinkedIn' },
    { icon: <FiYoutube size={20} />, href: 'https://www.youtube.com/@OmarMAtef', label: 'YouTube' },
    { icon: <SiHuggingface size={20} />, href: 'https://huggingface.co/Omaratef3221', label: 'HuggingFace' },
    { icon: <SiMedium size={20} />, href: 'https://medium.com/@omaratef3221', label: 'Medium' },
    { icon: <SiGooglescholar size={20} />, href: 'https://scholar.google.com/citations?user=lw70gLkAAAAJ&hl=en', label: 'Google Scholar' },
    { icon: <SiResearchgate size={20} />, href: 'https://www.researchgate.net/profile/Omar-Elgendy-4', label: 'ResearchGate' },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="bg-gradient-blur bg-gradient-blur-1"></div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-text">
              I'm currently open to new opportunities in Machine Learning and AI.
              Whether you have a question, want to collaborate on a project, or just
              want to say hi, feel free to reach out!
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-detail-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="contact-detail-icon">{info.icon}</div>
                  <div>
                    <p className="contact-detail-label">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="contact-detail-value">
                        {info.value}
                      </a>
                    ) : (
                      <p className="contact-detail-value">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-social">
              <p className="contact-social-title">Find me on</p>
              <div className="contact-social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="Project Collaboration"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell me about your project..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary form-submit">
              <FiSend size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
