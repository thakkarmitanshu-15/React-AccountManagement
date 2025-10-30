import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  // State for the edit form
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      // We only allow updating the name in this example
      // Updating email or password would be more complex
      updateUser({ name });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage(`Failed to update: ${error.message}`);
    }
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>
      {message && <p className="success">{message}</p>}
      
      {!isEditing ? (
        // --- View Mode ---
        <div className="profile-view">
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <button onClick={() => setIsEditing(true)} className="btn">Edit Profile</button>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      ) : (
        // --- Edit Mode ---
        <form onSubmit={handleUpdate} className="form-container">
          <h3>Edit Profile</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email (read-only)</label>
            <input
              type="email"
              value={email}
              disabled 
            />
          </div>
          <button type="submit" className="btn">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AccountPage;