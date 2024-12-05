import express from 'express';
import { handelUserLogin, handelUserSignup, handelUserLogout, checkAuth } from '../controller/authController.js'
import { protectRoute } from '../middleware/checkAuth.js';
const authRouter = express.Router();


authRouter.post('/signup', handelUserSignup);
authRouter.post('/login', handelUserLogin);
authRouter.post('/logout', handelUserLogout);
authRouter.get("/check", protectRoute, checkAuth);


export { authRouter };
