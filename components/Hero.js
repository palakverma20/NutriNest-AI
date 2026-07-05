"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React from "react";

const Hero = () => {
  const { data: session } = useSession();
  return (
    <section className="relative h-[70vh] w-full">
      <img
        src="images/healthyfood.jpg"
        alt=""
        fill={"true"}
        priority={"true"}
        className="h-[70vh] w-full"
      />
      {/* <div className="absolute inset-0 bg-white/10"></div> */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs max-[500px]:text-[10px] mt-3 font-medium text-green-900 flex items-center gap-1">
          <lord-icon className="max-[500px]:hidden"
            src="https://cdn.lordicon.com/pixusvzc.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
          <span>AI Powered • Healthy • Family First</span>
        </p>
        <h1 className="min-[600px]:text-3xl text-2xl font-bold my-1 mx-12">
          Your Family's <span className="text-green-900">AI Kitchen</span>{" "}
          Assistant
        </h1>
        <p className="my-4 mx-15 min-[600px]:text-sm text-xs text-gray-700">
          Create healthy recipes, plan weekly meals, manage your pantry, and
          make smarter food choices for your entire family.
        </p>
        {!session ? (
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            type="button"
            className="text-white cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center leading-5"
          >
            Login with Google
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Hero;
