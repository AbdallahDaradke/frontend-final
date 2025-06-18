import React, { useState } from "react";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const signup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (res.ok) {
        onRegister(data.user); // auto-login or redirect
        setMessage("User registered successfully");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("An error occurred while signing up");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4" style={{ minWidth: "300px" }}>
        <h3 className="text-center mb-4 text-danger">Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-danger w-100" onClick={signup}>
          Sign Up
        </button>
        {<p className="mt-3 text-center text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
