import React, { useState } from "react";

const AddComplaintForm = ({ onComplaintCreated }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [type, setType] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [attachment, setAttachment] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("type", type);
    formData.append("priority", priority);
    formData.append("user_id", user.id);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    const res = await fetch("http://localhost:5000/api/complaints", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Complaint submitted.");
      setSubject("");
      setDescription("");
      onComplaintCreated(data); // callback to refresh list if needed
    } else {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Create a New Complaint</h4>
      <form onSubmit={handleSubmit} className="card p-3 shadow">
        <div className="mb-3">
          <label>Subject</label>
          <input
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Type</label>
          <input
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Priority</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Attachment (optional)</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button className="btn btn-danger w-100">Submit Complaint</button>
      </form>
    </div>
  );
};

export default AddComplaintForm;
