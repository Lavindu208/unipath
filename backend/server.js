import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./config/db.js";
import { initSchema } from "./models/schema.js";
import userRoutes from "./routes/userRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Health Check & Sample Route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the Node.js Express server!" });
});

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  const isConnected = await testConnection();
  if (isConnected) {
    await initSchema();
  }
});

export default app;
