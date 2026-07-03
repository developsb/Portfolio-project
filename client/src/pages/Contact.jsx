import { useState } from 'react';
import { sendMessage } from '../services/api';
import { FaTelegram, FaEnvelope, FaGithub } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await sendMessage(formData);
      setSuccess('Message sent successfully!');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError('Please check your message is at least 10 characters long.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <p className="contact-intro">Feel free to reach out — I'm always happy to chat.</p>
      
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      <div className="social-links">
        <a href="https://t.me/SambathPK" target="_blank" rel="noreferrer" className="social-button telegram" aria-label="Telegram">
          <FaTelegram />
        </a>
        <a href="mailto:sp6025010081@camtech.edu.kh" className="social-button gmail" aria-label="Email">
          <FaEnvelope />
        </a>
        <a href="https://github.com/developsb" target="_blank" rel="noreferrer" className="social-button github" aria-label="GitHub">
          <FaGithub />
        </a>
      </div>
    </section>
  );
}

export default Contact;