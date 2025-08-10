import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../../styles.css"; 

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080/user/${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching user');
        setLoading(false);
      });
  }, []);

  const updateNavigate = (id) => {
    window.location.href = `/updateprofile/${id}`;
  };

  const deleteAccount = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this account?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/user/${user.id}`);
        alert('Account deleted successfully');
        localStorage.removeItem('userId');
        window.location.href = '/';
      } catch {
        alert('Error deleting account');
      }
    }
  };

  if (loading) return <p className="loading">Loading...</p>;      
  if (error) return <p className="error">{error}</p>;          

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Full name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <div className="profile-buttons">
            <button className="btn update-btn" onClick={() => updateNavigate(user.id)}>Update</button>
            <button className="btn delete-btn" onClick={deleteAccount}>Delete</button>
          </div>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}

export default UserProfile;
