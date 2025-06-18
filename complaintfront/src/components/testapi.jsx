import { useEffect, useState } from "react";
import axios from "axios";

function TestAPI() {
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => {
        console.error("Failed to fetch complaints:", err);
        setComplaints([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#cc2b2b] mb-4">All Complaints</h2>
      <ul className="space-y-3">
        {complaints.length === 0 ? (
          <li className="text-gray-600">No complaints found.</li>
        ) : (
          complaints.map((c) => (
            <li
              key={c.ComplaintId}
              className="p-4 bg-white shadow border-l-4 border-[#cc2b2b] rounded"
            >
              <p className="font-semibold">Subject: {c.subject}</p>
              <p className="text-sm text-gray-600">Status: {c.status}</p>
              <p className="text-sm text-gray-600">Type: {c.type}</p>
              <p className="text-sm text-gray-600">Priority: {c.priority}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(c.date).toLocaleDateString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TestAPI;
