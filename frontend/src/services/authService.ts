import api from "./api";
import type { SignUpData, LoginData, AuthResponse, User } from "../types/auth.types";

const TOKEN_KEY = "unipath_token";
const USER_KEY = "unipath_user";

export const authService = {
  /**
   * Register a new user
   */
  async signup(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/users/signup", data);
    return response.data;
  },

  /**
   * Log in an existing user
   */
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/users/login", credentials);
    if (response.data.success && response.data.token && response.data.user) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Log out current user
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Get currently logged-in user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  /**
   * Get JWT token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Check if a user is currently authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;
