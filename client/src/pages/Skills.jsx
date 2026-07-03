import {
  FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaNodeJs, FaGitAlt, FaGithub,
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql } from 'react-icons/si';

function FigmaLogo() {
  return (
    <svg width="20" height="30" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5c0-5.247 4.253-9.5 9.5-9.5S38 23.253 38 28.5 33.747 38 28.5 38 19 33.747 19 28.5z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.253 4.253 38 9.5 38H19v9.5C19 52.747 14.747 57 9.5 57S0 52.747 0 47.5z" fill="#0ACF83"/>
      <path d="M19 0v19h9.5c5.247 0 9.5-4.253 9.5-9.5S33.747 0 28.5 0H19z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.747 4.253 19 9.5 19H19V0H9.5C4.253 0 0 4.253 0 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.747 4.253 38 9.5 38H19V19H9.5C4.253 19 0 23.253 0 28.5z" fill="#A259FF"/>
    </svg>
  );
}

const skillCategories = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', icon: <FaHtml5 />, color: '#e34f26' },
      { name: 'CSS', icon: <FaCss3Alt />, color: '#1572b6' },
      { name: 'JavaScript', icon: <FaJs />, color: '#f7df1e' },
      { name: 'React', icon: <FaReact />, color: '#61dafb' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
      { name: 'Express', icon: <SiExpress />, color: '#000000' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
      { name: 'Node.js', icon: <FaNodeJs />, color: '#68a063' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'GitHub', icon: <FaGithub />, color: '#181717' },
      { name: 'Figma', icon: <FigmaLogo />, color: null },
    ],
  },
];

function Skills() {
  return (
    <section className="skills">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((group) => (
          <div className="skill-card" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skill-items">
              {group.items.map((item) => (
                <div className="skill-item" key={item.name}>
                  <span className="skill-icon" style={item.color ? { color: item.color } : {}}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;