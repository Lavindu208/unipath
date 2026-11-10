import { signupUser, loginUser } from "../services/userService.js";

/**
 * Controller handling user signup
 * POST /api/users/signup
 */
export async function signup(req, res) {
  try {
    const { name, email, password, zScore, district, stream } = req.body;

    const user = await signupUser({
      name,
      email,
      password,
      zScore,
      district,
      stream,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "An unexpected error occurred during signup.",
    });
  }
}

/**
 * Controller handling user login
 * POST /api/users/login
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user,
      token,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "An unexpected error occurred during login.",
    });
  }
}

export default {
  signup,
  login,
};
