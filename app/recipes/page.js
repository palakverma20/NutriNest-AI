"use client";
import { useState } from "react";

const page = () => {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleUsePantry = async () => {
    try {
      const res = await fetch("/api/pantry");
      const data = await res.json();

      const pantryItems = data.map((item) => item.ingredient).join(", ");

      if (!pantryItems) {
        alert("Your pantry is empty. Please add some ingredients first.");
        return;
      }

      setIngredients(pantryItems);
    } catch (error) {
      console.error(error);
    }
  };

  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      alert("Please enter some ingredients.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setRecipe(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  return (
    <div className="pt-15 pb-30 lg:px-30 md:px-12 px-5">
      <div className={recipe ? "hidden" : "block"}>
        <div className="flex gap-5 max-[600px]:gap-2 items-center px-5 py-5 max-[600px]:px-2 rounded-xl bg-green-100">
          <lord-icon
            src="https://cdn.lordicon.com/njrwmskv.json"
            trigger="hover"
            stroke="bold"
            style={{ width: "60px", height: "60px" }}
          ></lord-icon>
          <div>
            <h2 className="text-3xl max-[600px]:text-2xl font-bold">Recipes</h2>
            <p className="text-gray-700 text-sm mt-1 max-[600px]:text-xs">
              Find delicious recipes using the ingredients you have
            </p>
          </div>
        </div>
        <div className="mt-15 flex gap-10 items-center max-[600px]:gap-5">
          <div>
            <img
              className="h-[180px] w-[180px] max-[600px]:h-[150px] max-[600px]:w-[150px] max-[500px]:hidden"
              src="images/food2.jpg"
              alt=""
            />
          </div>
          <div className="max-[700px]:max-w-sm min-[700px]:max-w-full min-[500px]:max-w-[300px]">
            <div className="my-2">
              <h2 className="text-2xl max-[600px]:text-xl font-bold">
                AI Recipe Generator
              </h2>
              <p className="text-gray-700 text-sm my-3">
                Tell us what ingredients you have or use your pantry to get
                personalized recipe suggestions.
              </p>
            </div>
            <input
              className="bg-slate-100 border border-gray-500 rounded-lg py-2 px-4 w-full disabled:bg-gray-200"
              type="text"
              placeholder="Eg. rice, tomatoes, bread..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              disabled={loading}
            />

            <div>
              <button
                onClick={handleUsePantry}
                disabled={loading}
                className="text-green-800 bg-green-100 cursor-pointer border border-green-500 text-sm mt-3 py-1 px-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Use Pantry Ingredients
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={generateRecipes}
                disabled={loading}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium mt-7 rounded-lg px-7 py-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Generating Recipe..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={recipe ? "block" : "hidden"}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/igoofjrx.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              style={{ width: "40px", height: "40px" }}
            ></lord-icon>
            <span className="text-2xl text-green-900 font-bold">
              Generated Recipe
            </span>
          </h2>
          <lord-icon
            onClick={() => {
              setRecipe(null);
              setIngredients("");
            }}
            className="cursor-pointer"
            src="https://cdn.lordicon.com/ebyacdql.json"
            trigger="hover"
            colors="primary:#0a5c15"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
        </div>
        <div className="min-[480px]:my-7 min-[480px]:relative">
          <img
            src="images/recipe.jpg"
            alt=""
            fill={"true"}
            priority={"true"}
            className="h-[60vh] w-full max-[480px]:hidden"
          />
          <div className="max-h-[60vh] overflow-hidden min-[480px]:absolute min-[480px]:inset-0 lg:pl-100 md:pl-80 min-[600px]:pl-70 min-[480px]:pl-47 py-5 min-[600px]:pr-5">
            <div>
              <h2 className="font-bold text-2xl my-5">{recipe?.title}</h2>
              <div className="flex items-center gap-3">
                <button className="bg-gray-200 border border-gray-500 text-gray-700 py-1 px-3 rounded-full text-sm font-semibold">
                  {recipe?.cookTime}
                </button>
                <button className="bg-gray-200 border border-gray-500 text-gray-700 py-1 px-3 rounded-full text-sm font-semibold">
                  {recipe?.difficulty}
                </button>
              </div>
              <p className="text-gray-800 my-3 max-[480px]:text-sm">
                {recipe?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <h3 className="text-lg text-green-900 font-semibold">Recipe Ready</h3>
          <button
            onClick={() => handleViewRecipe(recipe)}
            className="bg-green-800 hover:bg-green-950 text-white py-2 px-4 rounded-lg font-bold cursor-pointer"
          >
            View Recipe
          </button>
        </div>
      </div>
      {showRecipeModal && selectedRecipe && (
        <div
          onClick={() => setShowRecipeModal(false)}
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-5xl rounded-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}

            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-900">
                {selectedRecipe.title}
              </h2>

              <button
                onClick={() => setShowRecipeModal(false)}
                className="text-3xl cursor-pointer font-bold text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* Body */}

            <div className="p-6">
              {/* Badges */}

              <div className="flex gap-3 flex-wrap">
                <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full font-semibold">
                  ⏱ {selectedRecipe.cookTime}
                </span>

                <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-semibold">
                  ⭐ {selectedRecipe.difficulty}
                </span>
              </div>

              {/* Description */}

              <p className="mt-5 text-gray-700 leading-7">
                {selectedRecipe.description}
              </p>

              {/* Ingredients */}

              <div className="mt-8">
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  Ingredients Used
                </h3>

                <div className="flex flex-wrap gap-3">
                  {selectedRecipe?.ingredientsUsed?.map((item) => (
                    <span
                      key={item}
                      className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing */}

              <div className="mt-8">
                <h3 className="text-xl font-bold text-red-700 mb-3">
                  Missing Ingredients
                </h3>

                {selectedRecipe.missingIngredients.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {selectedRecipe?.missingIngredients?.map((item) => (
                      <span
                        key={item}
                        className="bg-red-100 border border-red-300 px-4 py-2 rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-100 border border-green-300 rounded-xl p-4 text-green-800 font-semibold">
                    🎉 You already have everything needed!
                  </div>
                )}
              </div>

              {/* Steps */}

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-green-900 mb-6">
                  Cooking Steps
                </h3>

                <div className="space-y-5">
                  {selectedRecipe?.steps?.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-700 text-white flex justify-center items-center font-bold shrink-0">
                        {index + 1}
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex-1">
                        <p className="leading-7 text-gray-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
