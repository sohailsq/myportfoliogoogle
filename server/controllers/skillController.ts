import type { Request, Response } from 'express';
import { dbRepo } from '../config/db.ts';

export async function getAllSkills(req: Request, res: Response) {
  try {
    const { category } = req.query;
    let list = await dbRepo.skills.getAll();

    if (category && category !== 'All') {
      list = list.filter(s => s.category.toLowerCase() === (category as string).toLowerCase());
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve skills.' });
  }
}

export async function createSkill(req: Request, res: Response) {
  try {
    const { name, category, proficiency, yearsOfExperience, highlight, order } = req.body;

    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Skill name and category are required.' });
    }

    const created = await dbRepo.skills.create({
      name,
      category,
      proficiency: proficiency || 'Advanced',
      yearsOfExperience: Number(yearsOfExperience) || 2,
      highlight: highlight || '',
      order: Number(order) || 99
    });

    return res.status(201).json({ success: true, message: 'Skill added successfully', data: created });
  } catch (error) {
    console.error('Error creating skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to create skill.' });
  }
}

export async function updateSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await dbRepo.skills.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }

    return res.json({ success: true, message: 'Skill updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to update skill.' });
  }
}

export async function deleteSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await dbRepo.skills.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }

    return res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete skill.' });
  }
}
