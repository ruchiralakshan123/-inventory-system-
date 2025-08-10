import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logo}>My Inventory</div>

      <nav style={styles.nav}>
        <button 
          style={{ ...styles.button, ...styles.loginButton }}
          onClick={() => navigate('/login')}
        >
          Login
        </button>

        <button 
          style={{ ...styles.button, ...styles.signupButton }}
          onClick={() => navigate('/register')}
        >
          Create Account
        </button>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2e8555',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    fontSize: '1rem',
    padding: '0.5rem 1.25rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: '#2e8555',
    border: '2px solid #2e8555',
  },
  signupButton: {
    backgroundColor: '#2e8555',
    color: '#fff',
  },
};

export default Navbar;
