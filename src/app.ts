import type { Server } from "bun"

export default {
async fetch(request: Request, server: Server) {
    let text = "SSRF test!\n"
    text += `\nurl: ${request.url}\n`


    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel-i")) continue
      text += `\n${key}: ${value}`
    }

    //DNS QUERIES

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
  },
}