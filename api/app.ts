import { VercelRequest, VercelResponse } from '@vercel/node';


const server = Bun.serve({
  port: 5000,
  fetch(request) {
    return new Response("SSRF test ");
  },
});

console.log(`Listening on ${server.url}`);