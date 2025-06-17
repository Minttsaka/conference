import { type NextRequest, NextResponse } from "next/server"
import { decrypt } from "./lib/session"

// All routes in the conference app require authentication except login
const publicRoutes = ["/login"]

const allowedOrigins = ['http://localhost:3001','http://localhost:3000','https://www.google.com' ]


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)


  const origin = request.headers.get('origin')

    if (origin && request.method !== 'GET' && !allowedOrigins.includes(origin)) {
      // Add environment URL if it exists
      const envUrl = process.env.NEXT_PUBLIC_AUTH_URL;
      if (envUrl && !allowedOrigins.includes(envUrl)) {
        allowedOrigins.push(envUrl);
      }
      
      if (!allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
          status: 400,
          statusText: 'Bad Request',
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

  // Get the session from the cookie
  const session = request.cookies.get("session")?.value
  const payload = session ? await decrypt(session) : null
  const isAuthenticated = !!payload

  
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*","/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

