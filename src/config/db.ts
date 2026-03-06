import { Pool, QueryResult } from 'pg';
import { setDefaultResultOrder } from 'dns';

// Forzar IPv4 antes de cualquier resolución DNS
setDefaultResultOrder('ipv4first');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

// Probar conexión al iniciar
pool.connect()
  .then(client => {
    console.log('✅ Conectado a la base de datos PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  });

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};