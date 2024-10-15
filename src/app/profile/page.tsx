import ProfileForm from "@/components/ProfileForm";
import { getUser } from "@/lib/actions/userActions";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const session = await auth();

  if (session?.user.username) {
    return {
      title: `${session.user?.username} 프로필`,
      description: `${session.user?.username} 프로필 페이지`,
    };
  }

  return { title: "프로필 페이지", description: "프로필 페이지" };
};

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    notFound();
  }

  const user = await getUser(session?.user?.id);

  return (
    <div className='mx-auto max-w-3xl h-full flex flex-col items-center p-6'>
      <h2 className='text-center text-2xl font-semibold'>Profile</h2>

      <div className='border border-gray-300 rounded-lg shadow-md p-6 mt-10 w-full text-gray-700 dark:text-gray-400'>
        <h3 className='text-xl font-semibold mb-4'>프로필 이미지 변경</h3>
        <ProfileForm imgUrl={user?.imgUrl} userId={session?.user?.id} />
      </div>
      <div className='border border-gray-300 rounded-lg shadow-md p-6 mt-8 w-full'>
        <h3 className='text-xl font-semibold mb-4 text-gray-700 dark:text-gray-400'>
          계정 정보
        </h3>
        <div className='flex gap-4 mb-2'>
          <p className='font-medium text-gray-600 dark:text-gray-500'>
            사용자 아이디:
          </p>
          <p>{session.user.username}</p>
        </div>
        {user?.role && (
          <div className='flex gap-4 mb-2'>
            <p className='font-medium text-gray-600 dark:text-gray-500'>
              계정 등급:
            </p>
            <p>{user.role.slice(0, 1) + user.role.slice(1).toLowerCase()}</p>
          </div>
        )}
        {user?.createdAt && (
          <div className='flex gap-4 mb-2'>
            <p className='font-medium text-gray-600 dark:text-gray-500'>
              가입 일자:
            </p>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
        )}
        {user?.updatedAt && (
          <div className='flex gap-4 mb-2'>
            <p className='font-medium text-gray-600 dark:text-gray-500'>
              최신 프로필 수정 일자:
            </p>
            <p>{formatDate(user?.updatedAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
