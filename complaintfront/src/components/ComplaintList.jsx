import React from "react";
import { useState, useEffect } from "react";
import AddComplaintForm from "./AddComplaintForm";
import { Link } from "react-router-dom";
import EditComplaintForm from "./EditComplaintForm";

function ComplaintList({ user }) {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await fetch(
      `http://localhost:5000/api/complaints/user/${user.id}`
    );
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    if (user) fetchComplaints();
  }, [user]);

  return (
    <div className="container mt-4">
      <Link to="/addComplaint" className="btn btn-danger mb-3">
        + Add New Complaint
      </Link>
      {/* <AddComplaintForm onComplaintCreated={fetchComplaints} /> */}
      <h2 className="mb-4">My Complaints</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.ComplaintId}>
              <td>{c.ComplaintId}</td>
              <td>{c.subject}</td>
              <td>{c.status}</td>
              <td>{new Date(c.date).toLocaleDateString()}</td>
              <td>{c.priority}</td>
              <td>{c.type}</td>
              <td>{c.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintList;
