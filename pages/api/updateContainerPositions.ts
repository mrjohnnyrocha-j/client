import { NextApiRequest, NextApiResponse } from 'next';
import { positionContainers } from '../../utils/positionContainers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { activeTabs, viewportWidth, viewportHeight, sidebarWidth } = req.body;

    try {
      // const positions = positionContainers(
      //   activeTabs,
      //   viewportWidth,
      //   viewportHeight,
      //   sidebarWidth
      // );
      // res.status(200).json(positions);
    } catch (err) {
      res.status(500).json({ error: 'Error updating container positions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
