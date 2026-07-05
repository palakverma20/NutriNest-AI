"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const page = () => {
  const [ingredients, setIngredients] = useState([]);

  async function fetchIngredients() {
    const res = await fetch("/api/pantry");
    const data = await res.json();

    setIngredients(data.slice(0, 7));
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  function getStatus(item) {
    // Low stock has highest priority
    if (item.amount <= item.minimumAmount) {
      return "Low Stock";
    }

    // Expiry check
    if (item.expiry) {
      const today = new Date();

      // Ignore time component
      today.setHours(0, 0, 0, 0);

      const expiryDate = new Date(item.expiry);
      expiryDate.setHours(0, 0, 0, 0);

      const diff = (expiryDate - today) / (1000 * 60 * 60 * 24);

      if (diff >= 0 && diff <= 7) {
        return "Expiring Soon";
      }

      if (diff < 0) {
        return "Expired";
      }
    }

    return "Good Stock";
  }

  return (
    <div className="pt-12 pb-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-10 lg:px-10 md:px-30 sm:px-20 min-[500px]:px-10 px-5">
        <div className="bg-green-100 p-8 min-[1124px]:min-w-lg">
          <div className="flex max-[450px]:flex-col max-[450px]:gap-3 justify-between">
            <div className="flex items-center gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/dgedykti.json"
                trigger="loop"
                delay="2000"
                style={{ width: "40px", height: "40px" }}
              ></lord-icon>
              <h2 className="text-xl font-bold">Pantry Overview</h2>
            </div>
            <Link href="/pantry">
            <button className="bg-green-200 hover:bg-cyan-200 cursor-pointer text-green-900 font-bold min-[450px]:text-sm text-xs flex gap-1 items-center py-1.5 min-[450px]:px-3 px-2 rounded-full max-[450px]:max-w-[80px]">
              <span>View all </span>
              <lord-icon
                src="https://cdn.lordicon.com/zllgguxq.json"
                trigger="hover"
                colors="primary:#0a5c15"
                style={{ width: "15px", height: "15px" }}
              ></lord-icon>
            </button>
            </Link>
          </div>
          <ul className="mt-9">
            {ingredients.map((item) => {
              const status = getStatus(item);

              return (
                <li
                  key={item._id}
                  className="text-sm flex items-center justify-between my-4"
                >
                  <span className="flex gap-1 items-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/gtqfjljk.json"
                      trigger="hover"
                      style={{ width: "28px", height: "28px" }}
                    ></lord-icon>

                    <span>{item.ingredient}</span>
                  </span>

                  <span>
                    {item.amount} {item.unit}
                  </span>

                  <span
                    className={`font-medium text-sm py-1.5 px-3 rounded-full ${
                      status === "Good Stock"
                        ? "bg-green-200 text-green-900"
                        : status === "Low Stock"
                          ? "bg-orange-200 text-orange-900"
                          : status === "Expiring Soon"
                            ? "bg-yellow-200 text-yellow-900"
                            : "bg-red-200 text-red-900"
                    }`}
                  >
                    {status}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link href="/pantry">
          <button className="bg-green-200 hover:bg-cyan-200 cursor-pointer my-6 text-green-900 font-bold text-sm flex gap-2 items-center py-2 px-3 rounded-full">
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#109121"
              style={{ width: "19px", height: "19px" }}
            ></lord-icon>
            <span>Add Ingredient </span>
          </button>
          </Link>
        </div>
        <div className="p-8 bg-green-100">
          <h2 className="flex gap-2 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/rihvnffu.json"
              trigger="hover"
              colors="primary:#0a5c15"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
            <span className="text-xl font-bold text-green-900">
              Quick Actions
            </span>
          </h2>
          <div className="grid gap-4 grid-cols-2 max-[450px]:grid-cols-1 mt-8">
            <Link href="/recipes">
            <div className="rounded-xl cursor-pointer border px-3 py-5 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/opeotjej.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-3 font-semibold">AI Recipe Suggestion</h3>

              <p className="mt-1 text-gray-600 text-xs">
                Get recipe ideas based on your ingredients and needs.
              </p>
            </div>
            </Link>
            <Link href="/recipes">
            <div className="rounded-xl cursor-pointer border px-3 py-5 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/iewbcboh.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-3 font-semibold">What should I eat?</h3>

              <p className="mt-1 text-gray-600 text-xs">
                Tell AI your situation and get food suggestions.
              </p>
            </div>
            </Link>
            <Link href="/pantry">
            <div className="rounded-xl cursor-pointer border px-3 py-5 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/dgedykti.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-3 font-semibold">Pantry</h3>

              <p className="mt-1 text-gray-600 text-xs">
                View and manage your ingredients.
              </p>
            </div>
            </Link>
            <Link href="/profile">
            <div className="rounded-xl cursor-pointer border px-3 py-5 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
              <div className="bg-gray-300 rounded-full p-3">
                <lord-icon
                  src="https://cdn.lordicon.com/hhljfoaj.json"
                  trigger="loop"
                  delay="1500"
                  stroke="bold"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon>
              </div>

              <h3 className="mt-3 font-semibold">Family Profile</h3>

              <p className="mt-1 text-gray-600 text-xs">
                Manage your family members.
              </p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
