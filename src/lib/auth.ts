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
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          return credentials;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      //console.log(user, account, profile);
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
          console.log(err);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
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
  },
});
