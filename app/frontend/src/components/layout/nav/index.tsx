"use client";

import { usePathname } from "next/navigation";

import { routes } from "@/constants";
import { NavLink } from "./nav-link";

export const Nav = () => {
  const pathName = usePathname();

  return (
    <nav className="sticky top-20 flex flex-col gap-2 w-80 h-full p-6 border-r-2 border-secondary">
      <ul className="flex flex-col items-center gap-4 w-full">
        {routes.map(({ name, href }, i) => (
          <li key={i}>
            <NavLink href={href} isSelected={href == pathName}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
