import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const WardenComplaints = () => {
  const { headers} = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: headers,
      });
      const jsonData = await response.json();

      setComplaints(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "POST",
        headers: headers,
      });

      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const deleteComplaint = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint.id !== id));
      } else {
        console.error("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4 sm:p-8 md:p-10 h-screen">
        <h1 className="text-2xl font-bold mt-20 mb-8">Complaints</h1>
        {complaints.length === 0 ? (
          <p className="ml-4 mt-2 text-gray-600 text-xl">
            No complaints registered yet.
          </p>
        ) : (
          <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
            {complaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
              >
                <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                  {complaint.name} (Room No.{complaint.room})
                </div>
                <p className="text-sm">
                  Created on {formatTimestamp1(complaint.created_at)}
                </p>
                <p className="mb-4 text-sm">
                  {complaint.assigned_at
                    ? `Completed on ${formatTimestamp(complaint.assigned_at)}`
                    : null}
                </p>
                <div className="text-md leading-normal text-gray-400 sm:block">
                  {complaint.description}
                </div>
                <div className="flex">
                  <button
                    className={`group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm ${
                      complaint.is_completed ? "bg-green-500" : "bg-red-600"
                    }`}
                    onClick={() => handleApproval(complaint.id)}
                  >
                    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                      {complaint.is_completed ? "Completed" : "Not Completed"}
                    </span>
                  </button>

                  <button
                    className="group flex w-1/3 mt-3 ml-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm bg-red-600"
                    onClick={() => deleteComplaint(complaint.id)}
                  >
                    <a
                      className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"
                      href="/"
                    >
                      Delete
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WardenComplaints;
