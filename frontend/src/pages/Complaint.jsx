import React, { useState, useEffect } from 'react';

const ComplaintForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === '') {
        alert('Please enter a valid name.');
        return; 
      }
    if (!description || description.trim() === '') {
        alert('Please enter a valid complaint.');
        return; 
      }

    try {
        
      const body = { name, description };
      const response = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: { "content-Type": "application/json" , "Authorization" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjE3LCJ0eXBlIjoic3R1ZGVudCJ9LCJpYXQiOjE3MDIxNDMwNjIsImV4cCI6MTcwMjE0NjY2Mn0.R96fq5ARfTYmfloexEcNTi4l2GUJ8nsxOPlyx4INMgc"},
        body: JSON.stringify(body),
      });
      window.location="/"
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-md p-4 rounded-md mb-4 ml-11">
      <h2 className="text-xl font-semibold mb-4">Create Complaint</h2>
      <form onSubmit={onSubmitForm}>
        <div className="mb-4">
          <label htmlFor="complaintName" className="block text-gray-700 text-sm font-bold mb-2">
            Complaint Name
          </label>
          <input
            type="text"
            id="complaintName"
            className="w-full border rounded-md py-2 px-3"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder="Enter complaint name..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="complaintDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Complaint Description
          </label>
          <textarea
            id="complaintDescription"
            className="w-full border rounded-md py-2 px-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter complaint description..."
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

const ComplaintsPage = () => {
  const [ complaints , setComplaints ] = useState([]);

  const getComplaints = async (e) => {
   
    try {
      const response = await fetch("http://localhost:3000/complaints");
      const jsonData = await response.json();

      setComplaints(jsonData);
      
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

      {/* Heading */}
      <h1 className="mt-5 ml-5 mb-5 text-3xl">Complaints</h1>

    { complaints.map((complaint) => (
      <div key={complaint.complaint_id} className="flex">
        {/* Complaint Card */}
        <div className="max-w-xl bg-white shadow-md p-4 rounded-md mb-[160px] ml-8">
          <h2 className="text-lg font-semibold mb-2">{complaint.name}</h2>
          <div className="flex items-center mb-2">
            {/* Left Column: Description */}
            <div className="flex-1 pr-4">
              <p className="text-gray-700">
                {complaint.description}
              </p>
            </div>

            {/* Right Column: Approved and Done */}
            <div className="flex-shrink-0">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full mb-2">Not Approved</div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full">Not Done</div>
            </div>
          </div>
          
        </div>

        {/* Complaint Form */}
      </div>
 ))}        <ComplaintForm />

    </div>
  );
};

export default ComplaintsPage;
