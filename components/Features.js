import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center py-5 px-10 bg-green-100">
      <p className="text-sm font-medium text-green-900 flex items-center gap-1">
        <lord-icon
          src="https://cdn.lordicon.com/pixusvzc.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
          style={{ width: "30px", height: "30px" }}
        ></lord-icon>
        <span>Everything you need</span>
      </p>
      <h2 className="text-2xl font-bold mb-6 mt-4">
        Smart Features for{" "}
        <span className="text-green-900">Smarter Families</span>
      </h2>
      <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
          <div className="bg-gray-300 rounded-full p-3">
            <lord-icon
              src="https://cdn.lordicon.com/flydzqpr.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              colors="primary:#000000,secondary:#ebe6ef,tertiary:#3a3347"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </div>

          <h3 className="mt-4 text-xl font-semibold">AI Recipes</h3>

          <p className="mt-1 text-gray-600 text-sm">
            Generate delicious recipes using the ingredients already available
            in your pantry.
          </p>
        </div>
        <div className="rounded-3xl border px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
          <div className="bg-gray-300 rounded-full p-3">
            <lord-icon
              src="https://cdn.lordicon.com/hhljfoaj.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              colors="primary:#000000,secondary:#4bb3fd,tertiary:#ffc738"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </div>

          <h3 className="mt-4 text-xl font-semibold">Family Profiles</h3>

          <p className="mt-1 text-gray-600 text-sm">
            Store dietary preferences and health conditions for every family
            member.
          </p>
        </div>
        <div className="rounded-3xl border px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
          <div className="bg-gray-300 rounded-full p-3">
            <lord-icon
              src="https://cdn.lordicon.com/dgedykti.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              colors="primary:#000000,secondary:#b26836,tertiary:#ebe6ef"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </div>

          <h3 className="mt-4 text-xl font-semibold">Smart Pantry</h3>

          <p className="mt-1 text-gray-600 text-sm">
            Keep track of ingredients and cook with what you already have.
          </p>
        </div>
        <div className="rounded-3xl border px-5 py-8 transition hover:-translate-y-2 hover:shadow-xl flex flex-col items-start bg-gray-200 hover:bg-slate-200">
          <div className="bg-gray-300 rounded-full p-3">
            <lord-icon
              src="https://cdn.lordicon.com/gdowkrjt.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              style={{ width: "75px", height: "75px" }}
            ></lord-icon>
          </div>

          <h3 className="mt-4 text-xl font-semibold">Save Time & Money</h3>

          <p className="mt-1 text-gray-600 text-sm">
            Plan smarter, shop better and cook with what you already have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
