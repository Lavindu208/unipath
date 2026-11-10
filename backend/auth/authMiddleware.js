import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "unipath_jwt_secret_key_2026_secure";

/**
 * Middleware to verify JWT token in incoming requests
 * Expects Authorization: Bearer <token>
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

export default verifyToken;
