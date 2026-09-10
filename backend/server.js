
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const solarProductRoutes = require("./routes/solarProductRoutes");
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const {
  createDefaultUser,
} = require("./controllers/authController");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ============================================================
// CORS CONFIGURATION
// ============================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://pristine-livid.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // Example: Postman, curl, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(null, false);
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

    optionsSuccessStatus: 204,
  })
);
app.use("/api/gallery", galleryRoutes);
// ============================================================
// BODY PARSER
// ============================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ============================================================
// DATABASE CONNECTION
// ============================================================

connectDB()
  .then(async () => {
    console.log("MongoDB connected successfully");

    try {
      await createDefaultUser();
    } catch (error) {
      console.error(
        "Default user creation error:",
        error.message
      );
    }
  })
  .catch((error) => {
    console.error(
      "Database initialization error:",
      error
    );
  });

// ============================================================
// AUTH ROUTES
// ============================================================

app.use("/api/auth", authRoutes);

// ============================================================
// SOLAR PRODUCT ROUTES
// ============================================================

app.use(
  "/api/solar-products",
  solarProductRoutes
);

// ============================================================
// DASHBOARD ROUTES
// ============================================================

app.get("/Dashbord", (req, res) => {
  res.redirect(
    "https://pristine-livid.vercel.app/login"
  );
});

app.get("/dashboard", (req, res) => {
  res.redirect(
    "https://pristine-livid.vercel.app/login"
  );
});

// ============================================================
// API TEST ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pristine Horizon API is running",
  });
});

// ============================================================
// 404 HANDLER
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
// START SERVER
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});