import ProfileForm from "@/components/ProfileForm";
import { getUser } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await getUser(session?.user?.id);

  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center p-4'>
      <h2 className='text-center text-xl'>Profile</h2>
      <div className='border-b border-t border-black p-4 mt-10 w-full'>
        <h3 className='text-lg'>프로필 이미지 변경</h3>
        <ProfileForm imgUrl={user?.imgUrl} userId={session?.user?.id} />
      </div>
      <div className='w-full p-4 flex flex-col justify-start'>
        <h3 className='text-lg mb-4'>계정 정보</h3>
        <div className='flex gap-4'>
          <p>사용자 아이디:</p>
          <p>{session.user.username}</p>
        </div>
        {user?.createdAt && (
          <div className='flex gap-4'>
            <p>사용자 아이디:</p>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
        )}
        {user?.updatedAt && (
          <div className='flex gap-4'>
            <p>수정 일자:</p>
            <p>{formatDate(user?.updatedAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
