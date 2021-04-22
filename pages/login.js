import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginStarted, setIsLoginStarted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      console.log(router.query);
      setLoginError(router.query.error);
      setEmail(router.query.email);
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginStarted(true);
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
      <div className="py-8 px-8 rounded-xl">
        <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
        <form className="mt-6">
          <div className="my-5 text-sm">
            <label htmlFor="email" className="block text-black">
              Username
            </label>
            <input
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
              type="text"
              autoFocus
              id="email"
              value={email}
              placeholder="Username/Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5 text-sm">
            <label htmlFor="password" className="block text-black">
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
            className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
            // type="submit"
            // disabled={isLoginStarted}
            onClick={(e) => {
              e.preventDefault();
              handleLogin(e);
            }}
          >
            Login
          </button>

          {loginError.length ? <p className="text-center text-red-600 mt-2">{loginError}</p> : undefined}
        </form>

        <div className="flex md:justify-between justify-center items-center mt-10">
          <div
            style={{ height: "1px" }}
            className="bg-gray-300 md:block hidden w-4/12"
          ></div>
          <p className="md:mx-2 text-sm font-light text-gray-400">
            {" "}
            Login With Social{" "}
          </p>
          <div
            style={{ height: "1px" }}
            className="bg-gray-300 md:block hidden w-4/12"
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 mt-7">
          <div>
            <button className="text-center w-full text-white bg-blue-900 p-3 duration-300 rounded-sm hover:bg-blue-700">
              Facebook
            </button>
          </div>
          <div>
            <button className="text-center w-full text-white bg-blue-400 p-3 duration-300 rounded-sm hover:bg-blue-500">
              Twitter
            </button>
          </div>
        </div>

        <p className="mt-12 text-xs text-center font-light text-gray-400">
          {" "}
          Don't have an account?{" "}
          <a href="../auth/register.html" className="text-black font-medium">
            {" "}
            Create One{" "}
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
