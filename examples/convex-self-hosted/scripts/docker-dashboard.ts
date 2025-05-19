import { spawnSync } from "bun";

const CONTAINER_NAME = "convex-dashboard";

function stopContainer() {
  console.log(`Stopping container: ${CONTAINER_NAME}`);
  spawnSync(["docker", "stop", CONTAINER_NAME], {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  });
}

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  stopContainer();
  process.exit(0);
});
process.on("exit", () => {
  console.log("exit received");
  stopContainer();
});

spawnSync(
  [
    "docker",
    "run",
    "--rm",
    "-it",
    "-p",
    "6791:6791",
    "-e",
    "NEXT_PUBLIC_DEPLOYMENT_URL=http://127.0.0.1:3210",
    "--name",
    CONTAINER_NAME,
    "--stop-signal",
    "SIGINT",
    "--stop-timeout",
    "10",
    "ghcr.io/get-convex/convex-dashboard:5143fec81f146ca67495c12c6b7a15c5802c37e2",
  ],
  {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  }
);
