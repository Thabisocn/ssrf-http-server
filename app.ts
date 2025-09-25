const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("SSRF test ");
  },
});

console.log(`Listening on ${server.url}`);