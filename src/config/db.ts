import { Pool, QueryResult } from 'pg';

// Configuración para Session Pooler (IPv4 compatible)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 6543,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 30000,
  max: 10
});

// Probar conexión al iniciar
pool.connect()
  .then(client => {
    console.log('✅ Conectado a Supabase Session Pooler (IPv4)');
    return client.query('SELECT NOW()');
  })
  .then(result => {
    console.log('✅ Base de datos lista:', result.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err.message);
    console.error('Host:', process.env.DB_HOST);
    console.error('Port:', process.env.DB_PORT);
    console.error('User:', process.env.DB_USER);
  });

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};