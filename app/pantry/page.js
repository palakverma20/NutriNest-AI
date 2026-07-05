"use client";
import { useState, useEffect } from "react";

const page = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    ingredient: "",
    amount: "",
    unit: "kg",
    minimumAmount: "",
    expiry: "",
  });

  async function fetchIngredients() {
    try {
      const res = await fetch("/api/pantry");
      const data = await res.json();
      setIngredients(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  //Delete ingredient
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/pantry/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchIngredients();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Edit ingredient
  const handleEdit = (item) => {
    setEditingItem(item);

    setFormData({
      ingredient: item.ingredient,
      amount: item.amount,
      unit: item.unit,
      minimumAmount: item.minimumAmount,
      expiry: item.expiry || "",
    });

    setShowModal(true);
  };

  //Submit
  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!formData.ingredient || !formData.amount || !formData.minimumAmount) {
        alert("Please fill all the required fields.");
        return;
      }

      let res;

      // EDIT
      if (editingItem) {
        res = await fetch(`/api/pantry/${editingItem._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      // ADD
      else {
        res = await fetch("/api/pantry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // Refresh pantry
      fetchIngredients();

      // Close popup
      setShowModal(false);

      // Clear editing state
      setEditingItem(null);

      // Reset form
      setFormData({
        ingredient: "",
        quantity: "",
        expiry: "",
        minimumAmount: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  //Statistics
  const totalItems = ingredients.length;

  const expiringSoon = ingredients.filter(
  (item) => getStatus(item) === "Expiring Soon"
).length;

  const lowStock = ingredients.filter(
  (item) => getStatus(item) === "Low Stock"
).length;

  const goodStock = ingredients.filter(
  (item) => getStatus(item) === "Good Stock"
).length;

  //Calculate status
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
    <div className="pb-25 sm:pt-15 pt-8">
      <div className="bg-green-100 py-12 px-8 lg:mx-30 sm:mx-15 mx-5">
        <div className="min-[870px]:flex min-[870px]:justify-between bg-mauve-100 px-3 py-4">
          <div className="flex gap-5 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/dgedykti.json"
              trigger="loop"
              delay="1500"
              stroke="bold"
              style={{ width: "60px", height: "60px" }}
            ></lord-icon>
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl text-shadow-green-900">
                My Pantry
              </h2>
              <p className="text-sm text-gray-700">
                Manage your ingredients and never run out of essentials.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);

              setFormData({
                ingredient: "",
                amount: "",
                unit: "kg",
                expiry: "",
                minimumAmount: "",
              });

              setShowModal(true);
            }}
            className="bg-green-700 hover:bg-green-900 cursor-pointer max-[870px]:mt-4 font-bold flex gap-2 items-center py-1 px-5 rounded-lg border-2 hover:border-3 text-white max-[500px]:text-sm"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#f0f0f0,secondary:#f0f0f0"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            <span>Add ingredient</span>
          </button>
        </div>
        <div className="mt-10 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-mauve-100 sm:p-3 p-4 flex sm:gap-5 min-[450px]:gap-15 gap-7 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/wjhxvnmc.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "45px", height: "45px" }}
            ></lord-icon>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Total Items</span>
              <span className="md:text-2xl text-xl font-bold">
                {totalItems}
              </span>
              <p className="text-gray-700 text-xs">Ingredients in pantry</p>
            </div>
          </div>
          <div className="bg-mauve-100 sm:p-3 p-4 flex sm:gap-5 min-[450px]:gap-15 gap-7 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/zzodbdoh.json"
              trigger="hover"
              colors="primary:#110a5c"
              stroke="bold"
              style={{ width: "45px", height: "45px" }}
            ></lord-icon>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Expiring Soon</span>
              <span className="md:text-2xl text-xl font-bold">
                {expiringSoon}
              </span>
              <p className="text-gray-700 text-xs">Items need attention</p>
            </div>
          </div>
          <div className="bg-mauve-100 sm:p-3 p-4 flex sm:gap-5 min-[450px]:gap-15 gap-7 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/zwtssiaj.json"
              trigger="hover"
              colors="primary:#c71f16"
              stroke="bold"
              style={{ width: "45px", height: "45px" }}
            ></lord-icon>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Low stock</span>
              <span className="md:text-2xl text-xl font-bold">{lowStock}</span>
              <p className="text-gray-700 text-xs">Items running low</p>
            </div>
          </div>
          <div className="bg-mauve-100 sm:p-3 p-4 flex sm:gap-5 min-[450px]:gap-15 gap-7 items-center">
            <lord-icon
              src="https://cdn.lordicon.com/pxixoqxa.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "45px", height: "45px" }}
            ></lord-icon>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Good Stock</span>
              <span className="md:text-2xl text-xl font-bold">{goodStock}</span>
              <p className="text-gray-700 text-xs">Well stocked items</p>
            </div>
          </div>
        </div>
        <div className="mt-5 p-3">
          <h4 className="text-lg font-semibold my-5">My Ingredients :- </h4>
          <div className="w-full flex flex-col gap-2">
            {ingredients.length === 0 ? (
              <div className="bg-mauve-100 px-5 py-8 text-center text-gray-500">
                No ingredients found.
              </div>
            ) : (
              ingredients.map((item) => (
                <div key={item._id} className="bg-mauve-100 px-5 py-4">
                  <div className="md:flex md:justify-between">
                    <h5 className="font-bold mb-2">{item.ingredient}</h5>

                    <div className="flex max-[640px]:flex-col sm:gap-5 gap-1 text-sm font-semibold">
                      <div>
                        <span className="text-gray-700">Quantity : </span>
                        <span>
                          {item.amount} {item.unit}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-700">Expiry : </span>
                        <span>{item.expiry}</span>
                      </div>

                      <div>
                        <span className="text-gray-700">Status : </span>
                        <span>{getStatus(item)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex max-[500px]:flex-col min-[500px]:gap-3 gap-2 mt-3 py-1">
                    <button
                      className="bg-slate-300 hover:bg-slate-500 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2 max-[500px]:max-w-[100px]"
                      onClick={() => handleEdit(item)}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "20px", height: "20px" }}
                      ></lord-icon>

                      <span>Edit</span>
                    </button>

                    <button
                      className="bg-slate-300 hover:bg-slate-500 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2 max-[500px]:max-w-[100px]"
                      onClick={() => handleDelete(item._id)}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "20px", height: "20px" }}
                      ></lord-icon>

                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-mauve-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-green-700 text-white flex justify-between items-center px-6 py-4">
                <h2 className="font-bold text-xl">
                  {editingItem ? "Edit Ingredient" : "Add Ingredient"}
                </h2>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);

                    setFormData({
                      ingredient: "",
                      amount: "",
                      unit: "kg",
                      expiry: "",
                      minimumAmount: "",
                    });
                  }}
                  className="text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="font-semibold">Ingredient</label>

                  <input
                    type="text"
                    value={formData.ingredient}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ingredient: e.target.value,
                      })
                    }
                    className="w-full mt-2 border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-semibold">Quantity</label>

                  <div className="flex gap-3 mt-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount: e.target.value,
                        })
                      }
                      className="w-2/3 border rounded-lg p-2"
                    />

                    <select
                      value={formData.unit}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          unit: e.target.value,
                        })
                      }
                      className="w-1/3 border rounded-lg p-2"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="L">L</option>
                      <option value="ml">ml</option>
                      <option value="pcs">pcs</option>
                      <option value="packets">packets</option>
                      <option value="cups">cups</option>
                      <option value="tbsp">tbsp</option>
                      <option value="tsp">tsp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold flex items-center gap-2">
                    ⚠️ Low Stock Alert Threshold
                  </label>

                  <div className="flex gap-3 mt-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Minimum"
                      value={formData.minimumAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minimumAmount: e.target.value,
                        })
                      }
                      className="w-2/3 border rounded-lg p-2"
                    />

                    <input
                      value={formData.unit}
                      disabled
                      className="w-1/3 border rounded-lg p-2 bg-gray-100 text-gray-600"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    We'll alert you when the available quantity is equal to or
                    below this value.
                    <br />
                    Examples: Rice → 1 kg, Milk → 1 L, Eggs → 6 pcs.
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Expiry Date</label>

                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expiry: e.target.value,
                      })
                    }
                    className="w-full mt-2 border rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);

                      setFormData({
                        ingredient: "",
                        amount: "",
                        unit: "kg",
                        expiry: "",
                        minimumAmount: "",
                      });
                    }}
                    className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-900 text-white font-semibold"
                  >
                    {editingItem ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
