import { handleGitHubLogin } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import React from "react";

const GithubLoginForm = () => {
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectTo") || "";

  return (
    <form action={handleGitHubLogin}>
      <input name='redirectUrl' value={redirectUrl} hidden readOnly />
      <button className='bg-black dark:bg-slate-700 text-white w-full p-3 rounded'>
        GitHub 로그인
      </button>
    </form>
  );
};

export default GithubLoginForm;
