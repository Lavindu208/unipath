import pool from "../config/db.js";

/**
 * SQL statement to create the users table
 * Note: DECIMAL(5,4) allows 1 integer digit and 4 decimal places (e.g. 1.8542 or -1.5000),
 * adhering to MySQL's requirement that total precision M must be >= scale D.
 */
export const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    zScore DECIMAL(5, 4) NULL,
    district VARCHAR(100) NULL,
    stream VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/**
 * Initializes the database schema
 */
export async function initSchema() {
  try {
    await pool.query(createUserTableQuery);
    console.log("[Schema] 'users' table is ready.");
  } catch (error) {
    console.error(
      "[Schema] Failed to initialize 'users' table:",
      error.message,
    );
    throw error;
  }
}

export default {
  createUserTableQuery,
  initSchema,
};
