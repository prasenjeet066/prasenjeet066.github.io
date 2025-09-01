// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of file extensions you want to block
const blockedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff", ".woff2", ".ttf", ".eot"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if the path points to a blocked file type
  if (blockedExtensions.some(ext => url.pathname.endsWith(ext))) {
    // Optionally, you can allow only your own domain or auth users
    return new NextResponse("Access Denied", { status: 403 });
  }
  
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: "/:path*", // applies to all routes
};