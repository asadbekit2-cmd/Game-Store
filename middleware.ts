import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Protect Admin Routes
                if (path.startsWith("/admin")) {
                    return !!token && token.isAdmin === true;
                }

                // Protect Library and other authenticated routes
                if (path.startsWith("/library")) {
                    return !!token;
                }

                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/library/:path*", "/profile/:path*"],
};
