import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const extractUserId = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decodedToken = jwt.decode(token) as { sub: string };
      req.userId = decodedToken.sub;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

export default extractUserId;
