import { Router } from 'express';
import { registerUser, loginUser, getUser, logOutUser } from '../controllers/user-controller.js';
const router = Router();
// POST /register - Register a user
router.post('/register', registerUser);
// POST /login - Login a user
router.post('/login', loginUser);
router.get('/user', getUser);
// GET /logout - Log a user out
router.get('/logout', logOutUser);
export default router;
