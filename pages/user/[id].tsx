import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { Layout } from "../../components/layout";
import { Unauthorized } from "../../components/unauthorized";
import axios from "axios";
import { useState } from "react";

const UserProfile = ({ session }) => {
  const router = useRouter();
  const [about, setAbout] = useState(session.user.about);

  const updateUserAbout = async () => {
    try {
      if (about.length) {
        const add = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/user/about`,
          {
            user: session.user.id,
            about: about,
          },
          {
            headers: {
              Authorization: `Token ${session.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (add.data.status) {
          router.replace(router.asPath);
        }
      }
    } catch (e) {
      console.error(e.response.data);
      const errorMessage = e.response.data.detail;
    }
  };

  if (!session)
    return (
      <Layout>
        <Unauthorized />
      </Layout>
    );

  return (
    // <!-- component -->
    <Layout>
      <div className="w-full relative shadow-2xl rounded  overflow-hidden">
        <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            alt=""
            className="bg w-full h-full object-cover object-center absolute z-0"
          />
          <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
            <img
              src={session.user.avatar}
              className="h-24 w-24 object-cover rounded-full"
            />
            <h1 className="text-2xl font-semibold">
              {session.user.first_name} {session.user.last_name}
            </h1>
            <h4 className="text-sm font-semibold">
              Joined Since '{session.user.date_joined.split("-")[0].slice(-2)}
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-12 bg-white dark:bg-gray-900">
          <div className="col-span-12 w-full px-3 pt-6 justify-center flex space-x-4 md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
            <a
              href="#"
              className="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold"
            >
              Basic Information
            </a>

            <a
              href="#"
              className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200"
            >
              Friend List
            </a>
          </div>

          <div className="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
            <div className="px-4 pt-4">
              <form action="#" className="flex flex-col space-y-8">
                <div>
                  <h3 className="text-2xl text-gray-800 dark:text-gray-100 font-semibold">
                    Basic Information
                  </h3>
                  <hr />
                </div>

                <div className="form-item">
                  <label className="text-xl text-gray-800 dark:text-gray-100">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={`${session.user.first_name} ${session.user.last_name}`}
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                    disabled
                  />
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                  <div className="form-item w-full">
                    <label className="text-xl text-gray-800 dark:text-gray-100">
                      Username
                    </label>
                    <input
                      type="text"
                      value={session.user.username}
                      className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                      disabled
                    />
                  </div>

                  <div className="form-item w-full">
                    <label className="text-xl text-gray-800 dark:text-gray-100">
                      Email
                    </label>
                    <input
                      type="text"
                      value={session.user.email}
                      className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    More About Me
                  </h3>
                  <hr />
                </div>

                <div className="form-item w-full">
                  <label className="text-xl text-gray-800 dark:text-gray-100">
                    Biography
                  </label>
                  <textarea
                    disabled={router.query.id == session.user.id ? false : true}
                    placeholder="Write something about yourself..."
                    cols={30}
                    rows={10}
                    value={about ? about : ""}
                    onChange={(event) => setAbout(event.target.value)}
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <button
                  disabled={router.query.id == session.user.id ? false : true}
                  className="bg-green-500 text-white hover:bg-green-600 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    updateUserAbout();
                  }}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};

export default UserProfile;
