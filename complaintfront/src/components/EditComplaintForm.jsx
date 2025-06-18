import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditComplaintForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/${id}`)
      .then((res) => res.json())
      .then((data) => setComplaint(data))
      .catch(() => alert("Error fetching complaint"));
  }, [id]);

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await fetch(
      `http://localhost:5000/api/complaints/user/${user.id}`
    );
    const data = await res.json();
    setComplaints(data);
  };

  const handleChange = (e) => {
    setComplaints({ ...complaints, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in complaints) {
      formData.append(key, complaints[key]);
    }

    const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      navigate("/ComplaintList");
    } else {
      alert("Failed to update complaint");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="subject"
          className="form-control mb-2"
          placeholder="Subject"
          value={complaints.subject}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={complaints.description}
          onChange={handleChange}
        />
        <input
          name="status"
          className="form-control mb-2"
          placeholder="Status"
          value={complaints.status}
          onChange={handleChange}
        />
        <input
          name="type"
          className="form-control mb-2"
          placeholder="Type"
          value={complaints.type}
          onChange={handleChange}
        />
        <input
          name="priority"
          className="form-control mb-2"
          placeholder="Priority"
          value={complaints.priority}
          onChange={handleChange}
        />
        <button className="btn btn-danger">Update Complaint</button>
      </form>
    </div>
  );
};

export default EditComplaintForm;
