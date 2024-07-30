import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { user_id } = req.query;

      const posts = await prisma.post.findMany({
        where: user_id ? { userId: String(user_id) } : {},
        include: {
          _count: {
            select: {
              replies: true,
              likes: true,
              views: true,
              shares: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found' });
      }

      res.status(200).json(posts);
    } else if (req.method === 'POST') {
      const { user_id, content, user_name, user_profile_pic, postType } = req.body;

      if (!user_id || !content || !user_name || !user_profile_pic || !postType) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newPost = await prisma.post.create({
        data: {
          userId: user_id,
          content: content,
          userName: user_name,
          userProfilePic: user_profile_pic,
          postType: postType,
        },
      });

      res.status(201).json(newPost);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
