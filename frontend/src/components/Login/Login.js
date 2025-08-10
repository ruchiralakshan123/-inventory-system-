import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Header from "../Header"; // Path එක adjust කරන්න
import "../../styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const loginDetails = { email, password };
      const response = await axios.post("http://localhost:8080/login", loginDetails);

      if (response.data.id) {
        localStorage.setItem("userId", response.data.id);
        alert("Login successful");
        window.location.href = "/home";
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="register-container" style={{ maxWidth: 400, margin: "auto", marginTop: 60 }}>
        <div className="register-header" style={{ textAlign: "center" }}>
          <div className="register-header-icon" style={{ marginBottom: 20 }}>
            <LogIn size={48} color="#4f46e5" />
          </div>
          <h2>Login to Your Account</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>

        {error && (
          <div className="error-box" style={{ marginBottom: 15, color: "red", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="input-wrapper" style={{ marginBottom: 20, position: "relative" }}>
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <Mail className="input-icon" style={{ position: "absolute", left: 10, top: "38px", color: "#9ca3af" }} />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input-field"
              style={{ paddingLeft: 36, width: "100%", height: 40, borderRadius: 6, border: "1px solid #d1d5db" }}
            />
          </div>

          <div className="input-wrapper" style={{ marginBottom: 30, position: "relative" }}>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <Lock className="input-icon" style={{ position: "absolute", left: 10, top: "38px", color: "#9ca3af" }} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: "#4f46e5",
              color: "white",
              padding: "12px 0",
              borderRadius: 6,
              border: "none",
              fontWeight: "bold",
              fontSize: 16,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
              marginBottom: 20,
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Don't have an account?{" "}
            <span
              onClick={() => (window.location.href = "/register")}
              style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
            >
              Register
            </span>
          </p>
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Admin?{" "}
            <span
              onClick={() => (window.location.href = "/adminlogin")}
              style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
