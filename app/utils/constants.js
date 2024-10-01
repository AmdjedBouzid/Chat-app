export const DOMAIN = "http://localhost:3000";
export const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET || ""
);
