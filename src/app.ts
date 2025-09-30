import type { Server } from "bun"

export default {
async fetch(request: Request, server: Server) {
    let text = "SSRF test!\n"
    const requestHeaders = new Headers(request.headers);

    text += `\nurl: ${request.url}\n`

    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel")) continue
      text += `\n${key}: ${value}`
    }

 requestHeaders.delete('x-vercel-oidc-token');

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
  },
}