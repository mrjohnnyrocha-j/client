import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  if (req.method === 'POST') {
    const { content, userId } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ error: 'Content and userId are required' });
    }

    const newReply = await prisma.reply.create({
      data: {
        content: content,
        postId: String(postId),
        userId: userId,
      },
    });

    res.status(201).json(newReply);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
