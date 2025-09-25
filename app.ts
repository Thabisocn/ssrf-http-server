const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("testing ssrf");
  },
});

console.log(`Listening on ${server.url}`);