// AddPasswordForm.jsx
import React from 'react';

function AddPasswordForm({ handleSubmit, togglePopup, website, setWebsite, username, setUsername, password, setPassword }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg mx-auto max-w-2xl w-full">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col w-full h-full justify-center items-center relative">
          <div className="absolute top-0 right-0 flex justify-end items-center">
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={togglePopup}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Add New Password</h1>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
              ipsa culpa autem, at itaque nostrum!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 w-full space-y-4"
          >
            <div>
              <label htmlFor="website" className="sr-only">Website</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter website or other.."
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                  <i className="ri-pages-line" />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="username" className="sr-only">username</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                <i className="ri-user-line"></i>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Password"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                  <i className="ri-key-line" />
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full inline-block rounded-lg bg-[#757493] px-5 py-3 text-sm font-medium text-white"
              >
                Add Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPasswordForm;