// app/signin/SignInFormClient.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import signIn from "../../actions/auth/signin";
import Toast from "../components/Toast"; 
import { useRouter } from 'next/navigation';


export default function SignInForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(signIn, undefined);
  const errors = state?.fieldErrors;
  const message = state?.message;
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (message === "Login successful") {
      setToastMessage("Login successful!");

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    }
  }, [message, router]);



  return (
    <>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action={action}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
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
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href="/recover-password"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full border darK:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                  Sign In
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
