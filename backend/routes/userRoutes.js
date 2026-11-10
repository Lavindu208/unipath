import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   POST /api/users/signup
 * @desc    Register a new user with personal and educational details
 * @access  Public
 */
router.post("/signup", userController.signup);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user credentials and return a JWT token
 * @access  Public
 */
router.post("/login", userController.login);

export default router;
