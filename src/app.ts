import type { Server } from "bun"
import * as fs from 'fs';


export default {
async fetch(request: Request, server: Server) {
    let text = "SSRF test!\n"
    text += `\nurl: ${request.url}\n`
    // relative path
    const filePath: string = 'test.txt';

    const content: string = fs.readFileSync(filePath, 'utf-8');
    console.log("CTF:");
    console.log(content);

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