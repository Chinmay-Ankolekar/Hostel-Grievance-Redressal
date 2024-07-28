import { useNavigate, Link } from "react-router-dom";
import { Roles } from "../constants";
import { useState } from "react";

function Register() {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(Roles.STUDENT);
  const [block_id, setBlock_id] = useState("");
  const [usn, setUsn] = useState("");
  const [room, setRoom] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let body;
      if (role === Roles.WARDEN) {
        body = {
          full_name: fullname,
          email,
          password,
          phone,
          type: role,
          block_id,
        };
      } else {
        body = {
          full_name: fullname,
          email,
          password,
          phone,
          type: role,
          block_id,
          usn,
          room,
        };
      }
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "content-type": "application/json " },
        body: JSON.stringify(body),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.jwtToken) {
        alert("User registered successfully,login to proceed");
        navigate('/login')
      } else {
        alert("user already exists");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="a"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.6) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    stroke-width="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#a)"
              />
            </svg>
          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg
              id="patternId"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="b"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <rect x="0" y="0" width="100%" height="100%" fill="none" />
                  <path
                    d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                    stroke-width="1"
                    stroke="none"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="800%"
                height="800%"
                transform="translate(0,0)"
                fill="url(#b)"
              />
            </svg>
          </div>

          <div className="relative flex flex-col sm:w-full md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a
                  href="#"
                  className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
                >
                  <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">
                    Signup.
                  </span>
                </a>
              </div>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
                Welcome!
              </h4>
              <p className="mb-6 text-gray-500">
                Please sign-in to access your account
              </p>

              <form className="mb-4" action="#" method="POST">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="text"
                      className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="full-name"
                      placeholder="Enter your full name"
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="email"
                      name="email-username"
                      placeholder="Enter your email "
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="Enter your phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Block ID
                    </label>
                    <input
                      type="text"
                      className={`block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow ${
                        role === Roles.WARDEN && "w-full"
                      }`}
                      id="email"
                      name="email-username"
                      placeholder="Enter your Block ID"
                      autoFocus
                      onChange={(e) => setBlock_id(e.target.value)}
                    />
                  </div>
                  {role === Roles.WARDEN ? null : (
                    <div className="flex-1">
                      <label
                        htmlFor="password"
                        className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      >
                        Room
                      </label>
                      <input
                        type="text"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        name="password"
                        placeholder="Enter your Room"
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div
                    className={
                      role === Roles.STUDENT ? "flex-1 w-full" : "flex-1"
                    }
                  >
                    {role === Roles.STUDENT && (
                      <>
                        <label
                          htmlFor="email"
                          className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                        >
                          USN
                        </label>
                        <input
                          type="text"
                          className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                          name="email-username"
                          placeholder="Enter your USN"
                          autoFocus
                          onChange={(e) => setUsn(e.target.value)}
                        />
                      </>
                    )}
                    <label
                      htmlFor="password"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="relative block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="············"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="role"
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    >
                      Role
                    </label>
                    <div className="flex gap-x-3 w-fit pl-2 pr-2 bg-slate-100 rounded-md text-sm">
                      <button
                        type="button"
                        onClick={() => setRole(Roles.WARDEN)}
                        className={`rounded-md p-2 my-1 transition-all text-black ${
                          role === Roles.WARDEN && " bg-indigo-500 text-white"
                        }`}
                      >
                        Warden
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole(Roles.STUDENT)}
                        className={`rounded-md p-2 my-1 transition-all text-black ${
                          role === Roles.STUDENT && "bg-indigo-500 text-white"
                        }`}
                      >
                        Student
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mb-4 text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                >
                  {" "}
                  Login{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
