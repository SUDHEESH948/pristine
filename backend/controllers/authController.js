
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
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return existingUser;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create default admin
    const user = await User.create({
      name: "Pristine Admin",
      email,
      password: hashedPassword,
      isActive: true,
    });


  } catch (error) {
    console.error(
      "Default user creation error:",
      error.message
    );
  }
};

// ==========================================
// LOGIN
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
    // FIND USER
    // ==========================================

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================================
    // CHECK ACTIVE STATUS
    // ==========================================

    if (!user.isActive) {
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

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing",
      });
    }

    // ==========================================
    // CREATE JWT
    // ==========================================

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
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
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  login,
  createDefaultUser,
};

