import { NextApiRequest, NextApiResponse } from 'next';
import fetchPageContent from '../../services/fetchPageContent';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  try {
    const content = await fetchPageContent(url);
    res.status(200).json({ content });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
};
