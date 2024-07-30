import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const picturePosts = await prisma.picturePost.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(picturePosts);
    } catch (error) {
      console.error('Error fetching picture posts:', error);
      res.status(500).json({ error: 'Failed to fetch picture posts' });
    }
  } else if (req.method === 'POST') {
    const { userId, imageUrl, description } = req.body;
    try {
      // const newPicturePost = await prisma.picturePost.create({
      //   data: {
      //     userId,
      //     imageUrl,
      //     description,
      //   },
      //});
      //res.status(201).json(newPicturePost);
    } catch (error) {
      console.error('Error creating picture post:', error);
      res.status(500).json({ error: 'Failed to create picture post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
