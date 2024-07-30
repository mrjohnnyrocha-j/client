import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  } else if (req.method === 'POST') {
    const { item_id, user_id, quantity, order_date, total_amount } = req.body;
    try {
      const newOrder = await prisma.order.create({
        data: { item_id, user_id, quantity, order_date, total_amount },
      });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
