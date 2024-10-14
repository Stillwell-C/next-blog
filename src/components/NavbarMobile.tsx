"use client";

import { useState } from "react";
import HamburgerBtn from "./HamburgerBtn";
import NavbarUserInfo from "./NavbarUserInfo";
import Link from "next/link";
import SearchForm from "./SearchForm";
import RedirectLink from "./RedirectLink";
import { handleLogout } from "@/lib/actions";
import { Session } from "next-auth";
import ToggleThemes from "./ToggleThemes";

type Props = { session: Session | null };

const NavbarMobile = ({ session }: Props) => {
  const [openBar, setOpenBar] = useState(false);

  const signInButton = <RedirectLink pathname='/login' linkText='로그인' />;
  const signOutButton = (
    <form action={handleLogout}>
      <button>Sign Out</button>
    </form>
  );

  return (
    <div className='flex md:hidden'>
      <div className='flex items-center gap-4'>
        <ToggleThemes />
        <HamburgerBtn open={openBar} setOpen={setOpenBar} />
      </div>
      <nav
        aria-label='모바일 네비게이션'
        aria-hidden={!openBar}
        className={`absolute left-0 top-24 z-20 transition ease-in-out duration-500 w-screen ${
          openBar ? "" : "hidden"
        }`}
      >
        <div className='w-100 p-8 flex flex-col items-center gap-4 bg-white dark:bg-gray-900 text-2xl'>
          {session && <NavbarUserInfo session={session} />}
          <div>{!session ? signInButton : signOutButton}</div>
          <Link href='/posts'>Posts</Link>
          {session?.user.admin && <Link href='/posts/create'>Create Post</Link>}
          <SearchForm />
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
