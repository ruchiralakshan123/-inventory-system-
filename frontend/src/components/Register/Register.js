import React, { useState } from "react";
import { User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

import "../../styles.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fullname, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1️⃣ Check if email already exists
      const emailCheckRes = await fetch(`http://localhost:8080/checkEmail?email=${email}`);
      if (emailCheckRes.ok) {
        const emailExists = await emailCheckRes.json();
        if (emailExists) {
          setError("Email already exists");
          setIsLoading(false);
          return;
        }
      }

      // 2️⃣ Send user data to backend
      const res = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="register-container">
        <div className="register-header">
          <div className="register-header-icon">
            <User />
          </div>
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="fullname" className="input-label">Full Name</label>
            <User className="input-icon" />
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => {
                const re = /^[A-Za-z\s]*$/;
                if (re.test(e.target.value)) onInputChange(e);
              }}
              placeholder="Enter your full name"
              required
              className="input-field"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">Email Address</label>
            <Mail className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onInputChange}
              placeholder="Enter your email"
              required
              className="input-field"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password" className="input-label">Password</label>
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={onInputChange}
              placeholder="Create a password"
              required
              className="input-field"
              style={{ paddingRight: "3rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-wrapper">
            <label htmlFor="phone" className="input-label">Phone Number</label>
            <Phone className="input-icon" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => {
                const re = /^[0-9\b]{0,10}$/;
                if (re.test(e.target.value)) onInputChange(e);
              }}
              placeholder="Enter your phone number"
              maxLength="10"
              pattern="[0-9]{10}"
              title="Please enter exactly 10 digits"
              required
              className="input-field"
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  border: "3px solid white",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "0.5rem",
                }} />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="login-link">
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/login")}>
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
