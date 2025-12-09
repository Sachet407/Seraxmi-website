// src/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

interface Session {
  role: "admin" | "client";
  [key: string]: unknown;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isClientRoute = pathname.startsWith("/client");

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  }) as Session | null;

  // -----------------------------
  // 1. If user is NOT logged in
  // -----------------------------
  if (!session) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // -----------------------------
  // 2. Admin Routes
  // -----------------------------
  if (isAdminRoute) {
    if (session.role !== "admin") {
      // client is trying to access admin route → send to client dashboard
      return NextResponse.redirect(new URL("/client", request.url));
    }
  }

  // -----------------------------
  // 3. Client Routes
  // -----------------------------
  if (isClientRoute) {
    if (session.role !== "client") {
      // admin is trying to access client route → send to admin dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Allow if all conditions satisfied
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
