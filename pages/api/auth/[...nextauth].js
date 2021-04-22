import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const providers = [
  Providers.Credentials({
    name: "Credentials",
    authorize: async (credentials) => {
      try {
        console.log("In here");
        const user = await axios.post(
          `http://localhost:8000/api/login`,
          {
            password: credentials.password,
            email: credentials.email,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        if (user.data.accessToken) {
          console.log(user.data);
          // return { status: "success", data: user.data.user };
          return user.data;
        }
      } catch (e) {
        const errorMessage = e.response.data.detail;
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + "&email=" + credentials.email);
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      console.log("user", user);
      token.accessToken = user.accessToken;
      console.log("token", token);
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    console.log("session", session);
    console.log("token", token);
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/login",
    error: "/login", // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);
