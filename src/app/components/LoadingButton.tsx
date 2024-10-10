import { ClipLoader } from "react-spinners";

type propsType = {
  buttonText: string;
  loading: boolean;
};

const LoadingButton = ({ buttonText, loading }: propsType) => {
  const buttonContent = loading ? (
    <ClipLoader size={20} color='rgba(132, 132, 132, 1)' />
  ) : (
    buttonText
  );

  return (
    <button
      type='button'
      disabled={loading}
      className='disabled:cursor-not-allowed bg-black white text-white items-center justify-center py-2 px-8 rounded min-w-28 min-h-11'
    >
      {buttonContent}
    </button>
  );
};

export default LoadingButton;
