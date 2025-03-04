"use client";

import Image from "next/image";


const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GDGoC Tech Club, Maasai Mara University. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://x.com/gdgoc_mmarau1?t=2QPCpa0dSXKWT2PnVC43fw&s=09" className="text-xl hover:text-gray-400">
            <Image src="/assets/icons/twitter.svg" alt="twitter"  width={24} height={24} />
          </a>
          <a href="https://github.com/gdgoc-mmarau1" className="text-xl hover:text-gray-400">
            <Image src="/assets/icons/github.svg" alt="github" width={24} height={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;