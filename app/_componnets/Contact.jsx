import React from "react";
import { RadioButtonUnchecked } from "@mui/icons-material";

function Contact({ username, profileimg, hundelclick }) {
  // console.log({ username, profileimg });

  return (
    <div
      className="flex gap-3 items-center cursor-pointer"
      onClick={hundelclick} // Call the passed handler on click
    >
      <RadioButtonUnchecked />
      <img
        src={profileimg || `/assets/person.jpg`} // Use fallback image if profileimg is missing
        alt="user"
        className="w-11 h-11 rounded-full object-cover object-center"
      />
      <p className="text-base-bold"> {username}</p>
    </div>
  );
}

export default Contact;
