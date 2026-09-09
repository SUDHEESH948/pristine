
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// CREATE DEFAULT ADMIN
// ==========================================
const createDefaultUser = async () => {
  try {
    const email = "pristine_energy026@gmail.com";
    const password = "pristine_energy_0@34";

    // Check if admin already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      console.log("Default admin already exists");
      return existingUser;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create default admin
    const user = await User.create({
      name: "Pristine Admin",
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      isActive: true,
    });

    console.log("Default admin created successfully");

    return user;
  } catch (error) {
    console.error(
      "Default user creation error:",
      error.message
    );

    return null;
  }
};

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ==========================================
    // NORMALIZE EMAIL
    // ==========================================
    const normalizedEmail = email
      .toLowerCase()
      .trim();

    // ==========================================
    // FIND USER
    // ==========================================
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // ==========================================
    // USER NOT FOUND
    // ==========================================
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CHECK ACTIVE STATUS
    // ==========================================
    if (user.isActive !== true) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CHECK JWT SECRET
    // ==========================================
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error(
        "JWT_SECRET is missing in .env"
      );

      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing",
      });
    }

    // ==========================================
    // CREATE JWT TOKEN
    // ==========================================
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================
    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
  login,
  createDefaultUser,
};