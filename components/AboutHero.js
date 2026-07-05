"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React from "react";

const AboutHero = () => {
  const { data: session } = useSession();
  return (
    <div className="pb-20">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#bbf2bf,transparent)]"></div>
      </div>
      <div>
        <div className="relative">
          <div
            className="sm:w-[350px] sm:h-[350px] min-[560px]:w-[300px] min-[560px]:h-[300px] w-[250px] h-[250px] overflow-hidden absolute top-0 right-0 max-[500px]:hidden"
            style={{
              clipPath: "ellipse(51% 57% at 66% 43%)",
            }}
          >
            <img
              src="images/family2.jpg"
              alt="Family"
              fill={"true"}
              className="object-cover"
            />
          </div>

          <div className="min-[600px]:py-17 pt-10 pb-15 lg:pl-30 min-[600px]:pl-15 pl-8 min-[850px]:pr-100 sm:pr-80 min-[560px]:pr-70 min-[500px]:pr-55 pr-8">
            <p className="text-xs font-medium text-green-900 flex items-center gap-1">
              <lord-icon
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{ width: "20px", height: "20px" }}
              ></lord-icon>
              <span>About NutriNest</span>
            </p>
            <h1 className="sm:text-4xl min-[500px]:text-3xl text-2xl font-bold mt-2 mb-1">
              About <span className="text-green-900">NutriNest</span>
            </h1>
            <h3 className="text-green-800 font-semibold sm:text-xl text-lg">
              Your Family's AI Kitchen Assistant
            </h3>
            <div className="bg-green-900 h-0.5 max-w-[70] my-3"></div>
            <p>
              NutriNest is an AI-powered platform designed to make healthy
              eating simple, personalized, and enjoyable for every family. We
              combine smart technology with nutrition science to help you plan
              meals, manage your pantry, and make better food choices every day.
            </p>
          </div>
        </div>

        <div className="bg-green-500 h-1 opacity-20 my-6"></div>

        <div className="lg:px-30 min-[600px]:px-15 px-8 py-1">
          <h3 className="font-semibold text-xl mt-5">
            What <span className="text-green-800">NutriNest</span> Offers
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            <li className="text-[15px] flex gap-2 items-center">
              <lord-icon
                className="shrink-0"
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  flexShrink: 0,
                }}
              ></lord-icon>
              <div>
                <span className="font-semibold">AI Recipe Suggestions - </span>
                <span className="max-w-base">
                  Generate personalized recipes based on your available
                  ingredients, dietary preferences, and health conditions.
                </span>
              </div>
            </li>
            <li className="text-[15px] flex gap-2 items-center">
              <lord-icon
                className="shrink-0"
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  flexShrink: 0,
                }}
              ></lord-icon>
              <div>
                <span className="font-semibold">
                  Smart Pantry Management -{" "}
                </span>
                <span className="max-w-base">
                  Keep track of your ingredients, get low-stock alerts, and
                  reduce food waste.
                </span>
              </div>
            </li>
            <li className="text-[15px] flex gap-2 items-center">
              <lord-icon
                className="shrink-0"
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  flexShrink: 0,
                }}
              ></lord-icon>
              <div>
                <span className="font-semibold">Family Profiles - </span>
                <span className="max-w-base">
                  Create profiles for each family member and manage dietary
                  needs, allergies, and preferences.
                </span>
              </div>
            </li>
            <li className="text-[15px] flex gap-2 items-center">
              <lord-icon
                className="shrink-0"
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  flexShrink: 0,
                }}
              ></lord-icon>
              <div>
                <span className="font-semibold">
                  Health-Focused Nutrition -{" "}
                </span>
                <span className="max-w-base">
                  Receive meals and recipes tailored to your health goals and
                  lifestyle.
                </span>
              </div>
            </li>
            <li className="text-[15px] flex gap-2 items-center">
              <lord-icon
                className="shrink-0"
                src="https://cdn.lordicon.com/pixusvzc.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  flexShrink: 0,
                }}
              ></lord-icon>
              <div>
                <span className="font-semibold">Save Time & Money - </span>
                <span className="max-w-base">
                  Plan smarter, shop better, and cook with what you already
                  have.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-green-500 h-1 opacity-20 mt-10 mb-7"></div>

        <div className="lg:px-30 min-[600px]:px-15 px-8 py-1">
          <h3 className="font-semibold text-xl mt-5">
            How <span className="text-green-800">NutriNest</span> Works
          </h3>
          <div className="mt-7 grid min-[900px]:grid-cols-4 min-[530px]:grid-cols-2 grid-cols-1 gap-6 max-[530px]:gap-10">
            <div className="rounded-3xl border-2 border-green-950 px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-slate-200 hover:bg-green-100 relative max-[530px]:max-w-[270px]">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/hroklero.json"
                  trigger="loop"
                  delay="1500"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-4 text-[] font-semibold">
                Create Your Profile
              </h3>

              <p className="mt-1 text-gray-600 text-sm">
                Tell us about your family members, dietary needs, preferences
                and goals.
              </p>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold absolute bottom-[-20] right-[43%]">
                1
              </div>
            </div>
            <div className="rounded-3xl border-2 border-green-950 px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-slate-200 hover:bg-green-100 relative max-[530px]:max-w-[270px]">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/dgedykti.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  colors="primary:#000000,secondary:#b26836,tertiary:#ebe6ef"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-4 text-[] font-semibold">Build Your Pantry</h3>

              <p className="mt-1 text-gray-600 text-sm">
                Add the ingredients available in your kitchen so NutriNest knows
                exactly what you have to cook with.
              </p>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold absolute bottom-[-20] right-[43%]">
                2
              </div>
            </div>
            <div className="rounded-3xl border-2 border-green-950 px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-slate-200 hover:bg-green-100 relative max-[530px]:max-w-[270px]">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/tdbbbqzo.json"
                  trigger="loop"
                  delay="1500"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-4 text-[] font-semibold">Let AI Plan</h3>

              <p className="mt-1 text-gray-600 text-sm">
                Our AI analyzes your pantry, family profiles and preferences to
                recommend recipes and generate personalized meal plans.
              </p>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold absolute bottom-[-20] right-[43%]">
                3
              </div>
            </div>
            <div className="rounded-3xl border-2 border-green-950 px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-slate-200 hover:bg-green-100 relative max-[530px]:max-w-[270px]">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/flydzqpr.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  colors="primary:#000000,secondary:#ebe6ef,tertiary:#3a3347"
                  style={{ width: "50px", height: "50px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-4 text-[] font-semibold">Cook & Enjoy</h3>

              <p className="mt-1 text-gray-600 text-sm">
                Follow the AI-generated recipes, enjoy healthy meals and make
                smarter food choices every day with your family.
              </p>
              <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold absolute bottom-[-20] right-[43%]">
                4
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500 h-1 opacity-20 mt-18 mb-7"></div>

        <div className="lg:px-30 px-10 py-1">
          <div className="flex items-center justify-center gap-7">
            <div>
              <h2 className="font-bold text-2xl mt-5">
                Ready to transform your{" "}
                <span className="text-green-800">Family Meals?</span>
              </h2>
              <p className="my-2 max-w-xl">
                Join thousands of families who are eating healthier, wasting
                less and living better lies with NutriNest
              </p>
              {!session ? (
                <button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/dashboard",
                    })
                  }
                  type="button"
                  className="text-white cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-3 py-1.5 my-3 text-center leading-5"
                >
                  Login with Google
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <img className="max-[600px]:hidden" src="images/food2.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="bg-green-500 h-1 opacity-20 my-7"></div>
      </div>
    </div>
  );
};

export default AboutHero;
