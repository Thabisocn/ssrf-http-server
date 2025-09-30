import { NextResponse } from 'next/server';

export default function middleware(request: Request) {
  // Clone the request headers
  // You can modify them with headers API: https://developer.mozilla.org/en-US/docs/Web/API/Headers
  const requestHeaders = new Headers(request.headers);

   // Delete an existing request header
  requestHeaders.delete('x-vercel-oidc-token');

  // You can also set request headers in NextResponse.rewrite
  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
}