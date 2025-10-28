import type { Server } from "bun"
import { readFileSync } from 'fs';
import { join } from 'path';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dns from "dns/promises";

export default {

async fetch(request: Request, server: Server) {
    let text = "SSRF test!\n"
    text += `\nurl: ${request.url}\n`

    for (const [key, value] of request.headers.entries()) {
      if (!key.startsWith("x-vercel-i")) continue
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

//file

function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), 'utf-8');

  console.log(result);

  return result;
}
syncReadFile('./test.txt');

//DNS QUERIES

const server = new McpServer({
request: Request,
  name: "dns",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  // name

  "dns-query",

 // replace  Input validation with request.url

  {
    name: z.string().describe("The domain name to query"),
    type: z
      .string()
      .describe("CNAME)"),
  },


  async ({ text, type }) => {
    try {
      if (!text || !type) {

      }

      const resolver = new dns.Resolver();
      resolver.setTimeout(5000);
      const records = await resolver.resolve(text, type);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              domain: text,
              type: type,
              records: records,
            }),
          },
        ],
      };
    } catch (error) {
      // DNS resolution errors
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error resolving DNS: ${error.message}`,
          },
        ],
      };
    }
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DNS MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});