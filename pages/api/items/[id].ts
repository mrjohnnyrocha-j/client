// pages/api/items/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    console.log('Fetching item with ID:', id);
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Error fetching item' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
