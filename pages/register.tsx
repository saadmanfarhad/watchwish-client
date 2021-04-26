import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/layout.tsx"
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const router = useRouter();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post(
        "http://localhost:8000/api/register",
        {
          username: username,
          password: password,
          email: email,
        },
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (register.data.id) {
        router.push("/login");
      }
    } catch (e) {
      if (e.response.data.hasOwnProperty("email")) {
        setRegistrationError(
          email?.length ? "Duplicate email" : "Email cannot be empty"
        );
      }
      if (e.response.data.hasOwnProperty("username")) {
        setRegistrationError(e.response.data.username);
      }
      if (e.response.data.hasOwnProperty("password")) {
        setRegistrationError(e.response.data.password);
      }
    }
  };

  return (
    <Layout header={false}>
      <div className="bg-gray-300 dark:bg-gray-800 lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h1 className="dark:text-gray-200 font-medium text-2xl mt-3 text-center">Register</h1>
          <form className="mt-6">
            <div className="my-5 text-sm">
              <label htmlFor="email" className="block dark:text-gray-200 text-black">
                Email
              </label>
              <input
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                type="email"
                autoFocus
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="email" className="block dark:text-gray-200 text-black">
                Username
              </label>
              <input
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                type="text"
                id="username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="password" className="block dark:text-gray-200 text-black">
                Password
              </label>
              <input
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                <a href="../../pages/auth/forget_password.html hover:text-black">
                  Forget Password?
                </a>
              </div>
            </div>

            <button
              className="block text-center text-white dark:text-gray-800 bg-gray-800 dark:bg-gray-300 p-3 duration-300 rounded-sm hover:bg-black dark:hover:bg-black dark:hover:text-gray-200 w-full"
              onClick={(e) => {
                e.preventDefault();
                handleRegistration(e);
              }}
            >
              Register
            </button>

            {registrationError?.length ? (
              <p className="text-center text-red-600 mt-2">{registrationError}</p>
            ) : undefined}
          </form>
        </div>
      </div>
    </Layout>
  );
}
