"use client";
import { Domain, Email, LockOpenOutlined, Person } from "@mui/icons-material";
import Link from "next/link";
import { DOMAIN } from "../utils/constants";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
function Form({ type }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (type === "regesrer") {
        const response = await axios.post(`${DOMAIN}/api/auth/regester`, data);
        console.log(response);

        if (response.status === 201) {
          console.log(response.data.user);
          toast.success("user registerd sucssisfelly");
          router.push("/");
        } else {
          toast.error("Error during registration");
        }
      }

      if (type === "Login") {
        const response = await axios.post(`${DOMAIN}/api/auth/login`, data);

        if (response.status === 200) {
          router.push("/");
        } else {
          toast.error("Invalid email or password");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-lvh flex items-center justify-center bg-purple-200">
      <div className="w-1/3 py-7 px-4 max-sm:w-5/6 max-lg:w-2/3 max-xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl">
        <img src="/assets/logo.png" className="w-52 h-auto" alt="Logo" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5"
        >
          {type === "regesrer" ? (
            <>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  defaultValue={""}
                  {...register("username", {
                    required: "User name is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "User name must be at least 3 characters long";
                      } else if (!/[!£$%^&)(_+}{?><]/.test(value)) {
                        return "User name must contain at least one special character";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Username"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />
                <Person style={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}

              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />
                <Email style={{ color: "#737373" }} />
              </div>
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}

              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password must be at least 6 characters long";
                      }
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />
                <LockOpenOutlined style={{ color: "#737373" }} />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <button
                className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-1 hover:bg-red-1 text-white text-body-bold"
                type="submit"
              >
                Register
              </button>
              <Link href="/Login" className="text-base-medium hover:text-red-1">
                <p className="text-center">
                  Already have an account? Sign in here
                </p>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />
                <Email style={{ color: "#737373" }} />
              </div>
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}

              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password must be at least 6 characters long";
                      }
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-[300px] max-sm:w-full bg-transparent outline-none"
                />
                <LockOpenOutlined style={{ color: "#737373" }} />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}

              <button
                className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-1 hover:bg-red-1 text-white text-body-bold"
                type="submit"
              >
                Login
              </button>
              <Link
                href="/Regester"
                className="text-base-medium hover:text-red-1"
              >
                <p className="text-center">
                  Don't have an account? Register here
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
