// pages/api/uploadVideo.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export const config = {
  api: {
    bodyParser: true,
  },
};

const uploadVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Video URL is required' });
    }

    const videoId = uuidv4();
    const videoPath = path.join(uploadDir, `${videoId}.mp4`);

    // Mock save video URL to file system or database
    // In a real application, you would download the video or save the URL directly to your database
    // Here we simply respond with the URL for demonstration purposes

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Save video metadata (mock)
    // Example: await saveVideoMetadata({ id: videoId, url });

    res.status(200).json({ videoId, url });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default uploadVideo;
