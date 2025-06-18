import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

function TopNavBar({ user, handleLogout, handleRegister, handleLogin }) {
  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-2 bg-danger text-white">
      <div>
        <span className="fw-bold me-3">Complaints Portal</span>
        <span>ABC</span>
      </div>
      <nav>
        {!user ? (
          <>
            <Link
              className="text-white me-3 text-decoration-none"
              to="/register"
            >
              Register
            </Link>
            <Link className="text-white text-decoration-none" to="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              className="text-white me-3 text-decoration-none"
              to="/ComplaintList"
            >
              My Complaints
            </Link>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default TopNavBar;
