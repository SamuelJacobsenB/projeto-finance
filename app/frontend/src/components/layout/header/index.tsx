import Link from "next/link";
import Image from "next/image";

import { UserProfile } from "./user-profile";
import { Config } from "./config";
import { PowerOff } from "./power-off";

export const Header = () => {
  return (
    <header className="sticky top-0 flex justify-between items-center bg-primary w-full min-h-20 pr-4">
      <Link href={"/dashboard"} className="flex items-center">
        <Image
          src={"/imgs/white-slogan.png"}
          alt="Logo"
          width={240}
          height={60}
        />
      </Link>
      <div className="flex items-center gap-6">
        <UserProfile />
        <Config />
        <PowerOff />
      </div>
    </header>
  );
};
