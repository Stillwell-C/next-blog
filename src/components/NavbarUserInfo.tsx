import { Session } from "next-auth";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = { session: Session | null };

const NavbarUserInfo = ({ session }: Props) => {
  const { data: clientSession } = useSession();

  const [imgUrl, setImgUrl] = useState<string | null>(
    session?.user.imgUrl || null
  );

  useEffect(() => {
    if (clientSession?.user.imgUrl) {
      setImgUrl(clientSession?.user.imgUrl);
    }
  }, [clientSession?.user.imgUrl]);

  return (
    <div className='flex items-center gap-1'>
      <Link href='/profile' className='md:hidden'>
        프로필
      </Link>
      <Link href='/profile' className='hidden md:block'>
        <ProfileImage imgUrl={imgUrl} />
      </Link>
    </div>
  );
};

export default NavbarUserInfo;
