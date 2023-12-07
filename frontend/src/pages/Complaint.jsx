import React from 'react';

const ComplaintForm = () => {
  return (
    <div className="max-w-lg bg-white shadow-md p-4 rounded-md mb-4 ml-11">
      <h2 className="text-xl font-semibold mb-4">Create Complaint</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="complaintName" className="block text-gray-700 text-sm font-bold mb-2">
            Complaint Name
          </label>
          <input
            type="text"
            id="complaintName"
            className="w-full border rounded-md py-2 px-3"
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
            placeholder="Enter complaint description..."
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
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
  return (
    <div className="flex flex-col items-start justify-start min-h-screen gap-x-10">

      {/* Heading */}
      <h1 className="mt-5 ml-5 mb-5 text-3xl">Complaints</h1>

      <div className="flex">
        {/* Complaint Card */}
        <div className="max-w-xl bg-white shadow-md p-4 rounded-md mb-[160px] ml-8">
          <h2 className="text-lg font-semibold mb-2">Complaint Title</h2>
          <div className="flex items-center mb-2">
            {/* Left Column: Description */}
            <div className="flex-1 pr-4">
              <p className="text-gray-700">
                This is the description of the card. You can add more details here as needed.
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
        <ComplaintForm />
      </div>
    </div>
  );
};

export default ComplaintsPage;
