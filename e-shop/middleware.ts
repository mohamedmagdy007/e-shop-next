import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("userInfo")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const protectedPaths = ["/products/create", "/products/edit"];
  if (
    protectedPaths.some((path) => url.pathname.startsWith(path)) &&
    JSON.parse(token)?.user?.role !== "admin"
  ) {
    url.pathname = "/not-authorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/cart", "/products/create", "/products/edit/:path*"],
};
