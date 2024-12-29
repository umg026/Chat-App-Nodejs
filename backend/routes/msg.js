import express from 'express';
import { getUsersSidebar, getMessages, sendMessage, addUsersSideBar, getAllUsers } from '../controller/msgController.js';
import { protectRoute } from '../middleware/checkAuth.js';


const msgRouter = express.Router();

msgRouter.get("/users", protectRoute, getAllUsers)
msgRouter.get("/get-users", protectRoute, getUsersSidebar);
msgRouter.get("/:id", protectRoute, getMessages)

msgRouter.post("/send/:id", protectRoute, sendMessage)
msgRouter.post("/add-users/:id", protectRoute, addUsersSideBar)


export { msgRouter };
