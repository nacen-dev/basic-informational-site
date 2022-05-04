const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : `${req.url}.html`);
  console.log(filePath)

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "404.html"), (error, content) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }
    } else {
      console.log("request url", req.url);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
