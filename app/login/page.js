"use client"
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="py-18">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#bbf2bf,transparent)]"></div>
      </div>
      <div className="sm:max-w-lg max-w-md mx-auto text-center px-7">
        <div className="logo flex gap-1 items-center justify-center">
        <lord-icon
          src="https://cdn.lordicon.com/xazzumfu.json"
          trigger="loop"
          delay="1500"
          stroke="bold"
          colors="primary:#000000,secondary:#2ca58d,tertiary:#b26836,quaternary:#f24c00"
          style={{ width: "60px", height: "60px" }}
        ></lord-icon>
        <div className="font-bold text-4xl">
            <span>Nutri</span>
            <span className="text-green-900">Nest</span>
        </div>
      </div>
      <div className="text-2xl font-semibold mt-7">Welcome Back!</div>
      <p className="my-4 text-gray-700">Sign in to continue managing your pantry, discover recipies and plan healthy meals.</p>
      <button  onClick={() =>
        signIn("google", {
            callbackUrl: "/dashboard",
        })
    } type="button" className="text-white cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-4 py-2.5 text-center leading-5">Continue with Google</button>
      </div>
    </div>
  );
};

export default page;
