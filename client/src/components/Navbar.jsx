import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const sections = ['home', 'about', 'skills', 'projects', 'contact'];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled to (near) the bottom of the page, force the last section active
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

      if (scrolledToBottom) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Sambath Pheakdey</div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              onClick={closeMenu}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;