import type { Server } from "bun"

export default {
async fetch(request: Request, server: Server) {
    let text = "SSRF test!\n"

    text += `\nurl: ${request.url}\n`

    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel")) continue
      text += `\n${key}: ${value}`
    }

 for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("Referer")) continue
      text += `\n${key}: ${value}`
    }

 for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("origin")) continue
      text += `\n${key}: ${value}`
    }

 for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("User")) continue
      text += `\n${key}: ${value}`
    }

 for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("Cookie")) continue
      text += `\n${key}: ${value}`
    }

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
  },
}