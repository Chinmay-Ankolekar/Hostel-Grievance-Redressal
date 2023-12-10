import React, { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/Headers";

const WardenComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: GetAuthHeader()
      });
      const jsonData = await response.json();

      setComplaints(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (complaint_id, currentStatus) => {
    try {
        const newStatus = !currentStatus;
      const response = await fetch(`http://localhost:3000/complaints/${complaint_id}`, {
        method: "GET",
        headers: GetAuthHeader(),
      });
      is_completed = newStatus;
      if (response.ok) {
        getComplaints();
      } else {
        console.error('Failed to update approval status');
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  

  console.log(complaints);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen gap-x-10">
   
      <h1 className="mt-5 ml-5 mb-5 text-3xl">Complaints</h1>
      {complaints.map((complaint) => (
        <div key={complaint.complaint_id} className="flex">

          <div className="max-w-xl bg-white shadow-md p-4 rounded-md mb-[160px] ml-8">
            <h2 className="text-lg font-semibold mb-2">{complaint.name}</h2>
            <div className="flex items-center mb-2">
   
              <div className="flex-1 pr-4">
                <p className="text-gray-700">{complaint.description}</p>
              </div>


              <div className="flex-shrink-0">
            <button
              className={`bg-${complaint.is_completed ? 'green' : 'red'}-500 text-white px-3 py-1 rounded-full mb-2`}
              onClick={() => handleApproval(complaint.complaint_id, complaint.is_completed)}
            >
              {complaint.is_completed ? 'Not Approved' : 'Approved'}
            </button>
            <div className="bg-red-500 text-white px-3 py-1 rounded-full">
              Not Done
            </div>
          </div>
            </div>
          </div>

   
        </div>
      ))}{" "}
  
    </div>
  );
};

export default WardenComplaints;
