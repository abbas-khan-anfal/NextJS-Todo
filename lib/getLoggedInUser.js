// lib/getLoggedInUser.js
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";

// export async function getLoggedInUser() {
//   const token = await cookies().get("todoToken")?.value;
//   return token ? await verifyToken(token) : null;
// }

export async function getLoggedInUser() {
  const userCookies = await cookies();
  const token = userCookies.get("todoToken")?.value;
  return token ? await verifyToken(token) : null;
}

