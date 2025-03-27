"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { routes } from "@/constants";
import { Search } from "@/components";

import { NavLink } from "./nav-link";

export const Nav = () => {
  const pathName = usePathname();
  const [search, setSearch] = useState("");

  return (
    <nav className="sticky top-20 flex flex-col gap-6 w-80 h-[100vh - 80px] p-6 border-r-2 border-secondary">
      <Search
        setValue={setSearch}
        value={search}
        fn={async (text: any) => console.log(text)}
        placeholder="Busque um ano"
      />
      <ul className="flex flex-col items-center gap-6 w-full">
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
