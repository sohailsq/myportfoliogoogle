import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { dbRepo, isUsingMongoDB } from '../config/db.ts';
import { generateToken, type AuthRequest } from '../middleware/auth.ts';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await dbRepo.users.findByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully.' });
}

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const user = await dbRepo.users.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    system: {
      database: isUsingMongoDB() ? 'MongoDB Atlas' : 'In-Memory Repository',
      environment: process.env.NODE_ENV || 'development'
    }
  });
}
