import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Enable JSON parsing for APIs
app.use(express.json());

// Optional test API route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
