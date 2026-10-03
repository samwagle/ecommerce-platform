const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

const app = require("../src/app");

test("GET /api/products returns products from PostgreSQL", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));

  const { port } = server.address();

  try {
    const response = await fetch(
      `http://localhost:${port}/api/products`
    );

    const body = await response.json();

    assert.strictEqual(response.status, 200);

    assert.ok(Array.isArray(body));

    assert.strictEqual(body.length, 3);

    assert.deepStrictEqual(body, [
      {
        id: 1,
        name: "Laptop",
        price: "80000.00",
      },
      {
        id: 2,
        name: "Mechanical Keyboard",
        price: "5000.00",
      },
      {
        id: 3,
        name: "Monitor",
        price: "25000.00",
      },
    ]);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
});
