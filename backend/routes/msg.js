import express from 'express';
import { getUsersSidebar, getMessages, sendMessage } from '../controller/msgController.js';
import { protectRoute } from '../middleware/checkAuth.js';


const msgRouter = express.Router();

msgRouter.get("/users", protectRoute, getUsersSidebar)
msgRouter.get("/:id", protectRoute, getMessages)

msgRouter.post("/send/:id", protectRoute, sendMessage)


export { msgRouter };
