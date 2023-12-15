import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/Headers";


function AccountPage() {
  const [userName, setUserName] = useState("");
  const [useremail, setemail] = useState("");
  const [userphone, setphone] = useState("");
  const [userUsn, setUsn] = useState("");
  const [userRoom, setRoom] = useState("");
  const [userblockID, setblockID] = useState("");
  const [userblockname, setblockname] = useState("");

  const [userType, setUserType] = useState(null);

  
  useEffect(() => {
   
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
          console.log(data.userType);
        } else {
          console.error('Failed to fetch user type');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []); 

  const getuserDetails = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/userDetails/${user_id}`, {
        method: "GET",
        headers: GetAuthHeader(),
      });
      const data = await response.json();
      console.log(data);
      setUserName(data[0].full_name)
      setemail(data[0].email)
      setphone(data[0].phone)
      setUsn(data[0].usn)
     setRoom(data[0].room);
     setblockID(data[0].block_id)
     setblockname(data[0].block_name)
    
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getuserDetails();
    console.log(userName);
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="mt-20 ml-5 mr-5 text-2xl font-semibold">Profile</h2>
  
      <ul className="mt-6 flex flex-col ml-5 mr-5 ">
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Name</span>
            <span>{userName}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Email</span>
            <span>{useremail}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Phone</span>
            <span>{userphone}</span>
          </div>
        </li>
        {userType !== 'warden' && (
            <>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>USN</span>
            <span>{userUsn}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Block ID</span>
            <span>{userblockID}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Block Name</span>
            <span>{userblockname}</span>
          </div>
        </li>
        <li className="lg:w-1/3 sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Room</span>
            <span>{userRoom}</span>
          </div>
        </li>
        </>
        )}
      </ul> 
      <button class="mt-5 ml-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<a class=" relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-blue-500 rounded-md group-hover:bg-opacity-0" href="/">
Back
</a>
</button>

  
    </>
  );
}

export default AccountPage;




