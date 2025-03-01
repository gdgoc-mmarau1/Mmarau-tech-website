"use client"

import { useActionState } from 'react';
import resetPassword from "../../actions/auth/reset_password"


const PasswordRecovery = () => {
  const [state,action,pending] = useActionState(resetPassword,undefined);
  const errors = state?.fieldErrors;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form action={action}>
          <div className="mb-4">
          
                  <div>
                      <label htmlFor="token" className="block mb-2 text-sm font-medium text-black">Token</label>
                      <input type="text"   name="token" id="token" placeholder="Enter the token sent in your Email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      {errors?.token && <p  className="text-sm font-light text-gray-500 dark:text-gray-400">{errors?.token}</p>}
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
                      <input type="password"  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                </div>

{errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {errors?.password?.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
                <div>
                      <label htmlFor="password" className="block mb-2 text-sm text-black">Confirm Password</label>
                      <input type="password"  name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                      
                </div>
                {errors?.confirmPassword  && <p  className="text-sm font-light text-gray-500 dark:text-gray-400">{errors?.confirmPassword}</p>}
           
          </div>
         

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={pending}
          >
            {pending ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Remember your password? <a href="/sign-in" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  )
}

export default PasswordRecovery