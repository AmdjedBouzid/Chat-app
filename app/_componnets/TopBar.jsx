"use client";
import React, { useEffect } from "react";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./comp.module.css";
import { List } from "lucide-react";
import { UseGlobalState } from "../Context/GlobalContext";
function TopBar() {
  const Pathname = usePathname();
  const router = useRouter();
  // const hundelLogout = async () => {
  //   signOut({ callbackUrl: "/Login" });
  // };
  const { user, listopbar, setlisttopbar } = UseGlobalState();

  return (
    <div className="top-0 sticky px-4 py-5 flex items-center justify-between bg-blue-2 h-20 w-full">
      {" "}
      <div className="top-0 sticky px-10 py-5 flex items-center justify-between bg-blue-2">
        <Link href="/Chats">
          {" "}
          <img src="/assets/logo.png" alt="logo" className="w-52 h-auto" />
        </Link>
      </div>
      <div className="flex items-center gap-8 max-sm:hidden mr-3">
        <Link
          href="/Chats"
          className={Pathname === "/Chats" ? "text-red-1" : ""}
        >
          Chats{" "}
        </Link>
        <Link
          href="/Contacts"
          className={Pathname === "/Contacts" ? "text-red-1" : ""}
        >
          Contacts{" "}
        </Link>
        <Logout
          // onClick={hundelLogout}
          sx={{ color: "#737373", cursor: "pointer" }}
        />
        <img
          src={user ? user.image : "/assets/person.jpg"}
          alt="profile img"
          sx={{ cursor: "pointer" }}
          className="w-11 h-11 rounded-full object-cover object-center"
          onClick={() => {
            router.push("/Profile");
          }}
        />
      </div>
      <List
        onClick={() => {
          setlisttopbar(!listopbar);
        }}
      />
    </div>
  );
}

export default TopBar;
