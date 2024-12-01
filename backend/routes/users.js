import express from 'express';
import { handelUserLogin, handelUserSignup, handelUserLogout } from '../controller/authController.js'
const authRouter = express.Router();


authRouter.post('/signup', handelUserSignup);
authRouter.post('/login', handelUserLogin);
authRouter.post('/login', handelUserLogout);


export { authRouter };
