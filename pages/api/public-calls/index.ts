import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing userId' });
      }

      const publicCalls = await prisma.publicCall.findMany({
        where: {
          hostUserId: userId,
        },
      });
      return res.status(200).json(publicCalls);
    }

    if (req.method === 'POST') {
      const { host_user_id, start_time } = req.body;

      if (!host_user_id || !start_time) {
        return res.status(400).json({ error: 'Missing required fields: host_user_id and start_time are required' });
      }

      const publicCall = await prisma.publicCall.create({
        data: {
          callId: uuidv4(),
          hostUserId: host_user_id,
          startTime: new Date(start_time),
        },
      });
      return res.status(201).json(publicCall);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error handling public calls:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
