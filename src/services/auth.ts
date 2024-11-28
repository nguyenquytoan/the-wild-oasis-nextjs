import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuestApi, getGuestApi } from "./guest";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // authorized: ({ auth, request }: any) => {
    //   return !!auth?.user;
    // },
    authorized: ({ auth }: any) => {
      return !!auth?.user;
    },
    // signIn: async ({ user, account, profile }: any) => {
    //   try {
    //     const existingGuest = await getGuestApi(user.email);

    //     if (!existingGuest) {
    //       await createGuestApi({ email: user.email, full_name: user.name });
    //     }

    //     return true;
    //   } catch (err) {
    //     return false;
    //   }
    // },
    signIn: async ({ user }: { user: User }) => {
      try {
        const existingGuest = await getGuestApi(user?.email || "");

        if (!existingGuest) {
          await createGuestApi({
            email: user?.email || "",
            full_name: user?.name || "",
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    // session: async ({ session, user }: any) => {
    //   const guest = await getGuestApi(session.user.email);
    //   session.user.guestId = guest.id;
    //   return session;
    // },
    session: async ({ session }: any) => {
      const guest = await getGuestApi(session.user?.email || "");
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
