import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "#4f46e5",
        color: "white",
        padding: "1rem 2rem",
        fontWeight: "bold",
        fontSize: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
        aria-label="Go to Home"
      >
        My Awesome App
      </div>

      <nav>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: 15,
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </nav>
    </header>
  );
}

export default Header;
