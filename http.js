const WebSocket = require("ws");
const config = require("./config");
const http = require("http");
const bouncer = require(`./bouncer.js`);

// For log
const curD = _ => (new Date()).toLocaleString("ia");
const log = _ => console.log(process.pid, curD(), "-", _);

// Server
const server = http.createServer()
const wss = new WebSocket.WebSocketServer({ noServer: true });

server.on('request', (req, res) => {
  log(`${req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.address()?.address} - ${req.method} ${req.url}`)

  if (req.headers.accept?.includes("application/nostr+json"))
    return res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }).end(JSON.stringify(config.server_meta));

  if (req.url === "/" || /^\/v[1-9]{1}\/ws\-proxy.*/.test(req.url)) {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    if (config.mode === 'public') {
      res.write("Welcome to freefrom's nostr relay\n");
    } else {
      res.write("Hello. This nostr bouncer (bostr) is bouncing the following relays:\n\n");
      config.relays.forEach(_ => {
        res.write("- " + _ + "\n");
      });
    }

    res.write(`\nI have ${wss.clients.size} clients currently connected to this relay${(process.env.CLUSTERS || config.clusters) > 1 ? " on this cluster" : ""}.\n`);

    if (config.mode === 'public') {
      res.end(`\nConnect to relay with nostr client: wss://${req.headers.host}${req.url}\n\n`);
    } else {
      if (config?.authorized_keys?.length) res.write("\nNOTE: This relay has configured for personal use only. Only authorized users could use this bostr relay.\n");
      res.end(`\nConnect to relay with nostr client: ws://${req.headers.host}${req.url} or wss://${req.headers.host}${req.url}\n\n`);
    }
  } else {
    res.writeHead(404).end("What are you looking for?");
  }
});

server.on('upgrade', (req, sock, head) => {
  wss.handleUpgrade(req, sock, head, _ => bouncer(_, req));
});

const listened = server.listen(process.env.PORT || config.port, config.address || "0.0.0.0", _ => {
  log("Bostr is now listening on " + "ws://" + (config.address || "0.0.0.0") + ":" + config.port);
});
