import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { getUsersSidebar, getMessages, sendMessage } from '../controller/msgController';
const msgRouter = express.Router();

msgRouter.get("/users", checkAuth, getUsersSidebar)
msgRouter.get("/:id", checkAuth, getMessages)

msgRouter.post("/send/:id", checkAuth, sendMessage)


export { msgRouter };
