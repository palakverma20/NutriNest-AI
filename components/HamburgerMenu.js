"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-green-100 rounded-xl shadow-xl border z-50 overflow-hidden">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/pantry"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Pantry
          </Link>

          <Link
            href="/recipes"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Recipies
          </Link>
          
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 hover:bg-gray-100"
          >
            Profile
          </Link>

          <hr />

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}