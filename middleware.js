import { NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

export async function middleware(req) {
  try {
    const token = req.cookies.get("todoToken")?.value;

    const user = token ? await verifyToken(token) : null;

    const publicRoutes = ["/login", "/signup"];
    const privateRoutes = ["/", "/add_task", "/profile", "/edit_profile"];
    // const privateRoutes = ["/", "/add_task", "/profile", "/edit_profile", "/edit_profile/:path*"];
    const pathname = req.nextUrl.pathname;

    const isAuthenticated = !!user;

    if (privateRoutes.includes(pathname) && !isAuthenticated) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (publicRoutes.includes(pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const response = NextResponse.next();
    if (user) {
      response.headers.set("x-user-id", user.userId); // Optional: pass userId
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Middleware error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/", "/add_task", "/profile", "/edit_profile", "/login", "/signup"],
  // matcher: ["/", "/add_task", "/profile", "/edit_profile", "/login", "/signup", "/edit_profile/:path*", ],
};
