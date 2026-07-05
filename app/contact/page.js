"use client";
import React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const page = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("❌ Something went wrong.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="pb-20">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#bbf2bf,transparent)]"></div>
      </div>
      <div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-5 gap-10 lg:px-30 sm:px-20 min-[500px]:px-10 px-5 pt-15">
          <div className="lg:max-w-sm px-5 py-2">
            <div>
              <p className="text-xs font-medium text-green-900 flex items-center gap-1">
                <lord-icon className="max-[500px]:hidden"
                  src="https://cdn.lordicon.com/pixusvzc.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
                <span>Get in Touch</span>
              </p>
              <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold mt-2 mb-1">
                We would love to hear from{" "}
                <span className="text-green-900">You!</span>
              </h1>
              <div className="bg-green-900 h-0.5 max-w-[70] my-3"></div>
              <p className="mb-10 mt-5 text-gray-700 max-[500px]:text-sm">
                Have a question, suggestion, or just want to say hello? We're
                here to help! Fill out the form and our team will get back to
                you as soon as possible.
              </p>
            </div>
            <div>
              <ul>
                <li className="flex items-center gap-5 my-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/gtvaxhwv.json"
                    trigger="loop"
                    delay="1500"
                    stroke="bold"
                    colors="primary:#121331,secondary:#ebe6ef,tertiary:#109121,quaternary:#3a3347"
                    style={{ width: "30px", height: "32px" }}
                  ></lord-icon>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-gray-700 text-sm">
                      palak07.pv@gmail.com
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-5 my-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/tqkqgjax.json"
                    trigger="loop"
                    delay="1500"
                    stroke="bold"
                    colors="primary:#121331,secondary:#109121,tertiary:#ebe6ef"
                    style={{ width: "30px", height: "30px" }}
                  ></lord-icon>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-gray-700 text-sm">+91 94303 55633</p>
                  </div>
                </li>
                <li className="flex items-center gap-5 my-5">
                  <lord-icon
                    src="https://cdn.lordicon.com/gdowkrjt.json"
                    trigger="loop"
                    delay="1500"
                    stroke="bold"
                    colors="primary:#121331,secondary:#ebe6ef,tertiary:#109121,quaternary:#f24c00"
                    style={{ width: "30px", height: "30px" }}
                  ></lord-icon>
                  <div>
                    <h4 className="font-semibold">Response Time</h4>
                    <p className="text-gray-700 text-sm">Within 24-48 hours</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="px-5 py-2">
            <div className="flex gap-5 justify-center items-center my-5">
              <lord-icon
                src="https://cdn.lordicon.com/ypjuppft.json"
                trigger="loop"
                delay="1500"
                stroke="bold"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
              <div>
                <div className="font-bold text-xl">Send Us a Message</div>
                <p className="text-gray-700 max-[500px]:text-sm">
                  Fill out the form below and we will get back to you
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="mt-7"
            >
              <li className="flex flex-col gap-1 my-4">
                <span className="font-semibold text-[16px] max-[500px]:text-sm">Your Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Enter your name"
                  className="border-2 border-gray-300 rounded-lg py-1 px-3 max-[500px]:text-sm"
                />
              </li>
              <li className="flex flex-col gap-1 my-4">
                <span className="font-semibold text-[16px] max-[500px]:text-sm">Your Email</span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Enter your email"
                  className="border-2 border-gray-300 rounded-lg py-1 px-3 max-[500px]:text-sm"
                />
              </li>
              <li className="flex flex-col gap-1 my-4">
                <span className="font-semibold text-[16px] max-[500px]:text-sm">Subject</span>
                <input
                 name="subject"
                  value={formData.subject}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Enter your subject"
                  className="border-2 border-gray-300 rounded-lg py-1 px-3 max-[500px]:text-sm"
                />
              </li>
              <li className="flex flex-col gap-1 my-4">
                <span className="font-semibold text-[16px] max-[500px]:text-sm">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  placeholder="Write your message..."
                  className="border-2 border-gray-300 rounded-lg py-1 px-3 h-30 resize-none max-[500px]:text-sm"
                />
              </li>
              {status && (
                <p className="mt-4 text-center text-green-800 font-medium">
                  {status}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="text-white cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-3 py-2.5 text-center w-full my-4"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div></div>
        </div>

        <div className="bg-green-500 h-1 opacity-20 my-10"></div>

        <div className="lg:px-30 sm:px-20 min-[500px]:px-10 px-5 mx-auto max-w-4xl py-5">
          <p className="text-xs font-medium text-green-900 flex items-center justify-center gap-1">
            <lord-icon
              src="https://cdn.lordicon.com/pixusvzc.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#2ca58d,tertiary:#ffc738,quaternary:#b26836"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            <span>Quick Answers</span>
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-1 text-center">
            Frequently Asked
            <span className="text-green-900"> Questions</span>
          </h2>
          <div className="bg-green-900 h-0.5 max-w-[70] my-3 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-aut text-center max-[500px]:text-sm">
            Find answers to common questions about NutriNest AI, meal planning,
            pantry management, and your account.
          </p>
          <div className="mt-8">
            <div className="bg-slate-200 rounded-sm shadow-sm border border-gray-300 my-4">
              <button
                onClick={() => setOpen(open === 1 ? 0 : 1)}
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 max-[500px]:text-sm">
                  How does NutriNest AI generate recipes?
                </h3>

                {open === 1 && (
                  <p className="text-gray-700 px-6 max-[500px]:text-sm">
                    NutriNest AI analyzes the ingredients available in your
                    pantry, dietary preferences, and nutritional goals to
                    generate personalized, healthy, and delicious recipes in
                    seconds.
                  </p>
                )}

                <ChevronDown
                  size={22}
                  className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div className="bg-slate-200 rounded-sm shadow-sm border border-gray-300 my-4">
              <button
                onClick={() => setOpen(open === 2 ? 0 : 2)}
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 max-[500px]:text-sm">
                  Can I add custom ingredients to my pantry?
                </h3>

                {open === 2 && (
                  <p className="text-gray-700 px-6 max-[500px]:text-sm">
                    Yes! You can manually add, edit, or remove ingredients from
                    your pantry at any time. This helps NutriNest generate
                    recipes based on what you actually have at home.
                  </p>
                )}

                <ChevronDown
                  size={22}
                  className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div className="bg-slate-200 rounded-sm shadow-sm border border-gray-300 my-4">
              <button
                onClick={() => setOpen(open === 3 ? 0 : 3)}
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 max-[500px]:text-sm">
                  Does NutriNest support dietary preferences?
                </h3>

                {open === 3 && (
                  <p className="text-gray-700 px-6 max-[500px]:text-sm">
                    Absolutely! You can personalize your experience by selecting
                    dietary preferences such as vegetarian, vegan, gluten-free,
                    high-protein, and more.
                  </p>
                )}

                <ChevronDown
                  size={22}
                  className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    open === 3 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div className="bg-slate-200 rounded-sm shadow-sm border border-gray-300 my-4">
              <button
                onClick={() => setOpen(open === 4 ? 0 : 4)}
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 max-[500px]:text-sm">
                  Is my personal data safe?
                </h3>

                {open === 4 && (
                  <p className="text-gray-700 px-6 max-[500px]:text-sm">
                    Yes. We prioritize your privacy and use secure practices to
                    protect your account, pantry information, and meal planning
                    data.
                  </p>
                )}

                <ChevronDown
                  size={22}
                  className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div className="bg-slate-200 rounded-sm shadow-sm border border-gray-300 my-4">
              <button
                onClick={() => setOpen(open === 5 ? 0 : 5)}
                className="w-full flex justify-between items-center px-6 py-3 text-left"
              >
                <h3 className="font-semibold text-gray-900 max-[500px]:text-sm">
                  Is NutriNest AI free to use?
                </h3>

                {open === 5 && (
                  <p className="text-gray-700 px-6 max-[500px]:text-sm">
                    Yes! NutriNest AI offers core features such as pantry
                    management, meal planning, and AI-powered recipe suggestions
                    for free. Additional premium features may be introduced in
                    the future.
                  </p>
                )}

                <ChevronDown
                  size={22}
                  className={`text-green-600 transition-transform duration-300 flex-shrink-0 ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-500 h-1 opacity-20 my-10"></div>
      </div>
    </div>
  );
};

export default page;
