import React from "react";

interface Layout {
  children: React.ReactNode;
}

export const Layout = ({ children }: Layout) => {
  return <>{children}</>;
};
