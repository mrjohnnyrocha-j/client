import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const browsingHistory = await prisma.browsingHistory.findMany({
      where: { userId: userId as string },
      include: { item: true },
    });

    const orders = await prisma.order.findMany({
      where: { user_id: userId as string },
      include: { Item: true },
    });

    const itemScores: { [key: number]: number } = {};
    browsingHistory.forEach((entry: any) => {
      //change Types
      itemScores[entry.itemId] = (itemScores[entry.itemId] || 0) + 1;
    });
    orders.forEach((order: any) => {
      itemScores[order.item_id] = (itemScores[order.item_id] || 0) + 3;
    });

    const allItems = await prisma.item.findMany();
    const recommendations = allItems
      .map((item: any) => ({
        //Change types
        ...item,
        score: itemScores[item.id] || 0,
      }))
      .sort((a: any, b: any) => b.score - a.score) // Change types
      .slice(0, 10);

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
