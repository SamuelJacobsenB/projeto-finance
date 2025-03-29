import Link from "next/link";
import React from "react";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  isSelected: boolean;
}

export const NavLink = ({
  children,
  href,
  isSelected = false,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`text-lg w-full p-2 hover:text-black hover:underline ${
        isSelected ? "text-black" : "text-gray-600"
      }`}
    >
      {children}
    </Link>
  );
};
