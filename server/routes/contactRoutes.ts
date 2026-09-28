import { Router } from 'express';
import { submitContact, getAllContacts, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', submitContact);
router.get('/', authenticate, requireAdmin, getAllContacts);
router.put('/:id/status', authenticate, requireAdmin, updateContactStatus);
router.delete('/:id', authenticate, requireAdmin, deleteContact);

export default router;
