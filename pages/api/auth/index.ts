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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filter = '', limit = 10, offset = 0 } = req.query;
  const query = `
    SELECT id, email, "firstName", "lastName", "companyName", "profilePic" 
    FROM "User" 
    WHERE "firstName" ILIKE $1 OR "lastName" ILIKE $1
    LIMIT $2 OFFSET $3;
  `;
  const values = [`%${filter}%`, limit, offset];
  const result = await pool.query(query, values);
  res.status(200).json(result.rows);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstName, lastName, companyName, profilePic } = req.body;
  const query = `
    INSERT INTO "User" (email, password, "firstName", "lastName", "companyName", "profilePic") 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [email, password, firstName, lastName, companyName, profilePic];
  const result = await pool.query(query, values);
  res.status(201).json(result.rows[0]);
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, email, password, firstName, lastName, companyName, profilePic } = req.body;
  const query = `
    UPDATE "User" 
    SET email = $1, password = $2, "firstName" = $3, "lastName" = $4, "companyName" = $5, "profilePic" = $6 
    WHERE id = $7 RETURNING *;
  `;
  const values = [email, password, firstName, lastName, companyName, profilePic, id];
  const result = await pool.query(query, values);
  res.status(200).json(result.rows[0]);
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const query = 'DELETE FROM "User" WHERE id = $1';
  await pool.query(query, [id]);
  res.status(200).json({ message: 'User deleted successfully' });
};
