
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN_API } from "../../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        AUTH_LOGIN_API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      // =====================================================
      // SAVE AUTH DATA
      // =====================================================

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // =====================================================
      // REDIRECT
      // =====================================================

      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      if (err.name === "TypeError") {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setError(err.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#549bf8]
        p-4
      "
    >
      {/* =====================================================
          BACKGROUND GLOW 1
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-white/20
          blur-3xl
        "
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BACKGROUND GLOW 2
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-32
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-blue-900/30
          blur-3xl
        "
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          MAIN BANNER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          flex
          min-h-[620px]
          w-full
          max-w-5xl
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-white/20
          bg-gradient-to-br
          from-[#0d4ea6]
          via-[#1162cc]
          to-[#0a3578]
          shadow-2xl
        "
      >
        {/* ===================================================
            DECORATIVE GLOW
        =================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            -left-12
            -top-12
            h-64
            w-64
            rounded-full
            bg-blue-400/30
            blur-3xl
          "
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            pointer-events-none
            absolute
            left-[-80px]
            top-1/3
            h-40
            w-80
            rotate-45
            rounded-full
            bg-sky-300/20
            blur-2xl
          "
          animate={{
            x: [0, 80, 0],
            rotate: [45, 55, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            pointer-events-none
            absolute
            bottom-10
            right-10
            h-96
            w-96
            rounded-full
            bg-blue-900/60
            blur-3xl
          "
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ===================================================
            FLOATING PILL 1
        =================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-16
            top-1/3
            h-8
            w-16
            rounded-full
            bg-sky-200/80
            shadow-inner
          "
          animate={{
            y: [0, -20, 0],
            rotate: [-12, -4, -12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ===================================================
            FLOATING PILL 2
        =================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-24
            top-[38%]
            h-6
            w-12
            rounded-full
            bg-sky-300/70
          "
          animate={{
            y: [0, 25, 0],
            x: [0, 15, 0],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ===================================================
            LOGIN CARD
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -5,
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.3)",
          }}
          className="
            relative
            z-10
            w-full
            max-w-md
            rounded-2xl
            border
            border-white/25
            bg-white/10
            p-8
            text-white
            shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]
            backdrop-blur-xl
            sm:p-10
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* =================================================
                TITLE
            ================================================= */}

            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.h1
                className="
                  mt-0.5
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                "
                whileHover={{
                  x: 4,
                }}
              >
                Login
              </motion.h1>

              <p className="mt-1 text-xs text-white/70">
                Sign in to your Pristine Energy account
              </p>
            </motion.div>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mb-4
                  rounded-md
                  border
                  border-red-300/30
                  bg-red-500/20
                  px-3
                  py-2
                  text-xs
                  text-red-100
                "
              >
                {error}
              </motion.div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              {/* EMAIL */}

              <motion.div
                variants={itemVariants}
                className="space-y-1"
              >
                <label
                  htmlFor="email"
                  className="
                    text-xs
                    font-light
                    text-white/90
                  "
                >
                  Email
                </label>

                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="username@gmail.com"
                  autoComplete="email"
                  disabled={loading}
                  whileFocus={{
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    w-full
                    rounded-md
                    border
                    border-white/40
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    text-gray-800
                    shadow-sm
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-400
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                />
              </motion.div>

              {/* PASSWORD */}

              <motion.div
                variants={itemVariants}
                className="space-y-1"
              >
                <label
                  htmlFor="password"
                  className="
                    text-xs
                    font-light
                    text-white/90
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <motion.input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Password"
                    autoComplete="current-password"
                    disabled={loading}
                    whileFocus={{
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      w-full
                      rounded-md
                      border
                      border-white/40
                      bg-white
                      px-4
                      py-2.5
                      pr-10
                      text-xs
                      text-gray-800
                      shadow-sm
                      placeholder:text-gray-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-400
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    "
                  />

                  {/* EYE BUTTON */}

                  <motion.button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    whileHover={{
                      scale: 1.15,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition-colors
                      hover:text-gray-600
                      disabled:cursor-not-allowed
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* =================================================
                  SIGN IN BUTTON
              ================================================= */}

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    !loading
                      ? {
                        scale: 1.02,
                        y: -2,
                      }
                      : {}
                  }
                  whileTap={
                    !loading
                      ? {
                        scale: 0.97,
                      }
                      : {}
                  }
                  className="
                    mt-2
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-white/10
                    bg-[#0d2f60]
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    shadow-md
                    transition-colors
                    duration-200
                    hover:bg-[#092247]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* ===================================================
              CARD SHINE EFFECT
          =================================================== */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-2xl
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
            initial={{
              x: "-120%",
            }}
            animate={{
              x: "120%",
            }}
            transition={{
              duration: 2,
              delay: 1.2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

