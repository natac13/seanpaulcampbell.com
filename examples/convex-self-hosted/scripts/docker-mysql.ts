import { spawnSync } from "bun";

const CONTAINER_NAME = "convex-mysql";

function stopContainer() {
  console.log(`Stopping container: ${CONTAINER_NAME}`);
  spawnSync(["docker", "stop", CONTAINER_NAME], {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  });
}

process.on("SIGINT", () => {
  stopContainer();
  process.exit(0);
});

spawnSync(
  [
    "docker",
    "run",
    "--rm",
    "-it",
    "-p",
    "3306:3306",
    "-v",
    "mysql-data:/var/lib/mysql",
    "-e",
    "MYSQL_ROOT_PASSWORD=root",
    "-e",
    "MYSQL_DATABASE=convex_self_hosted",
    "--name",
    CONTAINER_NAME,
    "mysql:8.0",
  ],
  {
    stdio: ["inherit", "inherit", "inherit"],
    env: process.env,
  }
);
