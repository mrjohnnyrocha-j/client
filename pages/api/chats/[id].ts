import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        if (id) {
          const chat = await prisma.chat.findUnique({
            where: { id: String(id) },
          });
          if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
          }
          res.status(200).json(chat);
        } else {
          const chats = await prisma.chat.findMany();
          res.status(200).json(chats);
        }
        break;
      case 'POST':
        const { userId, contactId, chatId } = req.body;
        const newChat = await prisma.chat.create({
          data: { userId, contactId, chatId },
        });
        res.status(201).json(newChat);
        break;
      case 'PUT':
        if (!id) {
          return res.status(400).json({ message: 'Missing chat ID' });
        }
        const { userId: updateUserId, contactId: updateContactId, chatId: updateChatId } = req.body;
        const updatedChat = await prisma.chat.update({
          where: { id: String(id) },
          data: {
            userId: updateUserId,
            contactId: updateContactId,
            chatId: updateChatId,
          },
        });
        res.status(200).json(updatedChat);
        break;
      case 'DELETE':
        if (!id) {
          return res.status(400).json({ message: 'Missing chat ID' });
        }
        await prisma.chat.delete({
          where: { id: String(id) },
        });
        res.status(200).json({ message: 'Chat deleted successfully' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
