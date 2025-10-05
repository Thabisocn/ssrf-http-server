import type { Server } from "bun"
import { readFileSync } from 'fs';
import { join } from 'path';

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

//file

import fs from 'fs';

import path from 'path';


export function GET(request) {

  let usersPath = path.join(process.cwd(), 'test.txt');

  let file = fs.readFileSync(usersPath);

  return new Response(file);

}

