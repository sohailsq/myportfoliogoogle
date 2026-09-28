import { Request, Response } from 'express';
import { dbRepo } from '../config/db.js';

// Simple in-memory rate limiting map for spam mitigation
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

export async function submitContact(req: Request, res: Response) {
  try {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    // Check rate limit
    const clientData = rateLimitMap.get(clientIp);
    if (clientData) {
      if (now - clientData.lastReset < RATE_LIMIT_WINDOW_MS) {
        if (clientData.count >= MAX_SUBMISSIONS_PER_WINDOW) {
          return res.status(429).json({
            success: false,
            message: 'Too many messages sent. Please wait a minute before sending another message.'
          });
        }
        clientData.count++;
      } else {
        rateLimitMap.set(clientIp, { count: 1, lastReset: now });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, lastReset: now });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields (Name, Email, Subject, Message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (message.length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long.' });
    }

    const newContact = await dbRepo.contacts.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    console.log(`[Contact] New inbound inquiry from ${newContact.name} (${newContact.email}) - "${newContact.subject}"`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent directly to Sohail.',
      data: {
        id: newContact.id,
        createdAt: newContact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to deliver message. Please reach out directly to sohailshah14921@gmail.com' });
  }
}

export async function getAllContacts(req: Request, res: Response) {
  try {
    const contacts = await dbRepo.contacts.getAll();
    return res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve messages.' });
  }
}

export async function updateContactStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be unread, read, or replied.' });
    }

    const updated = await dbRepo.contacts.updateStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update message status.' });
  }
}

export async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await dbRepo.contacts.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    return res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
}
