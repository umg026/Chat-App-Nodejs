import express from 'express';
import { getUsersSidebar, getMessages, sendMessage } from '../controller/msgController.js';
import { checkAuth } from '../middleware/checkAuth.js';


const msgRouter = express.Router();

msgRouter.get("/users", checkAuth, getUsersSidebar)
msgRouter.get("/:id", checkAuth, getMessages)

msgRouter.post("/send/:id", checkAuth, sendMessage)


export { msgRouter };
