import React, { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/Headers";
import clsx from "clsx";

const ComplaintForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }
    if (!description || description.trim() === "") {
      alert("Please enter a valid complaint.");
      return;
    }

    try {
      console.log(localStorage.getItem("jwtToken"));
      const headers = GetAuthHeader();
      console.log("headers", headers);
      const body = { name, description };
      const response = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    // <div className="max-w-lg bg-white shadow-md p-4 rounded-md mb-4 ml-11">
    //   <h2 className="text-xl font-semibold mb-4">Create Complaint</h2>
    //   <form onSubmit={onSubmitForm}>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="complaintName"
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //       >
    //         Complaint Name
    //       </label>
    //       <input
    //         type="text"
    //         id="complaintName"
    //         className="w-full border rounded-md py-2 px-3"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         placeholder="Enter complaint name..."
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label
    //         htmlFor="complaintDescription"
    //         className="block text-gray-700 text-sm font-bold mb-2"
    //       >
    //         Complaint Description
    //       </label>
    //       <textarea
    //         id="complaintDescription"
    //         className="w-full border rounded-md py-2 px-3"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         placeholder="Enter complaint description..."
    //       />
    //     </div>
    //     <div className="flex justify-end">
    //       <button
    //         type="submit"
    //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    //       >
    //         Create Complaint
    //       </button>
    //     </div>
    //   </form>
    // </div>


<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="mx-auto max-w-2xl">
    <div class="text-center">
      <h2 class="text-xl text-gray-800 font-bold sm:text-3xl">
        Submit a Complaint
      </h2>
    </div>

    
    <div class="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10">
      <form onSubmit={onSubmitForm}>
        <div class="mb-4 sm:mb-8">
          <input type="text" id="complaint-name" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Complaint Name "  onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
          <div class="mt-1">
            <textarea id="complaint-description" name="complaint-description" rows="3" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Complaint Description" onChange={(e) => setDescription(e.target.value)} ></textarea>
          </div>
        </div>

        <div class="mt-6 grid">
          <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            Create Complaint
          </button>
        </div>
      </form>
    </div>
  
  </div>
</div>


  );
};

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: GetAuthHeader(),
      });
      const jsonData = await response.json();

      setComplaints(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (complaint_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/complaints/${complaint_id}`,
        {
          method: "GET",
          headers: GetAuthHeader(),
        }
      );

      if (response.ok) {
        getComplaints();
      } else {
        console.error("Failed to update approval status");
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
    
    <div >
   
<h1 className="mt-4 ml-4 mb-1 text-2xl font-semibold">Complaints</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-4 mr-4">
  {complaints.map((complaint) => (
    <div key={complaint.complaint_id} className="mt-5 flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl">
      <div className="p-4 md:p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {complaint.name}
        </h3>
        <p className="mt-5 mb-3 text-gray-500 text-lg">
          {complaint.description}
        </p>
        <div className="flex-shrink-0">
          <button
            type="button"
            className={clsx(
              `text-white px-3 py-1 rounded-full mt-2 text-lg`,
              complaint.is_completed ? "bg-green-500" : "bg-red-600"
            )}
            onClick={() => handleApproval(complaint.id)}
          >
            {complaint.is_completed ? "Completed" : "Not Completed"}
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
         <ComplaintForm />
       </div>
  );
};

export default ComplaintsPage;
