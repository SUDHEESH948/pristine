
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const solarProductRoutes = require("./routes/solarProductRoutes");
const authRoutes = require("./routes/authRoutes");

const {
  createDefaultUser,
} = require("./controllers/authController");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://pristine-livid.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
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

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// DATABASE
// ==========================================

connectDB()
  .then(async () => {
    await createDefaultUser();
  })
  .catch((error) => {
    console.error(
      "Database initialization error:",
      error
    );
  });

// ==========================================
// API ROUTES
// ==========================================

// Authentication
app.use("/api/auth", authRoutes);

// Solar Products
app.use("/api/solar-products", solarProductRoutes);

// ==========================================
// DASHBOARD ROUTES
// ==========================================

// Dashboard
app.get("/Dashbord", (req, res) => {
  res.redirect("https://pristine-livid.vercel.app/login");
});

// Lowercase dashboard
app.get("/dashboard", (req, res) => {
  res.redirect("https://pristine-livid.vercel.app/login");
});

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pristine Energy API is running",
  });
});

// ==========================================
// 404 ROUTE
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(errorMiddleware);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

