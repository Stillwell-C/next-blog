import Link from "next/link";
import { auth } from "@/lib/auth";
import { handleLogout } from "../lib/actions";
import RedirectLink from "./RedirectLink";

const Navbar = async () => {
  const session = await auth();

  console.log(session);

  const signInButton = <RedirectLink pathname='/login' linkText='로그인' />;
  const signOutButton = (
    <form action={handleLogout}>
      <button>Sign Out</button>
    </form>
  );

  return (
    <nav className='w-full flex justify-around p-8'>
      <div>links</div>
      <h1>
        <Link href={"/"} className='text-3xl'>
          Next Blog
        </Link>
      </h1>
      <div>{!session ? signInButton : signOutButton}</div>
    </nav>
  );
};

export default Navbar;
