import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

const createCategory = async (name: string, color: string) => {
  const query = "INSERT INTO categories (name, color) VALUES ($1, $2) RETURNING *";
  const values = [name, color];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getCategories = async () => {
  const query = "SELECT * FROM categories";
  const result = await pool.query(query);
  return result.rows;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const categories = await getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else if (req.method === "POST") {
    const { name, color } = req.body;
    try {
      const newCategory = await createCategory(name, color);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
