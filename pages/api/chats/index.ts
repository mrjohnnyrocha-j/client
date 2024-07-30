
// pages/api/calls/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const calls = await prisma.call.findMany({
        where: { userId: String(userId) },
        include: { contact: true },
      });
      res.status(200).json(calls);
    } else if (req.method === 'POST') {
      const { userId, contactId, callType, callTime } = req.body;
      const newCall = await prisma.call.create({
        data: { userId, contactId, callType, callTime },
      });
      res.status(201).json(newCall);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
