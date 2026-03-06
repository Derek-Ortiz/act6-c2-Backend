import { Pool, QueryResult, PoolConfig } from 'pg';

const poolConfig: PoolConfig & { family?: number } = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  family: 4
};

const pool = new Pool(poolConfig);

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};