import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "../../styles.css"; // make sure this path is correct

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { username, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      alert("Login success");
      window.location.href = "/allitem";
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: 400, margin: "auto", marginTop: 60 }}>
      <div className="register-header" style={{ textAlign: "center" }}>
        <div className="register-header-icon" style={{ marginBottom: 20 }}>
          <User size={48} color="#4f46e5" />
        </div>
        <h2>Admin Login</h2>
        <p>Please enter your admin credentials</p>
      </div>

      {error && (
        <div className="error-box" style={{ marginBottom: 15, color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="input-wrapper" style={{ marginBottom: 20, position: "relative" }}>
          <label htmlFor="username" className="input-label">Username</label>
          <User className="input-icon" style={{ position: "absolute", left: 10, top: "38px", color: "#9ca3af" }} />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onInputChange}
            placeholder="Enter username"
            required
            className="input-field"
            style={{ paddingLeft: 36, width: "100%", height: 40, borderRadius: 6, border: "1px solid #d1d5db" }}
          />
        </div>

        <div className="input-wrapper" style={{ marginBottom: 30, position: "relative" }}>
          <label htmlFor="password" className="input-label">Password</label>
          <Lock className="input-icon" style={{ position: "absolute", left: 10, top: "38px", color: "#9ca3af" }} />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="Enter password"
            required
            className="input-field"
            style={{ paddingLeft: 36, paddingRight: 40, width: "100%", height: 40, borderRadius: 6, border: "1px solid #d1d5db" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "38px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              padding: 0,
            }}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="submit-btn"
          style={{
            width: "100%",
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "12px 0",
            borderRadius: 6,
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
