import { forwardRef, InputHTMLAttributes } from "react";
import ErrorMsg from "./ErrorMsg";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errormsg: string | undefined;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, errormsg, ...rest }, ref) => {
    return (
      <div className="flex gap-2 flex-col mb-10">
        <label
          className="font-bold text-sky-600 dark:text-white"
          htmlFor={rest.name}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={rest.name}
          className="border shadow-lg w-full p-2 pl-5 outline-none caret-sky-600 focus:border-sky-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          {...rest}
        />
        <ErrorMsg errormsg={errormsg} />
      </div>
    );
  }
);

export default Input;
