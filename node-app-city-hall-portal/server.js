const http = require("http");
const url = require("url");

const {
  services,
  departments,
  announcements,
  permits,
  applications,
} = require("./data");

const PORT = 5000;

// ---------------- RESPONSE HELPER ----------------
function send(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(JSON.stringify(data));
}

// ---------------- BODY PARSER ----------------
function getBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
  });
}

// ---------------- SERVER ----------------
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  // remove trailing slash (IMPORTANT FIX)
  let path = parsed.pathname;
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  console.log(req.method, path); // DEBUG

  // ---------------- OPTIONS (CORS) ----------------
  if (req.method === "OPTIONS") {
    return send(res, 200, {});
  }

 // ---------------- SERVICES (ALL + SEARCH) ----------------
if (req.method === "GET" && path === "/api/services") {
  let result = services;

  if (parsed.query.search) {
    const q = parsed.query.search.toLowerCase();
    result = result.filter((s) =>
      s.name.toLowerCase().includes(q)
    );
  }

  return send(res, 200, result);
}

// ---------------- SERVICE DETAIL ----------------
if (
  req.method === "GET" &&
  path.startsWith("/api/services/") &&
  !path.endsWith("/apply")
) {
  const id = path.split("/")[3];

  const service = services.find((s) => s.id === id);

  if (!service) {
    return send(res, 404, { message: "Service not found" });
  }

  return send(res, 200, service);
}

// ---------------- APPLY SERVICE ----------------
if (
  req.method === "POST" &&
  path.startsWith("/api/services/") &&
  path.endsWith("/apply")
) {
  const id = path.split("/")[3];

  const body = await getBody(req);

  const application = {
    id: Date.now(),
    serviceId: id,
    ...body,
    status: "Submitted",
    createdAt: new Date().toISOString()
  };

  applications.push(application);

  return send(res, 201, {
    message: "Application Submitted",
    reference: "APP-" + application.id
  });
}

  // ---------------- DEFAULT ----------------
  return send(res, 404, { message: "API Not Found" });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});