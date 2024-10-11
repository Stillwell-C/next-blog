"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  pathname: string;
  linkText: string;
  underline?: boolean;
};

const RedirectLink = ({ pathname, linkText, underline = true }: Props) => {
  const redirectUrl = usePathname();

  return (
    <Link
      href={{
        pathname,
        query: { redirectTo: redirectUrl },
      }}
      className={`${underline ? "underline" : ""}`}
    >
      {linkText}
    </Link>
  );
};

export default RedirectLink;
