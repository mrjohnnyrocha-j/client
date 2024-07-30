import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const sales = await prisma.sale.findMany();
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching sales' });
    }
  } else if (req.method === 'POST') {
    const { item_id, quantity, sale_date, total_amount } = req.body;
    try {
      const newSale = await prisma.sale.create({
        data: { item_id, quantity, sale_date, total_amount },
      });
      res.status(201).json(newSale);
    } catch (error) {
      res.status(500).json({ error: 'Error creating sale' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
