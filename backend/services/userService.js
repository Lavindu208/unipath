import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "unipath_jwt_secret_key_2026_secure";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Service to register a new user
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {number|string} [userData.zScore]
 * @param {string} [userData.district]
 * @param {string} [userData.stream]
 * @returns {Promise<Object>} Created user without password
 */
export async function signupUser({ name, email, password, zScore, district, stream }) {
  // 1. Validation
  if (!name || !name.trim()) {
    const error = new Error("Name is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !email.trim()) {
    const error = new Error("Email is required.");
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    const error = new Error("Invalid email format.");
    error.statusCode = 400;
    throw error;
  }

  if (!password || password.length < 6) {
    const error = new Error("Password must be at least 6 characters long.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 2. Check if email already registered
  const existingUser = await UserModel.findByEmail(normalizedEmail);
  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  // 3. Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 4. Save to database
  const createdUser = await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    zScore: zScore !== undefined && zScore !== null && zScore !== "" ? zScore : null,
    district: district ? district.trim() : null,
    stream: stream ? stream.trim() : null,
  });

  return createdUser;
}

/**
 * Service to authenticate user login and generate JWT token
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>} Authenticated user and JWT token
 */
export async function loginUser({ email, password }) {
  // 1. Validation
  if (!email || !email.trim()) {
    const error = new Error("Email is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!password) {
    const error = new Error("Password is required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // 2. Find user by email
  const user = await UserModel.findByEmail(normalizedEmail);
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // 3. Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // 4. Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      zScore: user.zScore,
      district: user.district,
      stream: user.stream,
    },
    token,
  };
}

export default {
  signupUser,
  loginUser,
};
