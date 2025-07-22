import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Create Express app
const app = express();

// Enable JSON body parsing (for API routes, optional)
app.use(express.json());

// Basic API test route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// Set up __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
