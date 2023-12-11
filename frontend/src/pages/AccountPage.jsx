import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/Headers";

function AccountPage() {
  const [userDetails, setUserDetails] = useState({
    full_name: ""
  });

  const getuserDetails = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/userDetails/${user_id}`, {
        method: "GET",
        headers: GetAuthHeader(),
      });
      const jsonData = await response.json();

      setUserDetails(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getuserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="mt-3 ml-5 mr-5 text-2xl font-semibold">Profile</h2>
       {/* {userDetails.map((userdetail) => ( 
      <ul className="mt-6 flex flex-col ml-5 mr-5 " key={userdetail.user_id}>
        <li className="lg:w-1/3 sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Name</span>
            <span>{userdetail.full_name}</span>
          </div>
        </li>
      </ul> 
      ))} */}
    </>
  );
}

export default AccountPage;
