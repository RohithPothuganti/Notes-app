import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const __dirname = path.resolve(path.dirname(''));

app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => console.log(`Server started on port ${process.env.PORT || 5001}`));
});
