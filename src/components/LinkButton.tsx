import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  linkText: string;
};

const LinkButton = ({ href, linkText }: Props) => {
  return (
    <Link href={href} className='bg-black text-white py-2 px-8 rounded'>
      {linkText}
    </Link>
  );
};

export default LinkButton;
