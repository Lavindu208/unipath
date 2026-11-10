import pool from "../config/db.js";

/**
 * User Model - handles database queries for users
 */
export const UserModel = {
  /**
   * Find a user by their email address
   */
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    return rows[0] || null;
  },

  /**
   * Find a user by ID
   */
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, zScore, district, stream, created_at FROM users WHERE id = ? LIMIT 1",
      [id],
    );
    return rows[0] || null;
  },

  /**
   * Insert a new user into the database
   */
  async create({ name, email, password, zScore, district, stream }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password, zScore, district, stream)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        password,
        zScore !== undefined && zScore !== null ? Number(zScore) : null,
        district || null,
        stream || null,
      ],
    );

    return {
      id: result.insertId,
      name,
      email,
      zScore: zScore !== undefined && zScore !== null ? Number(zScore) : null,
      district: district || null,
      stream: stream || null,
    };
  },
};

export default UserModel;
