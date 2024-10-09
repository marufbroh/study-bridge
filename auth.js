import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs/dist/bcrypt";
import { authConfig } from "./auth.config";

// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.AUTH_GOOGLE_ID,
//         client_secret: process.env.AUTH_GOOGLE_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token?.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens?.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
//       refreshToken: refreshedTokens?.refresh_token,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            // console.log("isMatch", isMatch);

            if (isMatch) {
              return user;
            } else {
              throw new Error("User password hasn't matched.");
            }
          } else {
            throw new Error("User not found.");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (account && user) {
  //       return {
  //         accessToken: account?.access_token,
  //         accessTokenExpires: Date.now() + account?.expires_in * 1000,
  //         refreshToken: account?.refresh_token,
  //         user,
  //       };
  //     }

  //     if (Date.now() < token?.accessTokenExpires) {
  //       return token;
  //     }

  //     return refreshAccessToken(token);
  //   },
  //   async session({ session, token }) {
  //     session.user = token?.user;
  //     session.accessToken = token?.access_token;
  //     session.error = token?.error;

  //     return session;
  //   },
  // },
});
