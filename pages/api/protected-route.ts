// api/protected-route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '../../middleware/auth';

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a protected route' });
};

export default authMiddleware(protectedRoute);
