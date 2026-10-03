const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

const app = require("../src/app");

test("GET /health returns healthy response", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));

  const { port } = server.address();

  const response = await fetch(`http://localhost:${port}/health`);
  const body = await response.json();

  assert.strictEqual(response.status, 200);

  assert.deepStrictEqual(body, {
    status: "ok",
    service: "ecommerce-backend",
  });

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
});
