"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

function Provider() {
  return <div></div>;
}

export default Provider;

// const Provider = ({ children, session }) => {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// };

// export default Provider;
