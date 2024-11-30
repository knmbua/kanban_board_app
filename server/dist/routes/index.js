import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { blockGuests } from './middleware/auth.js';
const router = Router();
router.use('/auth', authRoutes);
// TODO: Add the blockGuests middleware function to our route to block unauthenticated users from triggering any of the apiRoutes
router.use('/api', blockGuests, apiRoutes);
export default router;
