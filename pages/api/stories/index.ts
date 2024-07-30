import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        if (id) {
          // Get a single story by ID
          const story = await prisma.story.findUnique({
            where: { id: String(id) },
          });

          if (!story) {
            return res.status(404).json({ error: 'Story not found' });
          }

          res.status(200).json(story);
        } else {
          // Get all stories
          const stories = await prisma.story.findMany();
          res.status(200).json(stories);
        }
        break;

      case 'POST':
        const { title, content } = req.body;

        if (!title || !content) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newStory = await prisma.story.create({
          data: { title, content },
        });

        res.status(201).json(newStory);
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Story ID is required' });
        }

        const { title: updateTitle, content: updateContent } = req.body;

        const updatedStory = await prisma.story.update({
          where: { id: String(id) },
          data: { title: updateTitle, content: updateContent },
        });

        res.status(200).json(updatedStory);
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Story ID is required' });
        }

        await prisma.story.delete({
          where: { id: String(id) },
        });

        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
