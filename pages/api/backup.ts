// pages/api/backup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      await pool.query('BEGIN');

      // Iterate over your data and insert it into the PostgreSQL database
      // Example for contacts:
      const contactInsertQuery = `
        INSERT INTO contacts (user_id, name, phone, email, address, notes) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        ON CONFLICT (user_id, name) DO NOTHING;  -- Adjust conflict resolution as needed
      `;

      for (const contact of data.contacts) {
        await pool.query(contactInsertQuery, [
          contact.user_id,
          contact.name,
          contact.phone,
          contact.email,
          contact.address,
          contact.notes,
        ]);
      }

      await pool.query('COMMIT');
      res.status(200).json({ message: 'Backup successful' });
    } catch (error: any) {
      await pool.query('ROLLBACK');
      console.error('Backup error:', error);
      res.status(500).json({ error: 'Backup failed', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
