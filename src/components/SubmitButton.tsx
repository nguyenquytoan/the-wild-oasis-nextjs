"use client";

import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  pendingLabel: string;
  children: string;
}

const SubmitButton = ({
  pendingLabel,
  children,
}: Readonly<SubmitButtonProps>) => {
  const { pending: isUpdating } = useFormStatus();

  return (
    <button
      disabled={isUpdating}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {isUpdating ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
