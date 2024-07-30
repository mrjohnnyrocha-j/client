import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, itemId, quantity } = req.body;
    try {
      const newCartItem = await prisma.cart.create({
        data: {
          userId,
          itemId,
          quantity,
        },
      });
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Error adding item to cart' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
