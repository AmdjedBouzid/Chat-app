"use client";
import { useSession } from "next-auth/react";
import React from "react";
import ChatList from "../../_componnets/ChatList";
import ContactList from "../../_componnets/ContactList";
function page() {
  return (
    <div className="h-screen flex justify-between gap-5 px-10 py-3 max-lg:gap-8">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full ">
        <ChatList />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden  ">
        <ContactList />
      </div>
    </div>
  );
}

export default page;
