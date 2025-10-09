import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  console.log("token", token)

  const protectedPaths = ["/snippets", "/snippets/post-new"];

  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next(); 
    } catch {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/snippets", "/snippets/post-new"],
};
