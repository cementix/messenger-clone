import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  disabled: boolean;
}

const AuthSocialButton = ({ icon: Icon, onClick, disabled }: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
