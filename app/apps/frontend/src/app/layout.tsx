import React from "react";
import "./globals.css";

import { Provider } from "@/contexts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Provider>
        <body>
          <main id="root">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
