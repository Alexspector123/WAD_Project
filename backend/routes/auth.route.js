import express from 'express';
import { signup, logout, login } from '../controllers/auth.controller.js';
import { protectedRoute } from "../middleware/protectRoute.js";
import { authCheck } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/logout', logout);
router.post('/login', login);

router.get("/authCheck", protectedRoute, authCheck);

export default router;