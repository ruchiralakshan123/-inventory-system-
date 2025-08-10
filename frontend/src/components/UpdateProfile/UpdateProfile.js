import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles.css";

function UpdateProfile() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const itemData = response.data;
        setFormData({
          fullname: itemData.fullname || '',
          email: itemData.email || '',
          password: itemData.password || '',
          phone: itemData.phone || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, formData);
      alert('Profile updated successfully');
      window.location.href = '/userProfile';
    } catch (error) {
      alert('Error updating data');
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form className="update-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">👤 Full Name:</label>
          <input 
            type="text" 
            id="fullname" 
            name="fullname" 
            value={formData.fullname} 
            onChange={onInputChange} 
            required 
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">📧 Email Address:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={onInputChange} 
            required 
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">🔒 Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={onInputChange} 
            required 
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">📱 Phone Number:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={onInputChange} 
            required 
            placeholder="Enter your phone number"
          />
        </div>

        <button type="submit" className="update-btn-form">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;