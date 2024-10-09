import Link from "next/link";
import { auth } from "@/app/lib/auth";
import { handleLogout } from "../lib/actions";

const Navbar = async () => {
  const session = await auth();

  const signInButton = <Link href='/auth/login'>Sign In</Link>;
  const signOutButton = (
    <form action={handleLogout}>
      <button>Sign Out</button>
    </form>
  );

  return (
    <nav className='w-full flex justify-around p-8'>
      <div>links</div>
      <div>Next Blog</div>
      <div>{!session ? signInButton : signOutButton}</div>
    </nav>
  );
};

export default Navbar;
