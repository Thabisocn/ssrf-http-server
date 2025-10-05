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

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, test.txt), 'utf-8');

  console.log(result);

  return result;
}
syncReadFile('./test.txt');

