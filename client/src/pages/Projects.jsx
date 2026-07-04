import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      {loading ? (
        <p className="status-message">Loading projects...</p>
      ) : error ? (
        <p className="status-message error">{error}</p>
      ) : projects.length === 0 ? (
        <p className="status-message">No projects added yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="tech-list">{project.technologies.join(', ')}</p>
              <div className="project-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;