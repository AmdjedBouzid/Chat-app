import React from "react";

function ChatList() {
  return (
    <div
      className="h-screen flex flex-col gap-5 pb-20 
    "
    >
      <input
        type="text"
        placeholder="Searche chat ..."
        className="px-5 py-3 rounded-2xl bg-white outline-none"
      />
    </div>
  );
}

export default ChatList;
