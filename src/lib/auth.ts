import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      async authorize(user) {
        try {
          if (
            typeof user.id !== "string" ||
            typeof user.username !== "string" ||
            (typeof user.imgUrl !== "string" && user.imgUrl !== null) ||
            typeof user.role !== "string"
          ) {
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            imgUrl: user.imgUrl,
            role: user.role,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        try {
          if (!profile) return false;

          //Check for user in db
          const existingUser = await prisma.user.findFirst({
            where: { oAuthProviderId: profile.id?.toString() },
          });

          //If exists, reassign Oauth ID to DB ID & assign username
          if (existingUser !== null) {
            user.id = existingUser.id;
            user.username = existingUser.username;
            user.imgUrl = existingUser.imgUrl;
          }

          //If no user exists, create new one
          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                username: profile.login as string,
                imgUrl: profile.avatar_url as string,
                oAuthProviderId: profile.id?.toString() as string,
              },
            });

            //Reassign Oauth ID to DB ID & assign username
            user.id = newUser.id;
            user.name = newUser.username;
          }
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error - updateUserImg: ", err);
          }
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (user) {
        token.id = user.id || "";
        token.username = user.username || "";
        token.admin = user?.role === "ADMIN" || false;
        token.imgUrl = user.imgUrl || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.admin = token.admin;
        session.user.imgUrl = token.imgUrl;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const admin = auth?.user.admin;

      const currentURL: string = request?.nextUrl?.pathname;

      //Prevent logged in users from reaching the login or register pages
      //Also redirects logged in users above from login to home
      const isOnLoginPage = currentURL.startsWith("/login");
      const isOnRegisterPage = currentURL.startsWith("/register");
      if ((isOnLoginPage || isOnRegisterPage) && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      //Prevent non-admins from editing/posting posts
      const isOnCreatePostPage = currentURL.match(/\/posts\/[^/]+\/edit/g);
      const isOnPostCreatePage = currentURL.match(/\/posts\/create/g);
      if ((isOnCreatePostPage || isOnPostCreatePage) && !admin) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      //Prevent non-logged in users from accessing post reply or profile pages
      const isOnPostReplyPage = currentURL.match(/\/posts\/[^/]+\/reply/);
      const isOnProfilePage = currentURL.match(/\/profile/);
      if ((isOnPostReplyPage || isOnProfilePage) && !user?.id) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
});
