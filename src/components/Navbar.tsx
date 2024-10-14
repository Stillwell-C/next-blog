import Link from "next/link";
import { auth } from "@/lib/auth";
import NavbarLinks from "./NavbarLinks";
import NavbarMobile from "./NavbarMobile";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className='w-full flex justify-around p-8'>
      <div className='text-center'>
        <h1>
          <Link href={"/"} className='text-4xl'>
            Next Blog
          </Link>
        </h1>
      </div>
      <NavbarLinks session={session} />
      <NavbarMobile session={session} />
    </div>
  );
};

export default Navbar;
