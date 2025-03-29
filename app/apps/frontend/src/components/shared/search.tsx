import React from "react";
import { I } from "../icons";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  fn: (text: string | number | undefined | readonly string[]) => Promise<void>;
}

export const Search = ({ setValue, value, fn, ...props }: SearchProps) => {
  return (
    <span className="flex items-center w-full h-10 px-3 border-2 rounded-full">
      <input
        type="text"
        {...props}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        className="flex-1 text-lg border-none focus:outline-none focus:ring-0"
      />
      <I.search
        className="size-7 cursor-pointer"
        onClick={async () => await fn(value)}
      />
    </span>
  );
};
