import { query } from '../config/db';

export const createUser = async (name: string, email: string, passwordHash: string) => {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
  `;
  const result = await query(sql, [name, email, passwordHash]);
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const sql = `SELECT * FROM users WHERE email = $1;`;
  const result = await query(sql, [email]);
  return result.rows[0];
};