const { parse } = require("url");
const next = require("next");
const { getHttpOrHttpsServer } = require("./protocol");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = parseInt(process.env.PORT || "3000", 10);
const IS_SSL = process.argv.includes("--https");

app.prepare().then(() => {
  const server = getHttpOrHttpsServer(IS_SSL, (req, res) => {
    const parsedUrl = parse(req.url || "", true);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    handle(req, res, parsedUrl);
  });

  server.listen(PORT, "0.0.0.0", (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http${IS_SSL ? "s" : ""}://local.airpremia.com:${PORT}`);
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
