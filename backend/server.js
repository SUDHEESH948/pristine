
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const solarProductRoutes = require("./routes/solarProductRoutes");
const authRoutes = require("./routes/authRoutes");

const { createDefaultUser } = require("./controllers/authController");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ============================================================
// CORS
// ============================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://pristine-livid.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      // Local development
      const isLocalOrigin =
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      // Vercel deployments
      const isVercelOrigin =
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);

      if (
        allowedOrigins.includes(origin) ||
        isLocalOrigin ||
        isVercelOrigin
      ) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// DATABASE
// ============================================================

connectDB()
  .then(async () => {
    console.log("MongoDB connected successfully");

    try {
      await createDefaultUser();
    } catch (error) {
      console.error("Default user creation error:", error.message);
    }
  })
  .catch((error) => {
    console.error("Database initialization error:", error);
  });

// ============================================================
// API ROUTES
// ============================================================

app.use("/api/auth", authRoutes);

app.use("/api/solar-products", solarProductRoutes);

// ============================================================
// DASHBOARD ROUTES
// ============================================================

app.get("/Dashbord", (req, res) => {
  res.redirect("https://pristine-livid.vercel.app/login");
});

app.get("/dashboard", (req, res) => {
  res.redirect("https://pristine-livid.vercel.app/login");
});

// ============================================================
// TEST ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pristine Energy API is running",
  });
});

// ============================================================
// 404
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(errorMiddleware);

// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

