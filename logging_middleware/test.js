const Log = require("./logger");

async function test() {
  await Log(
    "frontend",
    "info",
    "page",
    "Logging middleware initialized successfully"
  );
}

test();