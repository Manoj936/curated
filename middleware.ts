import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { sellerRole, superuserRole, userRole } from "./app/libs/constant";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect logged-in users away from /login or /register
    if (
      token &&  token?.role === userRole &&
      (pathname === "/login" || pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/", req.url)); // or dashboard
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow webhook endpoint
        if (pathname.startsWith("/api/webhook")) {
          return true;
        }

        // Allow auth-related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api/products") ||
          pathname.startsWith("/products") 
        ) {
          return true;
        }
        // seller registration page 
        if (pathname.startsWith("/seller-register")) {
          return true;
        }
        // Admin routes require admin role
        if (pathname.startsWith("/seller")) {
          return token?.role === sellerRole ;
        }

        //Superadmin routes require superadmin role

        if (pathname.startsWith("/superuser")) {
          return token?.role === superuserRole;
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
