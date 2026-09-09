
const isLocalFrontend =
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

const API_BASE_URL = (
    import.meta.env.VITE_API_URL ||
    (isLocalFrontend
        ? "http://localhost:5000"
        : "https://pristine-backend-m1ds.onrender.com")
).trim();

export const SOLAR_PRODUCTS_API =
    `${API_BASE_URL}/api/solar-products`;

export const AUTH_LOGIN_API =
    `${API_BASE_URL}/api/auth/login`;

export default API_BASE_URL;

