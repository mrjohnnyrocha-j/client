import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const query = 'SELECT * FROM profiles WHERE user_id = $1';
      const values = [user_id];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      res.status(200).json(result.rows[0]);
    } else if (req.method === 'POST') {
      const { user_id, first_name, last_name, bio, profile_pic } = req.body;

      if (!user_id || !first_name || !last_name || !bio || !profile_pic) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const query = `
        INSERT INTO profiles (user_id, first_name, last_name, bio, profile_pic)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [user_id, first_name, last_name, bio, profile_pic];

      const result = await pool.query(query, values);

      res.status(201).json(result.rows[0]);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
