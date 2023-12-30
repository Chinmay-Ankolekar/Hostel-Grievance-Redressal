import { Roles } from "../constants";
import { useState } from "react";
import { clsx } from "clsx";

function Register() {
  const [ fullname, setFullname ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [role, setRole] = useState(Roles.STUDENT);
  const [block_id, setBlock_id] = useState("");
  const [usn, setUsn] = useState("");
  const [room, setRoom] = useState("");
  const onSubmit = async(e) => {
    e.preventDefault();

    try {
        // const body = {full_name:fullname, email, password,phone, type: role, block_id, usn, room}
        let body;
      if (role === Roles.WARDEN) {
        body = { full_name: fullname, email, password, phone, type: role, block_id };
      } else {
        body = { full_name: fullname, email, password, phone, type: role, block_id, usn, room };
      }
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {"content-type": "application/json "},
            body : JSON.stringify(body),
        });
        console.log(response)
        const data = await response.json();
        console.log(data);
       if(data.jwtToken) {
        window.location = "/"
       }
       else {
        alert("user already exists")
       }
       
        //window.location = "/signup"
    }catch(err) {
        console.log(err.message);
    }
  }
  return (
    <>
      {/* <div class="" >
        <div class="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
          <div class="w-full max-w-md mx-auto p-6">
            <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div class="p-4 sm:p-7">
                <div class="text-center">
                  <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign up
                  </h1>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?
                    <a
                      class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/login"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>

                <div class="mt-5">
                  <form>
                    <div class="grid gap-y-4">
                      <div>
                        <label
                          for="full-name"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Full Name
                        </label>
                        <div class="relative">
                          <input
                            type="text"
                            id="full-name"
                            name="full-name"
                            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="full-name-error"
                            onChange={(e) => setFullname(e.target.value)}
                          />
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="full-name-error"
                        >
                          Please enter your full name
                        </p>
                      </div>

                      <div>
                        <label
                          for="email"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Email address
                        </label>
                        <div class="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="email-error"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p>
                      </div>

                      <div>
                        <label
                          for="phone-number"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <div class="relative">
                          <input
                            type="tel"
                            id="phone-number"
                            name="phone-number"
                            pattern="[0-9]{10}"
                            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="phone-number-error"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="phone-number-error"
                        >
                          Please enter a valid 10-digit phone number
                        </p>
                      </div>

                      <div>
                        <label
                          for="password"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                        <div class="relative">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="password-error"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="password-error"
                        >
                          8+ characters required
                        </p>
                      </div>

                      <div>
                        <label
                          for="full-name"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Block-Id
                        </label>
                        <div class="relative">
                          <input
                            type="text"
                            id="full-name"
                            name="full-name"
                            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="full-name-error"
                            onChange={(e) => setBlock_id(e.target.value)}
                          />
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="full-name-error"
                        >
                          Please enter your Block-Id
                        </p>
                      </div>
                      {role !== Roles.WARDEN && (
                      <div>
                        <label
                          for="full-name"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          USN
                        </label>
                        <div class="relative">
                       
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  required
                  aria-describedby="full-name-error"
                  onChange={(e) => setUsn(e.target.value)}
                />
           
                          <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="full-name-error"
                        >
                          Please enter your USN
                        </p>
                      </div>
   )}
    {role !== Roles.WARDEN && (
                      <div>
                        <label
                          for="full-name"
                          class="block text-sm mb-2 dark:text-white"
                        >
                          Room No.
                        </label>
                        <div class="relative">
                         
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  required
                  aria-describedby="full-name-error"
                  onChange={(e) => setRoom(e.target.value)}
                />
             
                          <div class=" hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          class="hidden text-xs text-red-600 mt-2"
                          id="full-name-error"
                        >
                          Please enter your Room.no
                        </p>
                        
                      </div>
 )}
                      <div>
                        <p className="text-sm text-white">Role</p>
                        <div className="flex gap-x-3 w-fit pl-2 pr-2 dark:bg-slate-900 rounded-md text-sm">
                          <button
                            type="button"
                            onClick={() => setRole(Roles.WARDEN)}
                            className={clsx(
                              "rounded-md p-2 my-1 transition-all text-white",
                              role === Roles.WARDEN && "bg-blue-600 text-white"
                            )}
                          >
                            Warden
                          </button>
                          <button
                            type="button"
                            onClick={() => setRole(Roles.STUDENT)}
                            className={clsx(
                              "rounded-md p-2 my-1   transition-all  text-white",
                              role === Roles.STUDENT && "bg-blue-600 text-white"
                            )}
                          >
                            Student
                          </button>
                      
                        </div>
                      </div>
                    

                      <button
                        type="submit"
                        class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 mt-4"
                        onClick={onSubmit}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


<div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
              <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'>
                <rect x='0' y='0' width='100%' height='100%' fill='none'/>
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/>
              </pattern>
            </defs>
            <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/>
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
          <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
          <defs>
              <pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'>
                <rect x='0' y='0' width='100%' height='100%' fill='none'/>
                <path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/>
              </pattern>
            </defs>
            <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)'/>
          </svg>
        </div>


        <div className="relative flex flex-col sm:w-full md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
     
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">Signup.</span>
              </a>
            </div>
    
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
            <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

            <form className="mb-4" action="#" method="POST">
            
            <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Full Name</label>
              
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input type="text"  className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="full-name" placeholder="Enter your full name" onChange={(e) => setFullname(e.target.value)}/>
                </div>
              </div>
    
              <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email-username" placeholder="Enter your email " autoFocus onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Phone Number</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="password" placeholder="Enter your phone number"  onChange={(e) => setPhone(e.target.value)}/>
                </div>
              </div>
              <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Block ID</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email-username" placeholder="Enter your Block ID" autoFocus onChange={(e) => setBlock_id(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Room</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="password" placeholder="Enter your Room" onChange={(e) => setRoom(e.target.value)}/>
                </div>
              </div>
              <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">USN</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="email-username" placeholder="Enter your USN" autoFocus  onChange={(e) => setUsn(e.target.value)}/>
                </div>
                <div className="flex-1">
                  <label htmlFor="role" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Role</label>
                  <div className="flex gap-x-3 w-fit pl-2 pr-2 bg-slate-100 rounded-md text-sm">
                    <button
                      type="button"
                      onClick={() => setRole(Roles.WARDEN)}
                      className={`rounded-md p-2 my-1 transition-all text-black ${role === Roles.WARDEN && " bg-indigo-500 text-white"}`}
                    >
                      Warden
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(Roles.STUDENT)}
                      className={`rounded-md p-2 my-1 transition-all text-black ${role === Roles.STUDENT && "bg-indigo-500 text-white"}`}
                    >
                      Student
                    </button>
                  </div>
                </div>
              </div>


              <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
              
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input type="password" id="password" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="············" onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>
              
              <div className="mb-4">
                <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit" onClick={onSubmit}>Sign in</button>
              </div>
            </form>

            <p className="mb-4 text-center">
              Already have an account?
              <a href="/login" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Login </a>
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default Register;
