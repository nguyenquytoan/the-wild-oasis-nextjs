// import { NextRequest, NextResponse } from "next/server";

import { auth } from "./services/auth";

// export const middleware = (request: NextRequest) => {
//   return NextResponse.redirect(new URL("/about", request.url));
// };

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
