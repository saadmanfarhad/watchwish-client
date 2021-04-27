import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const providers = [
  Providers.Credentials({
    name: "Credentials",
    authorize: async (credentials) => {
      try {
        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/login`,
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
          return user.data;
        }
      } catch (e) {
        const errorMessage = e.response.data.detail;
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage + "&email=" + credentials.email);
      }
    },
  }),
  Providers.Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Providers.Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }),
];

const callbacks = {
  async signIn(user, account, metadata) {
    if (account.provider === "google") {
      const googleUser = {
        email: metadata.email,
        first_name: metadata.given_name,
        last_name: metadata.family_name,
        avatar: metadata.picture,
        access_token: account.id_token,
        provider: account.provider,
      };

      const accessToken = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/login/social`,
        googleUser,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (accessToken.data.status) {
        user.accessToken = accessToken.data.accessToken;
        return true;
      }
      return false;
    }

    if (account.provider === 'facebook') {
      const fullName = user.name.split(" ");
      const lastName = fullName[fullName.length - 1];
      const firstName = fullName.slice(0, fullName.length).join(" ");
      const facebookUser = {
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        avatar: user.picture,
        access_token: account.accessToken,
        provider: account.provider,
      };

      const accessToken = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/login/social`,
        facebookUser,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (accessToken.data.status) {
        user.accessToken = accessToken.data.accessToken;
        return true;
      }
      return false;
    }

    if (account.provider === "credentials") {
      if (user) {
        return true;
      }

      return false;
    }
  },

  async jwt(token, user) {
    if (user) {
      token.accessToken = user.accessToken;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/user`, {
      headers: {
        Authorization: `Token ${session.accessToken}`,
      },
    });
    session.user = user.data;
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
