import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  if (!postId || typeof postId !== 'string') {
    res.status(400).json({ error: 'Invalid postId' });
    return;
  }

  try {
    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { replies: true },
      });

      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      res.status(200).json(post);
    } else if (req.method === 'POST') {
      const { content, userId } = req.body;

      if (!content || !userId) {
        res.status(400).json({ error: 'Content and userId are required' });
        return;
      }

      const newReply = await prisma.reply.create({
        data: {
          content,
          postId,
          userId,
        },
      });

      res.status(201).json(newReply);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
