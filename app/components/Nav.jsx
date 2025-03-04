"use client";
import React from "react";
import { useState } from "react";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import home_icon from "../../public/assets/icons/home-icon.svg";
import users_icon from "../../public/assets/icons/users-icon.svg";
import programs_icon from "../../public/assets/icons/programs.svg";
import blog_icon from "../../public/assets/icons/blogs.svg";
import resources_icon from "../../public/assets/icons/folder-icon.svg";
import logIn_icon from "../../public/assets/icons/login-icon.svg";
import menu_icon from "../../public/assets/icons/menu-icon.png";

const Nav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(!mobileMenu) : setMobileMenu(!mobileMenu);
    console.log("clicked");
    console.log(mobileMenu);
  };
  return (
    <div className="navBar flex items-center relative">
      <div className="w-52 logo">
        <Link href="/">
          <div className="flex items-center pt-2 px-2 pb-2 cursor-default">
            <Image
              src="/assets/icons/GDGoC-Logo.jpg"
              alt="logo"
              width={40}
              height={30}
              className="object-contain justify-start rounded-full cursor-pointer"
            />
            <span className="ml-2 font-primary text-white font-extrabold text-2xl cursor-pointer">
              <span style={{ color: "var(--ggle-blue)" }}>G</span>
              <span style={{ color: "var(--ggle-green)" }}>D</span>
              <span style={{ color: "var(--ggle-red-500)" }}>G</span>
              <span style={{ color: "var(--ggle-grey)" }}>o</span>
              <span style={{ color: "var(--ggle-yellow-500)" }}>C</span>
            </span>
          </div>
        </Link>
      </div>

      <ul
        className={`dynamic-island transform transition-transform duration-300 ${
          mobileMenu ? "xsm:translate-x-0" : "xsm:translate-x-full"
        }`}
      >
        <li className="">
          <Link href="/">
            <div className="flex items-center linked-li">
              <Image
                src={home_icon}
                alt="home"
                width={20}
                height={20}
                className="object-contain mr-2"
              />
              <span className="md:hidden lg:inline xl:inline">Home</span>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href="/">
            <div className="flex items-center linked-li">
              <Image
                src={users_icon}
                alt="community"
                width={20}
                height={20}
                className="object-contain mr-2"
              />
              <span className="md:hidden lg:inline xl:inline">Community</span>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href="/">
            <div className="flex items-center linked-li">
              <Image
                src={programs_icon}
                alt="programs"
                width={20}
                height={20}
                className="object-contain mr-2"
              />
              <span className="md:hidden lg:inline xl:inline">Programs</span>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href="/">
            <div className="flex items-center linked-li">
              <Image
                src={blog_icon}
                alt="blogs"
                width={20}
                height={20}
                className="object-contain mr-2"
              />
              <span className="md:hidden lg:inline xl:inline">Blogs</span>
            </div>
          </Link>
        </li>
        <li className="">
          <Link href="/">
            <div className="flex items-center linked-li">
              <Image
                src={resources_icon}
                alt="resources"
                width={20}
                height={20}
                className="object-contain mr-2"
              />
              <span className="md:hidden lg:inline xl:inline">Resources</span>
            </div>
          </Link>
        </li>
        {mobileMenu && (
          <ul>
            <li className="logIn flex">
              <Link href="/login" className="flex items-center">
                <div className="flex items-center">
                  <span className="md:hidden lg:inline xl:inline">Sign In</span>
                  <Image
                    src={logIn_icon}
                    alt="logIn"
                    width={20}
                    height={20}
                    className="object-contain xsm:ml-2 md:ml-0 lg:ml-2 xl:ml-2"
                  />
                </div>
              </Link>
            </li>
          </ul>
        )}
      </ul>

      <div className="xsm:hidden block">
        <ul>
          <li className="logIn flex">
            <Link href="/login" className="flex items-center">
              <div className="flex items-center">
                <span className="md:hidden lg:inline xl:inline">Sign In</span>
                <Image
                  src={logIn_icon}
                  alt="logIn"
                  width={20}
                  height={20}
                  className="object-contain xsm:ml-2 md:ml-0 lg:ml-2 xl:ml-2"
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="bg-[var(--ggle-blue)] p-4 m-3 flex justify-center items-center rounded-lg cursor-pointer md:hidden lg:hidden xl:hidden"
        onClick={toggleMenu}
      >
        <Image
          src={menu_icon}
          alt="menu"
          width={25}
          height={25}
          className="menu-icon z-50 cursor-pointer md:hidden lg:hidden xl:hidden"
        />
      </div>
    </div>
  );
};

export default Nav;
