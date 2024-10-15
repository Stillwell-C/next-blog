"use client";

import { Session } from "next-auth";
import Link from "next/link";
import RedirectLink from "./RedirectLink";
import NavbarUserInfo from "./NavbarUserInfo";
import SearchForm from "./SearchForm";
import ToggleThemes from "./ToggleThemes";
import { handleLogout } from "@/lib/actions";

type Props = {
  session: Session | null;
  ariaLabel?: string;
  ariaHidden?: boolean;
};

const NavbarLinks = ({ session }: Props) => {
  const signInButton = (
    <RedirectLink pathname='/login' linkText='로그인' underline={false} />
  );
  const signOutButton = (
    <form action={handleLogout}>
      <button>로그아웃</button>
    </form>
  );

  return (
    <nav className='hidden md:flex items-center justify-end gap-6 text-xl'>
      <Link href='/posts'>포스트</Link>
      {session?.user.admin && <Link href='/posts/create'>포스트 작성</Link>}
      <div>{!session ? signInButton : signOutButton}</div>
      {session && <NavbarUserInfo session={session} />}
      <SearchForm />
      <ToggleThemes />
    </nav>
  );
};

export default NavbarLinks;
