import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const history = await prisma.browsingHistory.findMany({
        where: { userId: String(userId) },
        include: { item: true },
      });
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching browsing history:', error);
      res.status(500).json({ error: 'Error fetching browsing history' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method === 'POST') {
    const { userId, itemId } = req.body;
    try {
      const newEntry = await prisma.browsingHistory.create({
        data: {
          userId,
          itemId: parseInt(itemId),
          viewedAt: new Date(),
        },
      });
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error adding to browsing history:', error);
      res.status(500).json({ error: 'Error adding to browsing history' });
    }
  }
  
}
