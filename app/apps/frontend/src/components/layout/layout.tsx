"use client";

import { Header } from "./header";
import { Nav } from "./nav";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex gap-2 content-container">
        <Nav />
        {children}
      </div>
    </>
  );
};
