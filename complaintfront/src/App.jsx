import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TestAPI from "./components/testapi";
import ComplaintList from "./components/ComplaintList.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AddComplaintForm from "./components/AddComplaintForm.jsx";
import EditComplaintForm from "./components/EditComplaintForm.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import TopNavBar from "./components/TopNavBar.jsx";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const handleRegister = (userData) => {
    console.log("User registered:", userData);
    localStorage.setItem("user", JSON.stringify(userData)); // store user info
  };
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/ComplaintList");
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear localStorage
    setUser(null); // clear user state
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100 ">
      {/* Header */}
      <TopNavBar
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />

      {/* Main content */}
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/ComplaintList"
            element={
              user ? <ComplaintList user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/addComplaint"
            element={
              user ? <AddComplaintForm user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditComplaintForm user={user} ComplaintList={ComplaintList} />
            }
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/ComplaintList" : "/login"} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-2">
        ABC All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
