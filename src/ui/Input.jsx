import React from "react";
import { twMerge } from "tailwind-merge";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";

export default function Input({
  autoComplete,
  className,
  error,
  label,
  name,
  onChange = () => {},
  placeholder,
  type = "text",
  value,
  loading = false,
  success = false,
  ...rest
}) {
  const [isVisible, setVisible] = React.useState(false);
  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;
  return (
    <div className="flex flex-col items-start justify-center w-full col-span-1">
      {label && (
        <label
          htmlFor={name}
          className="flex justify-between w-full mb-1 text-sm font-medium first-letter:uppercase"
        >
          {label}
        </label>
      )}

      <div
        className={twMerge(
          `flex items-center w-full px-2.5 md:py-1 py-2 bg-white rounded-md border-2 border-black focus-within:border-blue-500 
            focus-within:duration-200 focus-within:transition-colors`,
          error && "!border-red-500",
          success && "!border-green-500",
          className
        )}
      >
        <input
          autoComplete={autoComplete}
          className="flex-1 w-full bg-transparent focus:outline-none"
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={inputType}
          value={value}
          {...rest}
        />

        {type === "password" && !error && (
          <button
            type="button"
            className="focus-visible:outline-none"
            onClick={() => setVisible((prev) => !prev)}
          >
            {isVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        )}

        {loading && (
          <RiLoader2Line className="text-blue-500 animate-spin size-5" />
        )}

        {!loading && success && !error && (
          <FaCheck className="text-green-600 size-4" />
        )}

        {error && (
          <MdErrorOutline className="text-red-500 bg-transparent size-5" />
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 first-letter:uppercase">
          {error}
        </p>
      )}

      {success && !error && (
        <p className="mt-1 text-xs text-green-600 first-letter:uppercase">
          {success}
        </p>
      )}
    </div>
  );
}
