// app/recover-password/page.jsx (or wherever your recover-password page lives)
"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import requestResetPassword from "../../actions/auth/request_reset_password";
import Link from "next/link";
import Toast from "../components/Toast"; 

const PasswordRecovery = () => {
  const [state, action, pending] = useActionState(requestResetPassword, undefined);
  const errors = state?.fieldErrors;
  const message = state?.message;
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (message) {
      setToastMessage(message);
    }
  }, [message]);

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Password Recovery</h2>
          <form action={action}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@company.com"
              />
              {errors?.email && (
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={pending}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ${
                pending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {pending ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;
