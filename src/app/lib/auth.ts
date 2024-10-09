import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";

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
          if (!user) {
            return null;
          }

          return user;
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
            where: { oAuthProviderId: profile.id?.toString() as string },
          });

          //If exists, reassign Oauth ID to DB ID & assign username
          if (existingUser !== null) {
            user.id = existingUser.id;
            user.name = existingUser.username;
          }

          //If no user exists, create new one
          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                username: profile.login as string,
                imgURL: profile.avatar_url as string,
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
  },
});

// const credentialsLogin = async (userCredentials: CredentialsLoginType) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { username: userCredentials?.username },
//     });

//     if (user === null) {
//       throw new Error("아이디가 존재하지 않습니다.");
//     }

//     const passwordCheck = await bcrypt.compare(
//       userCredentials.password,
//       user.password as string
//     );

//     if (!passwordCheck) {
//       throw new Error("아이디 또는 비밀번호가 맞지 않습니다");
//     }

//     return user;
//   } catch (err) {
//     throw new Error("로그인에 실패했습니다");
//   }
// };

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     Credentials({
//       async authorize(userCredentials) {
//         try {
//           const user = await credentialsLogin(
//             userCredentials as CredentialsLoginType
//           );
//           return user;
//         } catch (err) {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log(user, account, profile);
//       if (account?.provider === "github") {
//         try {
//           if (!profile) return false;

//           //Check for user in db
//           const existingUser = await prisma.user.findFirst({
//             where: { oAuthProviderId: profile.id as string },
//           });

//           //If exists, reassign Oauth ID to DB ID & assign username
//           if (existingUser !== null) {
//             user.id = existingUser.id;
//             user.username = existingUser.username;
//           }

//           //If no user exists, create new one
//           if (!existingUser) {
//             const newUser = await prisma.user.create({
//               data: {
//                 username: profile.login as string,
//                 imgURL: profile.avatar_url as string,
//                 oAuthProviderId: profile.id as string,
//               },
//             });

//             //Reassign Oauth ID to DB ID & assign username
//             user.id = newUser.id;
//             user.username = newUser.username;
//           }
//         } catch (err) {
//           return false;
//         }
//       }

//       return true;
//     },
//     ...authConfig.callbacks,
//   },
// });
