import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { dbRepo } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'sohail-portfolio-jwt-secret-key-2026';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function generateToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    
    const user = await dbRepo.users.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User not found.' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden. Admin privileges required.' });
  }
  next();
}
