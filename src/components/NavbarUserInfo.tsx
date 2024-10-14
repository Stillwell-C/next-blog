import { Session } from "next-auth";
import ProfileImage from "./ProfileImage";
import Link from "next/link";

type Props = { session: Session | null };

const NavbarUserInfo = ({ session }: Props) => {
  return (
    <div className='flex items-center gap-1'>
      <Link href='/profile' className='md:hidden'>
        프로필
      </Link>
      <Link href='/profile' className='hidden md:block'>
        <ProfileImage imgUrl={session?.user.imgUrl} />
      </Link>
    </div>
  );
};

export default NavbarUserInfo;
