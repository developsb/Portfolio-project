import { useState } from 'react';
import { getMessages } from '../services/api';
import PasswordField from '../components/PasswordField';

function AdminMessages() {
  const [adminKey, setAdminKey] = useState('');
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleLoad(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await getMessages(adminKey);
      setMessages(data);
      setSuccess(`Loaded ${data.length} message${data.length === 1 ? '' : 's'}.`);
    } catch (err) {
      setError('Incorrect admin password.');
      setMessages(null);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  return (
    <section className="admin">
      <h2>Admin — Contact Messages</h2>

      <form onSubmit={handleLoad} className="admin-form">
        <label htmlFor="adminKey">Admin Password</label>
        <PasswordField
          id="adminKey"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />
        <div className="admin-form-buttons">
          <button type="submit">View Messages</button>
        </div>
      </form>

      {error && <p className="admin-message error">{error}</p>}
      {success && <p className="admin-message success">{success}</p>}

      {messages && (
        <div className="admin-list">
          <p className="message-count">{messages.length} message{messages.length === 1 ? '' : 's'}</p>
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <div className="message-card-header">
                <strong>{msg.name}</strong>
                <span className="message-date">{formatDate(msg.createdAt)}</span>
              </div>
              <p className="message-email">{msg.email}</p>
              <p className="message-subject">{msg.subject}</p>
              <p className="message-body">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminMessages;