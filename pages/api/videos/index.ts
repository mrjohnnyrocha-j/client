import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const videos = await prisma.video.findMany({
        include: {
          _count: {
            select: {
              likes: true,
              views: true,
              shares: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (videos.length === 0) {
        return res.status(404).json({ message: "No videos found" });
      }

      res.status(200).json(videos);
    } else if (req.method === "POST") {
      const { user_id, video_url, description } = req.body;

      if (!user_id || !video_url || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newVideo = await prisma.video.create({
        data: {
          userId: user_id,
          videoUrl: video_url,
          description: description,
        },
      });

      res.status(201).json(newVideo);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
