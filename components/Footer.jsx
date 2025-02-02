"use client";

import { FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
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
            <FaTwitter />
          </a>
          <a href="https://github.com/gdgoc-mmarau1" className="text-xl hover:text-gray-400">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;