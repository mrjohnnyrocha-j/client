// pages/api/items/offers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const offers = await prisma.offer.findMany({
        include: {
          Item: true, // Include related item information if needed
        },
      });
      res.status(200).json(offers);
    } catch (error: any) {
      console.error('Error fetching offers:', error);
      res.status(500).json({ error: 'Error fetching offers', details: error.message });
    }
  } else if (req.method === 'POST') {
    const { item_id, discount_percentage, start_date, end_date } = req.body;
    try {
      const newOffer = await prisma.offer.create({
        data: { item_id, discount_percentage, start_date, end_date },
      });
      res.status(201).json(newOffer);
    } catch (error: any) {
      console.error('Error creating offer:', error);
      res.status(500).json({ error: 'Error creating offer', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
