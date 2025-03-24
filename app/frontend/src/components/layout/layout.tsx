"use client";

import { Header } from "./header";
import { Nav } from "./nav";

interface Layout {
  children: React.ReactNode;
}

export const Layout = ({ children }: Layout) => {
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-full">
        <Nav />
        {children}
      </div>
    </>
  );
};
