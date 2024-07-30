import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, itemId } = req.body;

  if (!userId || !itemId) {
    return res.status(400).json({ error: 'User ID and Item ID are required' });
  }

  try {
    await prisma.browsingHistory.create({
      data: {
        userId: userId as string,
        itemId: parseInt(itemId as string),
      },
    });

    res.status(200).json({ message: 'View recorded successfully' });
  } catch (error) {
    console.error('Error recording view:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
