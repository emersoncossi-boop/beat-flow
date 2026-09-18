import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

declare global {
  var _postgresPool: Pool | undefined;
}

export const createPool = () => {
  if (!global._postgresPool) {
    global._postgresPool = new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 15000,
    });

    global._postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });
  }
  return global._postgresPool;
};

let _drizzleDb: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (!_drizzleDb) {
    const pool = createPool();
    _drizzleDb = drizzle(pool, { schema });
  }
  return _drizzleDb;
};

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const instance = getDb();
    const val = (instance as unknown as Record<string, unknown>)[prop as string];
    return typeof val === 'function' ? val.bind(instance) : val;
  },
});

