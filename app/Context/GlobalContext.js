"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { DOMAIN } from "../utils/constants";

// Create the context
const GlobalContext = createContext();

// Define the provider component
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [listopbar, setlisttopbar] = useState(false);
  const [users, setusers] = useState([]);
  const FetchMe = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/api/users/me`);
      // console.log("response", response?.data?.existingUser);
      setUser(response?.data?.existingUser || null);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    FetchMe();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ user, setUser, listopbar, setlisttopbar, users, setusers }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const UseGlobalState = () => {
  return useContext(GlobalContext);
};
