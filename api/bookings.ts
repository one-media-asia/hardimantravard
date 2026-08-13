import { VercelRequest, VercelResponse } from '@vercel/node';
import { createPool, Pool } from 'mysql2/promise';

// Read MySQL connection settings from environment variables.
// These should be set in your deployment environment or a local .env file.
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

function getPool(): Pool {
  // Reuse a global pool if already created (helps with serverless cold starts).
  if ((global as any).__MYSQL_POOL) return (global as any).__MYSQL_POOL;

  const pool = createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
  });

  (global as any).__MYSQL_POOL = pool;
  return pool;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests for booking creation.
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });

  // Validate database configuration before attempting to connect.
  if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE) {
    return res.status(500).send({ error: 'MySQL not configured on server' });
  }

  try {
    const payload = req.body;

    // Ensure required booking fields are provided.
    if (!payload || !payload.name || !payload.email) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Map request data into query parameters.
    const values = [
      payload.id || null,
      payload.name,
      payload.email,
      payload.phone || null,
      payload.location || null,
      payload.service || null,
      payload.preferredDate || null,
      payload.message || null,
      payload.adminComment || null,
      payload.deposit ? Number(payload.deposit) : null,
      payload.createdAt || new Date().toISOString(),
    ];

    const sql = `INSERT INTO bookings (id, name, email, phone, location, service, preferredDate, message, adminComment, deposit, createdAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const pool = getPool();
    await pool.execute(sql, values);

    // Return success if the booking was inserted successfully.
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error('MySQL insert error', err);
    return res.status(500).send({ error: 'Server error' });
  }
}
