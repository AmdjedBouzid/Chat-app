import {
  ColorLens,
  Email,
  LockOpenOutlined,
  Password,
  Person,
} from "@mui/icons-material";
import Link from "next/link";
import React from "react";

function Form({ type }) {
  return (
    <div className="w-full h-lvh flex items-center justify-center  bg-purple-200">
      <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl">
        <img src="/assets/logo.png" className="w-52 h-auto" />
        <form className="flex flex-col items-center gap-5">
          {type === "regesrer" ? (
            <>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  type="text"
                  placeholder="username"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />{" "}
                <Person style={{ color: "#737373" }} />
              </div>{" "}
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  type="email"
                  placeholder="email"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />{" "}
                <Email style={{ color: "#737373" }} />
              </div>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  type="password"
                  placeholder="password"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />{" "}
                <LockOpenOutlined style={{ color: "#737373" }} />
              </div>
              <button
                className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-1 hover:bg-red-1 text-white text-body-bold"
                type="submit"
              >
                Regerster
              </button>
              <Link href="/Login" className="text-base-medium hover:text-red-1">
                <p className="text-center">
                  Aredy you have account ? Signe in here
                </p>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  type="email"
                  placeholder="email"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />{" "}
                <Email style={{ color: "#737373" }} />
              </div>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  type="password"
                  placeholder="password"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />{" "}
                <LockOpenOutlined style={{ color: "#737373" }} />
              </div>
              <button
                className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-1 hover:bg-red-1 text-white text-body-bold"
                type="submit"
              >
                Login
              </button>
              <Link
                href="/regester"
                className="text-base-medium hover:text-red-1"
              >
                <p className="text-center">
                  you have not account ? regester here
                </p>
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
