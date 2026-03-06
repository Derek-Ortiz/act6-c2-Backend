import { Pool, QueryResult, PoolConfig } from 'pg';
import * as dns from 'dns';

const poolConfig: PoolConfig & { lookup?: Function } = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  lookup: (hostname: string, options: any, callback: any) => {
    dns.lookup(hostname, { family: 4 }, callback);
  }
};

const pool = new Pool(poolConfig);

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};