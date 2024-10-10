import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    admin: boolean;
    username: string;
    imgUrl: string | null;
  }

  interface User {
    id: string;
    role: string;
    admin: boolean;
    username: string;
    imgUrl: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    admin: boolean;
    username: string;
    imgUrl: string | null;
  }
}
