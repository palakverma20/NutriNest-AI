"use client"
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-green-300 flex justify-between items-center py-1.5 min-[500px]:px-7 min-[400px]:px-3 px-1">
      <div className="logo flex gap-1 items-center">
        <lord-icon
          src="https://cdn.lordicon.com/xazzumfu.json"
          trigger="loop"
          delay="1500"
          stroke="bold"
          colors="primary:#000000,secondary:#2ca58d,tertiary:#b26836,quaternary:#f24c00"
          style={{ width: "30px", height: "30px" }}
        ></lord-icon>
        <div className="font-bold text-lg">
            <span>Nutri</span>
            <span className="text-green-900">Nest</span>
        </div>
      </div>
      <ul className="flex min-[450px]:gap-4 gap-2 font-semibold max-[450px]:text-sm">
        <li className="hover:font-bold cursor-pointer"><Link href={"/"}>Home</Link></li>
        <li className="hover:font-bold cursor-pointer"><Link href={"/about"}>About</Link></li>
        <li className="hover:font-bold cursor-pointer"><Link href={"/contact"}>Contact</Link></li>
      </ul>
      <div className="login">
        {(!session)?(<button onClick={() =>
                signIn("google", {
                    callbackUrl: "/dashboard",
                })
            } type="button" className="text-white cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm min-[450px]:px-3 px-2 min-[450px]:py-1.5 py-1 text-center leading-5">Login</button>):(
              <HamburgerMenu/>
            )}
        
      </div>
    </div>
  );
};

export default Navbar;
