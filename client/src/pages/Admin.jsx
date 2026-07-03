import { useState, useEffect, useRef } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';
import PasswordField from '../components/PasswordField';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
};

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

function Admin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [adminKey, setAdminKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const messageTimeout = useRef(null);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function showMessage(type, text) {
    setMessage({ type, text });
    clearTimeout(messageTimeout.current);
    messageTimeout.current = setTimeout(() => setMessage(null), 4000);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function isLocked() {
    return lockedUntil && Date.now() < lockedUntil;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isLocked()) {
      const secondsLeft = Math.ceil((lockedUntil - Date.now()) / 1000);
      showMessage('error', `Too many wrong attempts. Try again in ${secondsLeft}s.`);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()),
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload, adminKey);
        showMessage('success', 'Project updated successfully.');
      } else {
        await createProject(payload, adminKey);
        showMessage('success', 'Project created successfully.');
      }
      setFormData(emptyForm);
      setEditingId(null);
      setFailedAttempts(0);
      loadProjects();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (attempts >= MAX_ATTEMPTS) {
          setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000);
          showMessage('error', `Too many wrong attempts. Locked for ${LOCKOUT_SECONDS}s.`);
        } else {
          const remaining = MAX_ATTEMPTS - attempts;
          showMessage('error', `Incorrect admin password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`);
        }
      } else {
        showMessage('error', 'Error saving project. Check required fields.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(project) {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return;
    if (isLocked()) {
      showMessage('error', 'Locked due to too many wrong attempts. Try again shortly.');
      return;
    }
    try {
      await deleteProject(id, adminKey);
      loadProjects();
      setFailedAttempts(0);
    } catch (err) {
      showMessage('error', 'Incorrect admin password.');
    }
  }

  function handleCancel() {
    setEditingId(null);
    setFormData(emptyForm);
  }

  return (
    <section className="admin">
      <h2>Admin — Manage Projects</h2>

      {message && (
        <p className={`admin-message ${message.type}`}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="technologies">Technologies (comma-separated)</label>
        <input id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />

        <label htmlFor="githubUrl">GitHub URL</label>
        <input id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} />

        <label htmlFor="liveUrl">Live Demo URL</label>
        <input id="liveUrl" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />

        <label htmlFor="adminKey">Admin Password</label>
        <PasswordField
          id="adminKey"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Required to save changes"
        />

        <div className="admin-form-buttons">
          <button type="submit" disabled={isSubmitting || isLocked()}>
            {isSubmitting ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {projects.map((project) => (
          <div className="admin-list-item" key={project._id}>
            <div>
              <strong>{project.title}</strong>
              <p className="tech-list">{project.technologies.join(', ')}</p>
            </div>
            <div className="admin-list-buttons">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;