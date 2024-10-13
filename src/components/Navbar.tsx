import Link from "next/link";
import { auth } from "@/lib/auth";
import { handleLogout } from "../lib/actions";
import RedirectLink from "./RedirectLink";
import SearchForm from "./SearchForm";

const Navbar = async () => {
  const session = await auth();

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
      <div>
        <SearchForm />
        <div>{!session ? signInButton : signOutButton}</div>
      </div>
    </nav>
  );
};

export default Navbar;
