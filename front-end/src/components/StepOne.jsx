import React, { useState } from "react";

const StepOne = ({ nextStep, saveStepData, handleEmailSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      await handleEmailSubmit(email, password);

      saveStepData({ email, password });
      nextStep();
    } catch (err) {
      console.error("Error creating or loading user:", err);
      setError("Failed to create or load user. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-sm">
          Start by entering an email and password:
        </h2>
      </div>

      <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="relative">
          <div className="w-72">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address:
            </label>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="w-72 mt-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>

        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default StepOne;
