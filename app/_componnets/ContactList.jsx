"use client";
import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import axios from "axios";
import { UseGlobalState } from "../Context/GlobalContext";
import { DOMAIN } from "../utils/constants";
import { Preview } from "@mui/icons-material";

function ContactList() {
  const { users, setusers, user } = UseGlobalState();
  const [Search_User, Set_Search_User] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Fetchusers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        Search_User === ""
          ? `${DOMAIN}/api/users/all`
          : `${DOMAIN}/api/users/${Search_User}`
      );
      if (response.status === 200) {
        setusers(response?.data?.users);
      }
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      Fetchusers();
    }, 50); // Debounce the search
    return () => clearTimeout(delayDebounceFn);
  }, [Search_User]);

  useEffect(() => {
    console.log("users_______", users);
  }, [users]);
  const [Sellcted_Contact, Set_Sellected_Contact] = useState([]);
  const IS_Groupe = Sellcted_Contact.length > 1;
  const Hundel_Sellect = (contact) => {
    if (Sellcted_Contact.includes(contact)) {
      // Remove the contact if it's already selected
      Set_Sellected_Contact((Prev) => Prev.filter((con) => con !== contact));
    } else {
      // Add the contact if it's not already selected
      Set_Sellected_Contact((Prev) => [...Prev, contact]);
    }
  };

  // Log the updated Sellcted_Contact state using useEffect
  useEffect(() => {
    console.log("Updated selected contacts:", Sellcted_Contact);
  }, [Sellcted_Contact]); // Run this effect whenever Sellcted_Contact changes

  return (
    <div className="w-1/2 max-lg:w-full flex flex-col gap-7 h-screen">
      <input
        type="text"
        placeholder="Search contact ..."
        className="px-5 py-3 rounded-2xl bg-white outline-none"
        value={Search_User}
        onChange={(e) => Set_Search_User(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {/* {error && <p>{error}</p>} */}

      <div className="flex gap-7 items-start max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full flex flex-col gap-5 rounded-3xl py-5 px-8 mb-20">
          <p className="text-body-bold">Search or Deselect</p>

          {users &&
            users
              .filter((item) => item._id !== user._id) // Exclude the current user by their ID
              .map((user) => (
                <Contact
                  key={user._id}
                  username={user.username}
                  profileimg={user.profileimg}
                  hundelclick={() => Hundel_Sellect(user)} // Correctly pass click handler
                />
              ))}
        </div>
      </div>

      <button className="flex items-center justify-center rounded-xl p-3 bg-gradient-to-l from-blue-1 to-blue-3 text-body-bold text-white">
        Start New Chat
      </button>
    </div>
  );
}

export default ContactList;
