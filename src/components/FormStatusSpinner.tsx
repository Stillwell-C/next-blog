import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
};

const FormStatusSpinner = ({ size = 35 }: Props) => {
  const { pending } = useFormStatus();

  if (pending) return <ClipLoader color="#4B5563'" size={size} />;
};

export default FormStatusSpinner;
