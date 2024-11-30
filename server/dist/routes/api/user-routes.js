import express from 'express';
import { getAllUsers } from '../../controllers/user-controller.js';
const router = express.Router();
// GET /users - Get all users
router.get('/', getAllUsers);
export { router as userRouter };
