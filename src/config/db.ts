import { Pool, QueryResult } from 'pg';

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 15000,
        idleTimeoutMillis: 30000,
        max: 10,
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: {
          rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 15000,
        idleTimeoutMillis: 30000,
        max: 10,
      }
);

// Probar conexión al iniciar
pool.connect()
  .then(client => {
    console.log('✅ Conectado a PostgreSQL');
    return client.query('SELECT NOW()').finally(() => client.release());
  })
  .then(result => {
    console.log('✅ Base de datos lista:', result.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err.message);
    if (!process.env.DATABASE_URL) {
      console.error('Host:', process.env.DB_HOST);
      console.error('Port:', process.env.DB_PORT);
      console.error('User:', process.env.DB_USER);
    }
  });

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};