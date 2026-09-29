import type { Request, Response } from 'express';
import { dbRepo } from '../config/db.ts';

export async function getAllExperience(req: Request, res: Response) {
  try {
    const list = await dbRepo.experience.getAll();
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve experience timeline.' });
  }
}

export async function createExperience(req: Request, res: Response) {
  try {
    const { company, position, location, period, startDate, endDate, isCurrent, type, description, technologies, highlights, order } = req.body;

    if (!company || !position || !period) {
      return res.status(400).json({ success: false, message: 'Company, position, and period are required.' });
    }

    const created = await dbRepo.experience.create({
      company,
      position,
      location: location || 'Hyderabad, India',
      period,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '',
      isCurrent: Boolean(isCurrent),
      type: type || 'Full-time',
      description: Array.isArray(description) ? description : [description],
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t: string) => t.trim()) : []),
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',').map((h: string) => h.trim()) : []),
      order: Number(order) || 99
    });

    return res.status(201).json({ success: true, message: 'Experience entry created', data: created });
  } catch (error) {
    console.error('Error creating experience:', error);
    return res.status(500).json({ success: false, message: 'Failed to create experience record.' });
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await dbRepo.experience.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Experience record not found.' });
    }

    return res.json({ success: true, message: 'Experience updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating experience:', error);
    return res.status(500).json({ success: false, message: 'Failed to update experience.' });
  }
}

export async function deleteExperience(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await dbRepo.experience.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Experience record not found.' });
    }

    return res.json({ success: true, message: 'Experience record deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete experience record.' });
  }
}
