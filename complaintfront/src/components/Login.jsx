import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.user); // pass user back to App
        // navigate("/ComplaintList"); // redirect to ComplaintList
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  // return (
  //   <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
  //     <div className="card p-4" style={{ minWidth: "300px" }}>
  //       <h3 className="text-center mb-4 text-danger">Login</h3>

  //       <input
  //         className="form-control mb-2"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />

  //       <input
  //         className="form-control mb-3"
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />

  //       <button className="btn btn-primary w-100" onClick={login}>
  //         Sign In
  //       </button>

  //       {message && <p className="mt-3 text-center text-muted">{message}</p>}
  //     </div>
  //   </div>
  // );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-danger">Login</h3>

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-danger w-100" onClick={login}>
          Sign In
        </button>

        {message && <p className="mt-3 text-center text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
