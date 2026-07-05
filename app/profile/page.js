"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  const [profile, setProfile] = useState({
    phone: "",
    dateOfBirth: "",
    gender: "",
    dietaryPreference: "",
    cookingExperience: "",
    spicePreference: "",
    language: "",
  });

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(`/api/profile?email=${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setProfile(data.profile);
          fetchFamilyMembers();
        }
      })
      .catch((err) => console.error(err));
  }, [session]);

  const [editingSection, setEditingSection] = useState(0);

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const saveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          ...profile,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile saved successfully!");
        setEditingSection(0);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  //Family Members

  const [familyMembers, setFamilyMembers] = useState([]); //To store all member

  //To store details of 1 member
  const [familyMember, setFamilyMember] = useState({
    name: "",
    relation: "",
    dateOfBirth: "",
    gender: "",
    dietaryPreference: "",
    allergies: "",
    healthConditions: [],
  });

  //To add a member
  const [showAddMember, setShowAddMember] = useState(false);

  const healthOptions = [
    "Diabetes",
    "High Blood Pressure",
    "Heart Disease",
    "Thyroid",
    "High Cholesterol",
    "Obesity",
  ];

  //Save family members
  const saveFamilyMember = async () => {
    try {
      const response = await fetch("/api/family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          ...familyMember,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Family member added successfully!");

        setShowAddMember(false);

        // Reset form
        setFamilyMember({
          name: "",
          relation: "",
          dateOfBirth: "",
          gender: "",
          dietaryPreference: "",
          allergies: "",
          healthConditions: [],
        });

        // Refresh family members
        fetchFamilyMembers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  //Fetch family member
  const fetchFamilyMembers = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch(`/api/family?email=${session.user.email}`);

      const data = await response.json();

      if (data.success) {
        setFamilyMembers(data.members);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Delete member
  const deleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this family member?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/family/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchFamilyMembers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Edit member
  const [editingMember, setEditingMember] = useState(null);

  const updateFamilyMember = async () => {
    try {
      console.log("ID:", editingMember._id);
      console.log("Type:", typeof editingMember._id);
      const response = await fetch(`/api/family/${editingMember._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session.user.email,
          ...familyMember,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchFamilyMembers();

        setEditingMember(null);

        setShowAddMember(false);

        setFamilyMember({
          name: "",
          relation: "",
          dateOfBirth: "",
          gender: "",
          dietaryPreference: "",
          allergies: "",
          healthConditions: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-20 min-[500px]:pt-15 pt-10">
      <div className="min-[1000px]:mx-30 min-[600px]:mx-15 min-[500px]:mx-10 mx-5 my-5 bg-green-50 min-[500px]:p-10 px-5 py-7">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl">My Profile</h2>
            <p className="text-sm text-gray-700">
              Manage your account information and preferences
            </p>
          </div>
          {/* <button className="bg-slate-200 hover:bg-mauve-200 cursor-pointer my-6 font-bold flex gap-2 items-center py-1.5 px-5 max-[750px]:p-1 max-[750px]:rounded-full rounded-lg border-2 hover:border-3">
            <lord-icon
              src="https://cdn.lordicon.com/exymduqj.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#000000"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <span className="max-[750px]:hidden">Edit Profile</span>
          </button> */}
        </div>
        <div className="flex min-[600px]:gap-20 gap-10 items-center mt-5">
          <img
            src="images/profile.png"
            alt=""
            className="min-[500px]:h-35 h-25 rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <div className="ml-2">
              <h3 className="text-xl font-bold">{session?.user?.name}</h3>
              <p className="text-xs text-gray-700">{session?.user?.email}</p>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-full mt-5 text-sm max-[500px]:text-xs text-gray-800 font-semibold">
              Signed in with Google
            </button>
          </div>
        </div>
      </div>
      <div className="bg-green-500 h-1 opacity-20 lg:my-25 my-20"></div>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-10 min-[1000px]:mx-30 min-[600px]:mx-15 min-[500px]:mx-10 mx-5">
        <div className="min-[420px]:px-8 px-5 min-[420px]:py-12 py-10 bg-purple-100">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold flex items-center gap-3">
              <div className="bg-purple-200 flex justify-center items-center">
                <lord-icon
                  src="https://cdn.lordicon.com/bushiqea.json"
                  trigger="hover"
                  colors="primary:#320a5c"
                  style={{ width: "28px", height: "28px" }}
                ></lord-icon>
              </div>
              <span className="text-purple-900">Personal Information</span>
            </h4>
            <button
              onClick={() => {
                if (editingSection === 1) {
                  saveProfile();
                } else {
                  setEditingSection(1);
                }
              }}
              className="bg-purple-200 hover:bg-purple-300 cursor-pointer pr-4 pl-2 py-1 rounded-lg border border-purple-950 hover:border-2 font-semibold text-sm flex items-center gap-2 text-purple-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/exymduqj.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#320a5c,secondary:#320a5c"
                style={{ width: "25px", height: "23px" }}
              ></lord-icon>
              <span className="text-green-950">
                {editingSection === 1 ? "Save" : "Edit"}
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 mt-7 max-[900px]:gap-18 max-[700px]:gap-10 max-[420px]:gap-2 max-[500px]:text-sm">
            <ul className="flex flex-col gap-2.5 font-medium text-gray-700">
              <li>Full Name : </li>
              <li>Email : </li>
              <li>Phone Number : </li>
              <li>Age : </li>
              <li>Gender : </li>
            </ul>
            <ul className="flex flex-col gap-2.5 font-medium">
              <li>{session?.user?.name}</li>
              <li>{session?.user?.email}</li>
              <li>
                {editingSection === 1 ? (
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                    className="border border-gray-500 rounded px-2 py-0.5"
                  />
                ) : (
                  profile.phone || "-"
                )}
              </li>
              <li>
                {editingSection === 1 ? (
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="border border-gray-500 rounded px-2 py-0.5"
                  />
                ) : profile.dateOfBirth ? (
                  `${calculateAge(profile.dateOfBirth)} years`
                ) : (
                  "-"
                )}
              </li>
              <li>
                {editingSection === 1 ? (
                  <select
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  profile.gender || "-"
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="min-[420px]:px-8 px-5 min-[420px]:py-12 py-10 bg-pink-100">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold flex items-center gap-3">
              <div className="bg-pink-200 flex justify-center items-center">
                <lord-icon
                  src="https://cdn.lordicon.com/hsabxdnr.json"
                  trigger="hover"
                  colors="primary:#911710"
                  style={{ width: "28px", height: "28px" }}
                ></lord-icon>
              </div>
              <span className="text-red-900">Preferences</span>
            </h4>
            <button
              onClick={() => {
                if (editingSection === 2) {
                  saveProfile();
                } else {
                  setEditingSection(2);
                }
              }}
              className="bg-pink-200 hover:bg-red-200 cursor-pointer pr-4 pl-2 py-1 rounded-lg border border-red-900 hover:border-2 font-semibold text-sm flex items-center gap-2"
            >
              <lord-icon
                src="https://cdn.lordicon.com/exymduqj.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#911710,secondary:#000000"
                style={{ width: "25px", height: "23px" }}
              ></lord-icon>
              <span className="text-red-900">
                {editingSection === 2 ? "Save" : "Edit"}
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 mt-7 max-[900px]:gap-18 max-[700px]:gap-10 max-[420px]:gap-2 max-[500px]:text-sm">
            <ul className="flex flex-col gap-2.5 font-medium text-gray-700">
              <li>Dietary Preference : </li>
              <li>Cooking Experience : </li>
              <li>Spice Preference : </li>
              <li>Language : </li>
            </ul>
            <ul className="flex flex-col gap-2.5 font-medium max-[420px]:max-w-[50px]">
              <li>
                {editingSection === 2 ? (
                  <select
                    value={profile.dietaryPreference}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dietaryPreference: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                ) : (
                  profile.dietaryPreference || "-"
                )}
              </li>
              <li>
                {editingSection === 2 ? (
                  <select
                    value={profile.cookingExperience}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cookingExperience: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                ) : (
                  profile.cookingExperience || "-"
                )}
              </li>
              <li>
                {editingSection === 2 ? (
                  <select
                    value={profile.spicePreference}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        spicePreference: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Spicy">Spicy</option>
                  </select>
                ) : (
                  profile.spicePreference || "-"
                )}
              </li>
              <li>
                {editingSection === 2 ? (
                  <select
                    value={profile.language}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        language: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                ) : (
                  profile.language || "-"
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-500 h-1 opacity-20 lg:my-25 my-20"></div>

      <div className="min-[1000px]:mx-30 min-[600px]:mx-15 min-[500px]:mx-10 mx-5">
        <div className="bg-slate-100 py-15 min-[550px]:px-15 px-8 ">
          <div className="flex max-[1000px]:flex-col max-[1000px]:gap-1 min-[1000px]:items-center min-[1000px]:justify-between">
            <div className="flex items-center gap-3">
              <lord-icon
                src="https://cdn.lordicon.com/gznfrpfp.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#0a5c15,secondary:#0a5c15"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <div>
                <h3 className="font-bold text-xl">Family Profiles</h3>
                <p className="text-xs text-gray-700">
                  Manage your family members to get personalized AI food
                  suggestions
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddMember(true)}
              className="bg-slate-300 hover:bg-slate-100 cursor-pointer my-6 text-slate-900 font-bold text-sm flex gap-2 items-center py-2 px-5 rounded-lg border border-slate-900 hover:border-2 max-[1000px]:max-w-[170px]"
            >
              <lord-icon
                src="https://cdn.lordicon.com/vjgknpfx.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#000000,secondary:#000000"
                style={{ width: "23px", height: "23px" }}
              ></lord-icon>
              <span>Add Member</span>
            </button>
          </div>
          <div className="mt-7 grid min-[860px]:grid-cols-2 grid-cols-1 gap-7">
            {/* <div className="bg-slate-200 p-5">
              <div className="flex max-[450px]:flex-col max-[450px]:gap-3 min-[450px]:items-center min-[450px]:justify-between">
                <span className="rounded-full bg-slate-300 p-2 flex max-[450px]:w-[62px] max-[450px]:h-[62px] flex items-center justify-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/mwhabkof.json"
                    trigger="in"
                    delay="500"
                    stroke="bold"
                    state="in-reveal"
                    colors="primary:#121331,secondary:#f9c9c0,tertiary:#0a5c15,quaternary:#b26836,quinary:#e8e230"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                </span>
                <div className="w-full min-[450px]:px-10">
                  <h4 className="text-lg font-semibold">XYZ Name</h4>
                  <div className="text-gray-700 font-semibold flex gap-5 text-sm">
                    <span>Father</span>
                    <span>48 yrs</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-sm mt-6 text-gray-700">
                <div className="flex gap-7 mb-3">
                  <div className="bg-gray-300 rounded-full px-4 py-1">
                    Diabetic
                  </div>
                  <div className="bg-gray-300 rounded-full px-4 py-1">
                    High BP
                  </div>
                </div>
                <span>Diet : Vegeterian</span>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="bg-slate-300 hover:bg-slate-100 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#00000,secondary:#00000"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                  <span>Edit</span>
                </button>
                <button className="bg-slate-300 hover:bg-slate-100 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/jzinekkv.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#00000,secondary:#00000"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                  <span>Delete</span>
                </button>
              </div>
            </div> */}
            {familyMembers.map((member) => (
              <div key={member._id} className="bg-slate-200 p-5">
                <div className="flex max-[450px]:flex-col max-[450px]:gap-3 min-[450px]:items-center min-[450px]:justify-between">
                  <span className="rounded-full bg-slate-300 p-2 flex max-[450px]:w-[62px] max-[450px]:h-[62px] items-center justify-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/mwhabkof.json"
                      trigger="in"
                      delay="500"
                      stroke="bold"
                      state="in-reveal"
                      colors="primary:#121331,secondary:#f9c9c0,tertiary:#0a5c15,quaternary:#b26836,quinary:#e8e230"
                      style={{ width: "60px", height: "60px" }}
                    ></lord-icon>
                  </span>

                  <div className="w-full min-[450px]:px-10">
                    <h4 className="text-lg font-semibold">{member.name}</h4>

                    <div className="text-gray-700 font-semibold flex gap-5 text-sm">
                      <span>{member.relation}</span>
                      <span>{calculateAge(member.dateOfBirth)} yrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-sm mt-6 text-gray-700">
                  <div className="flex gap-3 flex-wrap mb-3">
                    {member.healthConditions.length > 0 ? (
                      member.healthConditions.map((condition) => (
                        <div
                          key={condition}
                          className="bg-gray-300 rounded-full px-4 py-1"
                        >
                          {condition}
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-300 rounded-full px-4 py-1">
                        Healthy
                      </div>
                    )}
                  </div>

                  <span>
                    Diet : {member.dietaryPreference || "Not Specified"}
                  </span>

                  {member.allergies && (
                    <span className="mt-2">Allergies : {member.allergies}</span>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setEditingMember(member);

                      setFamilyMember({
                        name: member.name,
                        relation: member.relation,
                        dateOfBirth: member.dateOfBirth?.split("T")[0] || "",
                        gender: member.gender,
                        dietaryPreference: member.dietaryPreference,
                        allergies: member.allergies,
                        healthConditions: member.healthConditions,
                      });

                      setShowAddMember(true);
                    }}
                    className="bg-slate-300 hover:bg-slate-100 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2"
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
                    onClick={() => deleteMember(member._id)}
                    className="bg-slate-300 hover:bg-slate-100 cursor-pointer text-slate-900 font-bold text-sm flex gap-2 items-center py-1 px-4 rounded-lg border border-slate-900 hover:border-2"
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
            ))}
          </div>
        </div>
      </div>

      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl min-[500px]:p-8 p-3 w-[90%] max-w-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowAddMember(false)}
              className="absolute min-[500px]:top-8 top-3 right-5 text-2xl font-bold cursor-pointer"
            >
              ×
            </button>

            <h2 className="min-[500px]:text-2xl text-xl font-bold mb-6">
              Add Family Member
            </h2>

            <div className="grid grid-cols-2 min-[500px]:gap-5 gap-2">
              {/* Name */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={familyMember.name}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-1.5 mt-1 max-[500px]:text-sm"
                />
              </div>

              {/* Relation */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Relation
                </label>
                <select
                  value={familyMember.relation}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      relation: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-1.5 mt-1  max-[500px]:text-sm"
                >
                  <option value="">Select Relation</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Grandfather</option>
                  <option>Grandmother</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Spouse</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={familyMember.dateOfBirth}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-1.5 mt-1 max-[500px]:text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Gender
                </label>
                <select
                  value={familyMember.gender}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      gender: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-1.5 mt-1 max-[500px]:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Dietary Preference */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Dietary Preference
                </label>
                <select
                  value={familyMember.dietaryPreference}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      dietaryPreference: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-1.5 mt-1 max-[500px]:text-sm"
                >
                  <option value="">Select</option>
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Vegan</option>
                  <option>Eggetarian</option>
                </select>
              </div>

              {/* Allergies */}
              <div>
                <label className="font-semibold max-[500px]:text-sm">
                  Allergies
                </label>
                <input
                  type="text"
                  value={familyMember.allergies}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      allergies: e.target.value,
                    })
                  }
                  placeholder="Peanuts, Milk..."
                  className="w-full border rounded-lg px-3 py-1.5 mt-1 max-[500px]:text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="font-semibold min-[500px]:text-lg">
                Health Conditions
              </label>

              <div className="grid grid-cols-2 min-[500px]:gap-3 gap-2 mt-3 max-[500px]:text-sm">
                {healthOptions.map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={familyMember.healthConditions.includes(
                        condition,
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFamilyMember({
                            ...familyMember,
                            healthConditions: [
                              ...familyMember.healthConditions,
                              condition,
                            ],
                          });
                        } else {
                          setFamilyMember({
                            ...familyMember,
                            healthConditions:
                              familyMember.healthConditions.filter(
                                (item) => item !== condition,
                              ),
                          });
                        }
                      }}
                    />

                    {condition}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-1 rounded-lg text-sm border bg-red-600 hover:bg-red-800 text-white cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={editingMember ? updateFamilyMember : saveFamilyMember}
                className="px-4 py-1 rounded-lg text-sm bg-green-600 text-white cursor-pointer hover:bg-green-700"
              >
                {editingMember ? "Update Member" : "Save Member"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-500 h-1 opacity-20 mt-20 mb-10"></div>
    </div>
  );
};

export default page;
