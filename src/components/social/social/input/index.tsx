import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <>
      <input className="md:w-4/12 w-5/6 h-11 px-5 rounded-md" {...props} />
    </>
  );
}
