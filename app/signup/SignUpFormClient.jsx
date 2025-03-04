"use client";

import Link from "next/link";
import { useActionState } from "react"; 

export default function SignUpFormClient({ action }) {
  const [state, doAction, pending] = useActionState(action, undefined);
  const errors = state?.fieldErrors;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Account
            </h1>
            <form className="space-y-4 md:space-y-6" action={doAction}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
                {errors?.email && (
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your Unique username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
                {errors?.userName && (
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {errors.userName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
                {errors?.password && (
                  <div>
                    <p>Password must:</p>
                    <ul>
                      {errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                />
                {errors?.confirmPassword && (
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link href="/recover-password" className="text-sm font-medium text-primary-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={pending}
                className="w-full border darK:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
